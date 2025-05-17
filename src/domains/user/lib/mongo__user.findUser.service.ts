import { userModel } from '../models/user.model.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';

export async function findUser__mongo({ userId, email }: { userId?: string | number; email?: string }) {
  try {
    if (email) {
      const user = await userModel.findOne({
        email
      });

      return user;
    }

    if (userId) {
      const user = await userModel.findOne({
        _id: userId
      });

      return user;
    }

    return;
  } catch (error) {
    customServiceErrorHandler(error);

    return;
  }
}
