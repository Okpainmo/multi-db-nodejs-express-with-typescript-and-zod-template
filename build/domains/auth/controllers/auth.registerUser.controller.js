/**
 * @description Register a new user
 * @request POST
 * @route /api/v1/auth/register
 * @access Public
 */
// import { createUser__mongo } from '../lib/mongo__auth.createUser.service.js';
import { createUser__postgres } from '../lib/postgres__auth.createUser.service.js';
// import { findUser__mongo } from '../../user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../../user/lib/postgres__user.findUser.service.js';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
import { errorHandler__400, errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
import { hashingHandler } from '../../../utils/hashingHandler.js';
import { deployAuthCookie } from '../../../utils/cookieDeployHandlers.js';
import { generateTokens } from '../../../utils/generateTokens.js';
export const registerUser = async (req, res) => {
    try {
        // const existingUser = await findUser__mongo({ email: req.body.email });
        const existingUser = await findUser__postgres({ email: req.body.email });
        const hashedPassword = await hashingHandler({ stringToHash: req.body.password });
        if (existingUser) {
            errorHandler__400(`User with email: '${req.body.email}' already exists`, res);
            return;
        }
        req.body.password = hashedPassword;
        /*
        Always set the admin as below, to ensure that no user tricks the system and set a false admin.
        You'll then need to create an end-point for setting admins.
        */
        const registeredUser = await createUser__postgres({ user: { ...req.body, isAdmin: false } });
        // const registeredUser = await createUser__mongo({ user: { ...req.body, isAdmin: false } });
        if (registeredUser && registeredUser.email && registeredUser.id) {
            const authTokens = await generateTokens({ tokenType: 'auth', user: { id: registeredUser.id, email: registeredUser.email } });
            // authTokenSpecs from global.d.ts
            const { accessToken, refreshToken, authCookie } = authTokens;
            if (accessToken && refreshToken && authCookie) {
                // await updateUser__mongo({
                //   userId: registeredUser.id,
                //   email: registeredUser.email,
                //   requestBody: { accessToken: accessToken, refreshToken: refreshToken }
                // });
                await updateUser__postgres({
                    email: registeredUser.email,
                    requestBody: {
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                });
                deployAuthCookie({ authCookie: authCookie }, res);
                res.status(201).json({
                    responseMessage: 'User registered successfully',
                    response: {
                        userProfile: {
                            id: registeredUser.id,
                            name: registeredUser.name,
                            email: registeredUser.email,
                            isAdmin: registeredUser.isAdmin,
                            isActive: registeredUser.isActive,
                            createdAt: registeredUser.createdAt,
                            updatedAt: registeredUser.updatedAt
                        },
                        accessToken: accessToken,
                        refreshToken: refreshToken
                    }
                });
            }
        }
    }
    catch (error) {
        errorHandler__500(error, res);
        return;
    }
};
