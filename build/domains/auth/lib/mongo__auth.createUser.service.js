import { userModel } from '../../user/models/user.model.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
export async function createUser__mongo(data) {
    try {
        const { name, email, password } = data.user;
        // Create user
        const newUser = await userModel.create({
            name,
            email,
            password
        });
        // Selectively return fields (excluding password)
        const user = {
            _id: newUser._id,
            name: newUser.name,
            email: newUser.email,
            isAdmin: newUser.isAdmin,
            isActive: newUser.isActive,
            createdAt: newUser.createdAt,
            updatedAt: newUser.updatedAt
        };
        return user;
    }
    catch (error) {
        customServiceErrorHandler(error);
        return;
    }
}
