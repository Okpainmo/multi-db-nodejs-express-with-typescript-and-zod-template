/**
 * @description Get the profile of any user
 * @request GET
 * @route /api/v1/user/:userId
 * @access Public
 */

import type { Request, Response } from 'express';
import type { UserSpecs } from '../schema/user.schema.js';
// import { findUser__mongo } from '../../user/lib/mongo__user.findUser.service.js';
import { findUser__postgres } from '../../user/lib/postgres__user.findUser.service.js';
import { errorHandler__500, errorHandler__404 } from '../../../utils/errorHandlers/codedErrorHandlers.js';
// import log from '../../../utils/logger.js';

type UserProfileResponse = Pick<UserSpecs, 'id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt'>;

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    userProfile: UserProfileResponse;
    accessToken: string;
    refreshToken: string;
  };
  sessionStatus?: string;
};

export const getUserProfile = async (req: Request<{ userId: string | number }, ResponseSpecs>, res: Response<ResponseSpecs>) => {
  try {
    const { userId } = req.params;

    // const userToFind = await findUser__mongo({userId: userId as string });
    const userToFind = await findUser__postgres({ userId: Number(userId) });

    if (!userToFind) {
      errorHandler__404(`user with id: '${userId}' not found or does not exist`, res);

      return;
    }

    const userProfile = {
      id: userToFind.id,
      name: userToFind.name || '',
      email: userToFind.email,
      isAdmin: userToFind.isAdmin,
      isActive: userToFind.isActive,
      createdAt: userToFind.createdAt,
      updatedAt: userToFind.updatedAt
    };

    if (req.userData?.newUserAccessToken && req?.userData?.newUserRefreshToken)
      res.status(200).json({
        responseMessage: 'User profile retrieved successfully',
        response: {
          userProfile,
          accessToken: req.userData?.newUserAccessToken,
          refreshToken: req.userData?.newUserRefreshToken
        }
      });
  } catch (error) {
    errorHandler__500(error, res);

    return;
  }
};
