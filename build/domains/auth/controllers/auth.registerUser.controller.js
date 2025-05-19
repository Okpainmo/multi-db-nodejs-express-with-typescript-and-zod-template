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
import { errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
import { hashingHandler } from '../../../utils/hashingHandler.js';
import { deployAuthCookie } from '../../../utils/cookieDeployHandlers.js';
import { generateTokens } from '../../../utils/generateTokens.js';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
export const registerUser = async (req, res) => {
    try {
        // const existingUser = await findUser__mongo({ email: req.body.email });
        const existingUser = await findUser__postgres({ email: req.body.email });
        const hashedPassword = await hashingHandler({ stringToHash: req.body.password });
        if (existingUser) {
            res.status(400).json({
                responseMessage: `User with email: '${req.body.email}' already exists`,
                error: 'USER ALREADY EXIST!!!'
            });
        }
        req.body.password = hashedPassword;
        const registeredUser = await createUser__postgres({ user: req.body });
        // const registeredUser = await createUser__mongo({ user: req.body });
        // if (registeredUser && registeredUser.email && registeredUser._id) {
        if (registeredUser && registeredUser.email && registeredUser.id) {
            // generate auth tokens
            const authTokens = await generateTokens({ tokenType: 'auth', user: { id: registeredUser.id, email: registeredUser.email } });
            // const authTokens = await generateTokens({ tokenType: 'auth', user: { id: registeredUser._id, email: registeredUser.email } });
            // authTokenSpecs from global.d.ts
            const { accessToken, refreshToken, authCookie } = authTokens;
            if (accessToken && refreshToken && authCookie) {
                // await updateUser__mongo({
                //   userId: registeredUser._id,
                //   // userId: registeredUser.id,
                //   email: registeredUser.email,
                //   requestBody: { accessToken: accessToken, refreshToken: refreshToken }
                // });
                await updateUser__postgres({
                    userId: registeredUser.id,
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
                            // _id: registeredUser._id,
                            id: registeredUser.id,
                            name: registeredUser.name,
                            email: registeredUser.email,
                            isAdmin: registeredUser.isAdmin,
                            isActive: registeredUser.isActive,
                            createdAt: registeredUser.createdAt,
                            updatedAt: registeredUser.updatedAt,
                            accessToken: accessToken,
                            refreshToken: refreshToken
                        }
                    }
                });
            }
        }
    }
    catch (error) {
        errorHandler__500(error, res);
    }
};
