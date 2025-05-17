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
export const registerUser = async (req, res) => {
    try {
        // const existingUser = await findUser__mongo({ email: req.body.email });
        const existingUser = await findUser__postgres({ email: req.body.email });
        if (existingUser) {
            res.status(400).json({
                responseMessage: `User with email: '${req.body.email}' already exists`,
                error: 'USER ALREADY EXIST!!!'
            });
        }
        const registeredUser = await createUser__postgres({ user: req.body });
        // const registeredUser = await createUser__mongo({ user: req.body });
        // log.info(registeredUser);
        if (registeredUser) {
            res.status(201).json({
                responseMessage: 'User registered successfully',
                response: {
                    userProfile: {
                        // _id: registeredUser._id, # mongo
                        id: registeredUser.id,
                        name: registeredUser.name,
                        email: registeredUser.email,
                        isAdmin: registeredUser.isAdmin,
                        isActive: registeredUser.isActive,
                        createdAt: registeredUser.createdAt,
                        updatedAt: registeredUser.updatedAt
                    }
                }
            });
        }
    }
    catch (error) {
        errorHandler__500(error, res);
    }
};
