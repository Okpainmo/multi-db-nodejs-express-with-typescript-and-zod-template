// sample controller
/**
 * @description Deactivate a user by ID (admin only)
 * @request PATCH
 * @route /api/v1/admin/users/:id/deactivate
 * @access Admin
 */
import { errorHandler__404, errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
export const deactivateUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // log.info(req.user);
        // const user = await findUser__mongo({ userId });
        const user = req?.userData?.user;
        if (!user) {
            errorHandler__404(`User with id: '${userId}' not found or does not exist`, res);
            return;
        }
        // if (!user.isAdmin) {
        // errorHandler__403('You are not allowed to perform this action' ,res)
        // return
        // }
        // if (user && user.isAdmin) {
        if (user) {
            const deactivatedUser = await updateUser__postgres({ userId: Number(userId), requestBody: { isActive: false } });
            //   const deactivatedUser = await updateUser__mongo({ userId: userId, requestBody: { isActive: false } });
            if (deactivatedUser) {
                res.status(200).json({
                    responseMessage: 'User deactivated successfully.',
                    response: {
                        userProfile: {
                            //   _id: deactivatedUser._id,
                            id: deactivatedUser.id,
                            name: deactivatedUser.name || '',
                            email: deactivatedUser.email,
                            isAdmin: deactivatedUser.isAdmin,
                            isActive: deactivatedUser.isActive,
                            createdAt: deactivatedUser.createdAt,
                            updatedAt: deactivatedUser.updatedAt,
                            accessToken: req.userData?.newUserAccessToken,
                            refreshToken: req.userData?.newUserRefreshToken
                        }
                    }
                });
            }
        }
        return;
    }
    catch (error) {
        errorHandler__500(error, res);
    }
};
