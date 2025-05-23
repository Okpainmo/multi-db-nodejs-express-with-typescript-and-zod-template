// sample controller
/**
 * @description Deactivate a user by ID (admin only)
 * @request PATCH
 * @route /api/v1/admin/deactivate-user/:userId
 * @access Admin
 */

import type { Request, Response } from 'express';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
// import { findUser__mongo } from '../../user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../../user/lib/postgres__user.findUser.service.js';
import { errorHandler__404, errorHandler__500, errorHandler__403, errorHandler__400 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
import type { UserSpecs } from '../../user/schema/user.schema.js';
// import log from '../../../utils/logger.js';

type UserProfileResponse = Pick<
  UserSpecs,
  'id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt' | 'accessToken' | 'refreshToken'
>;

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    userProfile: UserProfileResponse;
    accessToken: string;
    refreshToken: string;
  };
};

export const deactivateUser = async (req: Request<{ userId?: string | number }, ResponseSpecs>, res: Response<ResponseSpecs>) => {
  try {
    const { userId } = req.params;

    // receive admin userData from previous middleware
    const adminUser = req?.userData?.user;

    // const userToDeactivate = await findUser__mongo({userId: userId as string });
    const userToDeactivate = await findUser__postgres({ userId: Number(userId) });

    if (!userToDeactivate) {
      errorHandler__404(`User with id: '${userId}' not found or does not exist`, res);

      return;
    }

    if (userToDeactivate.isActive == false) {
      return errorHandler__400(`user with id: '${userId}' has already been de-activated`, res);
    }

    if (adminUser && !adminUser.isAdmin) {
      errorHandler__403('You are not allowed to perform this action', res);

      return;
    }

    const deactivatedUser = await updateUser__postgres({ userId: Number(userId), requestBody: { isActive: false } });
    //   const deactivatedUser = await updateUser__mongo({ userId: userId, requestBody: { isActive: false } });

    if (deactivatedUser && req?.userData?.newUserAccessToken && req?.userData?.newUserRefreshToken) {
      res.status(200).json({
        responseMessage: 'User deactivated successfully.',
        response: {
          userProfile: {
            id: deactivatedUser.id,
            name: deactivatedUser.name || '',
            email: deactivatedUser.email,
            isAdmin: deactivatedUser.isAdmin,
            isActive: deactivatedUser.isActive,
            createdAt: deactivatedUser.createdAt,
            updatedAt: deactivatedUser.updatedAt
          },
          accessToken: req?.userData?.newUserAccessToken,
          refreshToken: req?.userData?.newUserRefreshToken
        }
      });
    }

    return;
  } catch (error) {
    errorHandler__500(error, res);

    return;
  }
};
