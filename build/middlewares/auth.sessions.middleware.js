import jwt from 'jsonwebtoken';
// import { TokenExpiredError } from 'jsonwebtoken';
import {} from 'express';
import { errorHandler__401, errorHandler__403, errorHandler__500 } from '../utils/errorHandlers/codedErrorHandlers.js';
// import { findUser__mongo } from '../domains/user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../domains/user/lib/postgres__user.findUser.service.js';
// import { updateUser__mongo } from '../domains/user/lib/mongo__user.updateUser.service.js';
import log from '../utils/logger.js';
const sessionsMiddleware = async (req, res, next) => {
    const requestHeaders = req.headers;
    const { email, authorization } = requestHeaders;
    const jwtSecret = process.env.JWT_SECRET;
    if (!email || !authorization) {
        errorHandler__401('email or authorization header missing on request', res);
    }
    if (!req.headers.cookie || !req.headers.cookie.includes('MultiDB_NodeExpressTypescript_Template')) {
        errorHandler__401('user does not have access to this route, please re-authenticate', res);
    }
    // const user = await findUser__mongo({ email });
    const user = await findUser__postgres({ email });
    if (user && !user.refreshToken) {
        throw new Error('No refresh token found');
    }
    // verify refresh/session token
    if (user && user.refreshToken) {
        try {
            const decodedSessionJWT = jwt.decode(user.refreshToken, { complete: true });
            if (!decodedSessionJWT || decodedSessionJWT.payload.userEmail !== user?.email) {
                errorHandler__401('user credentials do not match', res);
            }
            jwt.verify(user.refreshToken, jwtSecret);
            // ==================================================================================
            // if you track user sessions, handle updating(renewing) the user session in DB here
            // ==================================================================================
            const sessionStatus = `USER SESSION IS ACTIVE`;
            log.info(sessionStatus);
            // proceed to next middleware or route
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
            }
            else {
                errorHandler__500(error, res);
            }
        }
    }
    return;
};
export default sessionsMiddleware;
