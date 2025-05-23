/**
 * @description Log in a new user
 * @request POST
 * @route /api/v1/auth/log-in
 * @access Public
 */

import type { Request, Response } from 'express';
import type { UserSpecs } from '../../user/schema/user.schema.js';
// import { findUser__mongo } from '../../user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../../user/lib/postgres__user.findUser.service.js';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
import { errorHandler__403, errorHandler__404, errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
import { deployAuthCookie } from '../../../utils/cookieDeployHandlers.js';
import { generateTokens } from '../../../utils/generateTokens.js';
import { decryptHandler } from '../../../utils/decryptHandler.js';
// import log from '../../../utils/logger.js';

type UserProfileResponse = Pick<
  UserSpecs,
  'id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt' | 'accessToken' | 'refreshToken'
>;

type inSpecs = {
  email: string;
  password: string;
};

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    userProfile: UserProfileResponse;
    accessToken: string;
    refreshToken: string;
  };
};

type AuthTokenSpecs = {
  authCookie: string;
  accessToken: string;
  refreshToken: string;
};

export const LogIn = async (req: Request<{}, ResponseSpecs, inSpecs>, res: Response<ResponseSpecs>) => {
  try {
    // const existingUser = await findUser__mongo({ email: req.body.email });
    const existingUser = await findUser__postgres({ email: req.body.email });

    if (!existingUser) {
      errorHandler__404(`user with email: '${req.body.email}' not found or does not exist`, res);

      return;
    }

    const hashedPassword = existingUser?.password as string;
    const comparePasswords = await decryptHandler({ stringToCompare: req.body?.password, hashedString: hashedPassword });

    if (!comparePasswords) {
      errorHandler__403('incorrect password: login unsuccessful', res);

      return;
    }

    if (existingUser && existingUser.email && existingUser.id) {
      // generate auth tokens
      const authTokens = await generateTokens({ tokenType: 'auth', user: { id: existingUser.id, email: existingUser.email } });

      // authTokenSpecs from global.d.ts
      const { accessToken, refreshToken, authCookie } = authTokens as AuthTokenSpecs;

      if (accessToken && refreshToken && authCookie) {
        // await updateUser__mongo({
        //   email: existingUser.email,
        //   requestBody: { accessToken: accessToken, refreshToken: refreshToken }
        // });

        await updateUser__postgres({
          email: existingUser.email,
          requestBody: {
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        });

        deployAuthCookie({ authCookie }, res);

        res.status(201).json({
          responseMessage: 'User logged in successfully',
          response: {
            userProfile: {
              id: existingUser.id,
              name: existingUser.name,
              email: existingUser.email,
              isAdmin: existingUser.isAdmin,
              isActive: existingUser.isActive,
              createdAt: existingUser.createdAt,
              updatedAt: existingUser.updatedAt
            },
            accessToken: accessToken,
            refreshToken: refreshToken
          }
        });
      }
    }
  } catch (error) {
    errorHandler__500(error, res);

    return;
  }
};
