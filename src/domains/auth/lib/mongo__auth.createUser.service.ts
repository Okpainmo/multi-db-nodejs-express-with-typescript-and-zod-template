import type { UserSpecs } from '../../user/schema/user.schema.js';
import { userModel } from '../../user/models/user.model.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';

export async function createUser__mongo(data: { user: UserSpecs }) {
  try {
    const { name, email, password } = data.user;

    // Create user
    const newUser: UserSpecs = await userModel.create({
      name,
      email,
      password
    });

    // Selectively return fields (excluding password)
    const user = {
      id: newUser._id, // set '_id' to 'id', to ensure uniform use of 'id' for all DB across the project
      name: newUser.name,
      email: newUser.email,
      isAdmin: newUser.isAdmin,
      isActive: newUser.isActive,
      createdAt: newUser.createdAt,
      updatedAt: newUser.updatedAt
    };

    return user;
  } catch (error) {
    customServiceErrorHandler(error);

    return;
  }
}
