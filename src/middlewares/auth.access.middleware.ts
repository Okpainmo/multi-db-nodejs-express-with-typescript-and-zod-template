import jwt from 'jsonwebtoken';
// import { TokenExpiredError } from 'jsonwebtoken';
import { type Request, type Response, type NextFunction } from 'express';
import { generateTokens } from '../utils/generateTokens.js';
import type { UserSpecs } from '../domains/user/schema/user.schema.js';
import { errorHandler__401, errorHandler__403, errorHandler__404, errorHandler__500 } from '../utils/errorHandlers/codedErrorHandlers.js';
// import { findUser__mongo } from '../domains/user/lib/mongo__user.findUser.service.js';
// import { findUser__postgres } from '../domains/user/lib/postgres__user.findUser.service.js';
// import { updateUser__mongo } from '../domains/user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../domains/user/lib/postgres__user.updateUser.service.js';
import { deployAuthCookie } from '../utils/cookieDeployHandlers.js';
import log from '../utils/logger.js';

type RequestHeaderContentSpecs = {
  authorization: string;
  email: string;
};

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    user: UserSpecs;
    // token: string;
  };
};

type JwtPayloadSpecs = {
  userId: string;
  userEmail: string;
  iat: number;
  exp: number;
};

type AuthTokenSpecs = {
  authCookie: string;
  accessToken: string;
  refreshToken: string;
};

/*
  SPLITTING THE ACCESS AND SESSIONS FROM EACH OTHER HELPS US FOCUS MORE ON THEIR SPECIAL USE-CASES, 
  AND GIVES US EXTRA ROOM TO TRACK VALUABLE INFORMATION E.G. USER SUB-SESSION ACTIVITIES.
  BUT LOOKING DEEPER, YOU'LL SEE THAT IS IS VERY USEFUL IN TRACKING WHEN USER SUB-SESSIONS(ACCESS) 
  ARE EXPIRED.
*/

const accessMiddleware = async (req: Request, res: Response<ResponseSpecs>, next: NextFunction) => {
  const requestHeaders = req.headers;
  const user = req?.userData?.user;
  // log.info(user);

  const { authorization } = requestHeaders as RequestHeaderContentSpecs;
  const jwtSecret = process.env.JWT_SECRET as string;

  if (!user) {
    errorHandler__404(`user with not received from sessions middleware`, res);
  }

  if (!authorization || !authorization.startsWith('Bearer ')) {
    errorHandler__403('authorization string does not match expected(Bearer Token) result', res);
  }

  const returnedAccessToken = authorization.split(' ')[1];

  if (returnedAccessToken && user && user.email && user.id) {
    // if (returnedAccessToken && user && user.email && user._id) {

    // verify access-token, and proceed to renew(session, access, and cookie) since the session/refresh middleware was passed successfully
    try {
      const decodedAccessJWT = jwt.decode(returnedAccessToken, { complete: true }) as { payload: JwtPayloadSpecs } | null;

      if (!decodedAccessJWT || decodedAccessJWT.payload.userEmail !== user?.email) {
        errorHandler__401('user credentials do not match', res);
      }

      jwt.verify(returnedAccessToken, jwtSecret);

      // proceed to renew session since session middleware passed successfully
      const authTokens = await generateTokens({ tokenType: 'auth', user: { id: user.id, email: user.email } });
      // const authTokens = await generateTokens({ tokenType: 'auth', user: { id: user._id, email: user.email } });

      // authTokenSpecs from global.d.ts
      const { accessToken, refreshToken, authCookie } = authTokens as AuthTokenSpecs;

      if (accessToken && refreshToken && authCookie) {
        // await updateUser__mongo({
        //   userId: user._id,
        //   // userId: user.id,
        //   email: user.email,
        //   requestBody: { accessToken: accessToken, refreshToken: refreshToken }
        // });

        await updateUser__postgres({
          userId: user.id,
          email: user.email,
          requestBody: {
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        });

        deployAuthCookie({ authCookie: authCookie }, res);

        const sessionStatus = `ACTIVE ACCESS WITH ACTIVE SESSION: access and session renewed for '${user.email}'`;
        log.info(sessionStatus);

        req.userData = {
          user: user as UserSpecs,
          newUserAccessToken: accessToken,
          newUserRefreshToken: refreshToken,
          sessionStatus
        };
      }

      // proceed to next middleware or route
      next();
    } catch (error) {
      if (error instanceof Error && error.name === 'TokenExpiredError') {
        // if (error instanceof Error && error.message === 'jwt expired') {

        // proceed to renew session since session middleware passed successfully
        const authTokens = await generateTokens({ tokenType: 'auth', user: { id: user.id, email: user.email } });
        // const authTokens = await generateTokens({ tokenType: 'auth', user: { id: user._id, email: user.email } });

        // authTokenSpecs from global.d.ts
        const { accessToken, refreshToken, authCookie } = authTokens as AuthTokenSpecs;

        if (accessToken && refreshToken && authCookie) {
          // await updateUser__mongo({
          //   userId: user._id,
          //   // userId: user.id,
          //   email: user.email,
          //   requestBody: { accessToken: accessToken, refreshToken: refreshToken }
          // });

          await updateUser__postgres({
            userId: user.id,
            email: user.email,
            requestBody: {
              accessToken: accessToken,
              refreshToken: refreshToken
            }
          });

          deployAuthCookie({ authCookie: authCookie }, res);

          const sessionStatus = `EXPIRED ACCESS WITH ACTIVE SESSION: access and session renewed for '${user.email}'`;
          log.info(sessionStatus);

          req.userData = {
            user: user as UserSpecs,
            newUserAccessToken: accessToken,
            newUserRefreshToken: refreshToken,
            sessionStatus
          };
        }

        // proceed to next middleware or route
        next();
      } else {
        errorHandler__500(error, res);
      }
    }
  }
};

export default accessMiddleware;
