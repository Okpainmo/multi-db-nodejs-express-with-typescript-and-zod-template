import { userModel } from '../models/user.model.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';

export async function findUser__mongo({ userId, email }: { userId?: string | number; email?: string }) {
  try {
    if (email) {
      const user = await userModel.findOne({
        email
      });

      if (user) {
        user.id = user._id; // set '_id' to 'id', to ensure uniform use of 'id' for all DB across the project

        return user;
      }
    }

    if (userId) {
      const user = await userModel.findOne({
        _id: userId
      });

      if (user) {
        user.id = user._id; // set '_id' to 'id', to ensure uniform use of 'id' for all DB across the project

        return user;
      }
    }

    return;
  } catch (error) {
    customServiceErrorHandler(error);

    return;
  }
}
