import jwt from 'jsonwebtoken';
import {} from 'express';
import { errorHandler__401, errorHandler__403, errorHandler__404, errorHandler__500 } from '../utils/errorHandlers/codedErrorHandlers.js';
// import { findUser__mongo } from '../domains/user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../domains/user/lib/postgres__user.findUser.service.js';
import log from '../utils/logger.js';
const sessionsMiddleware = async (req, res, next) => {
    const requestHeaders = req.headers;
    const { email, authorization } = requestHeaders;
    const jwtSecret = process.env.JWT_SECRET;
    if (!email || !authorization) {
        errorHandler__401('email or authorization header missing on request', res);
        return;
    }
    /*
    checking for our initially deployed http-only cookie - the cookie is deployed on every request, and is
    probably the most high-security enhancement feature of this whole API server. The request will be rejected
    if it is not available.
  
    See the cookie-deployment utility setups here - `src => utils => cookieDeployHandler.ts`, and
    `src => utils => generateTokens.ts`.
    
    Check out it's use inside the log-in controller, the sign-up/registration controller, and inside the
    access middleware.
  
    Just like I love to implement, one of the user credentials(the email) is encrypted, and written into the cookie
    (see `src => utils => generateTokens.ts`). As such, you should be able to extract that data, and perform extra
    queries on the cookie - going further to validate it's authenticity - if you wish. I highly recommend doing that.
    */
    if (!req.headers.cookie || !req.headers.cookie.includes('MultiDB_NodeExpressTypescript_Template')) {
        errorHandler__401('request rejected, please re-authenticate', res);
        return;
    }
    // const user = await findUser__mongo({ email });
    const user = await findUser__postgres({ email });
    if (user && !user.refreshToken) {
        errorHandler__404('refresh token not found', res);
        return;
    }
    // verify refresh/session token
    if (user && user.refreshToken) {
        try {
            const decodedSessionJWT = jwt.decode(user.refreshToken, { complete: true });
            if (!decodedSessionJWT || decodedSessionJWT.payload.userEmail !== user?.email) {
                errorHandler__401('user credentials do not match', res);
                return;
            }
            jwt.verify(user.refreshToken, jwtSecret);
            // ==================================================================================
            // if you track user sessions, handle updating(renewing) the user session in DB here
            // ==================================================================================
            const sessionStatus = `USER SESSION IS ACTIVE`;
            log.info(sessionStatus);
            req.userData = { user: user };
            next();
        }
        catch (error) {
            if (error instanceof Error && error.message === 'jwt expired') {
                // ==================================================================================
                // if you track user sessions, handle updating(ending/terminating) the user session in DB here
                // ==================================================================================
                const sessionStatus = `EXPIRED SESSION: session terminated for '${user.email}'`;
                log.info(sessionStatus);
                errorHandler__403('user session is expired, please re-authenticate', res);
                return;
            }
            else {
                errorHandler__500(error, res);
                return;
            }
        }
    }
    return;
};
export default sessionsMiddleware;
