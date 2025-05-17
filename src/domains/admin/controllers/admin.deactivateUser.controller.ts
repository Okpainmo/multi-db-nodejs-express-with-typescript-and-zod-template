// sample controller
/**
 * @description Deactivate a user by ID (admin only)
 * @request PATCH
 * @route /api/v1/admin/users/:id/deactivate
 * @access Admin
 */

import type { Request, Response } from 'express';
import { errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
// import { updateUser__mongo } from '../../user/lib/mongo__user.updateUser.service.js';
import { updateUser__postgres } from '../../user/lib/postgres__user.updateUser.service.js';
// import { findUser__mongo } from '../../user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../../user/lib/postgres__user.findUser.service.js';
import type { UserSpecs } from '../../user/schema/user.schema.js';
// import log from '../../../utils/logger.js';

// type UserProfileResponse = Pick<UserSpecs, '_id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt'>;
type UserProfileResponse = Pick<UserSpecs, 'id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt'>;

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    userProfile: UserProfileResponse;
  };
};

export const deactivateUser = async (req: Request<{ userId?: string | number }, ResponseSpecs>, res: Response<ResponseSpecs>) => {
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

    // if (!user.isAdmin) {
    //   res.status(403).json({
    //     responseMessage: 'You are not allowed to perform this action',
    //     error: 'FORBIDDEN'
    //   });
    // }

    // if (user && user.isAdmin) {
    if (user) {
      const deactivatedUser = await updateUser__postgres({ userId: Number(userId), requestBody: { ...user, isActive: false } });
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
              updatedAt: deactivatedUser.updatedAt
            }
          }
        });
      }
    }

    return;
  } catch (error) {
    errorHandler__500(error, res);
  }
};
