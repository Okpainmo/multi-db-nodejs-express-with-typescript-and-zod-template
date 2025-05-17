/**
 * @description Get the profile of any user
 * @request GET
 * @route /api/v1/user/get-user-profile/:userId
 * @access Public
 */
// import { findUser__mongo } from '../lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../lib/postgres__user.findUser.service.js';
import { errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
export const getUserProfile = async (req, res) => {
    try {
        const { userId } = req.params;
        // const user = await findUser__mongo({ userId });
        const user = await findUser__postgres({ userId: Number(userId) });
        if (!user) {
            res.status(404).json({
                responseMessage: `User with id: '${userId}' not found or does not exist`,
                error: 'NOT_FOUND'
            });
            return;
        }
        const userProfile = {
            // _id: user._id, # mongo
            id: user.id,
            name: user.name || '',
            email: user.email,
            isAdmin: user.isAdmin,
            isActive: user.isActive,
            createdAt: user.createdAt,
            updatedAt: user.updatedAt
        };
        res.status(200).json({
            responseMessage: 'User profile retrieved successfully',
            response: {
                userProfile
            }
        });
    }
    catch (error) {
        errorHandler__500(error, res);
    }
};
