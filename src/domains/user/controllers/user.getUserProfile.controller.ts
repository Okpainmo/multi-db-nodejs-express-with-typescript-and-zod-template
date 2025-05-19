/**
 * @description Get the profile of any user
 * @request GET
 * @route /api/v1/user/get-user-profile/:userId
 * @access Public
 */

import type { Request, Response } from 'express';
import type { UserSpecs } from '../schema/user.schema.js';
// import { findUser__mongo } from '../lib/mongo__user.findUser.service.js';
// import { findUser__postgres } from '../lib/postgres__user.findUser.service.js';
import { errorHandler__500 } from '../../../utils/errorHandlers/codedErrorHandlers.js';

// type UserProfileResponse = Pick<UserSpecs, '_id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt'>;
type UserProfileResponse = Pick<UserSpecs, 'id' | 'name' | 'email' | 'isAdmin' | 'isActive' | 'createdAt' | 'updatedAt'>;

type ResponseSpecs = {
  error?: string;
  responseMessage: string;
  response?: {
    userProfile: UserProfileResponse;
  };
  sessionStatus?: string;
};

export const getUserProfile = async (req: Request<{ userId: string | number }, ResponseSpecs>, res: Response<ResponseSpecs>) => {
  try {
    const { userId } = req.params;
    const user = req?.userData?.user as UserSpecs;

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
      updatedAt: user.updatedAt,
      accessToken: req.userData?.newUserAccessToken,
      refreshToken: req.userData?.newUserRefreshToken
    };

    res.status(200).json({
      responseMessage: 'User profile retrieved successfully',
      response: {
        userProfile
      }
    });
  } catch (error) {
    errorHandler__500(error, res);
  }
};
