import { userModel } from '../models/user.model.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
export async function updateUser__mongo({ userId, email, requestBody }) {
    try {
        if (email) {
            const user = await userModel.findOneAndUpdate({ email }, { $set: requestBody }, { new: true, select: '-password' });
            if (user) {
                user.id = user._id; // set '_id' to 'id', to ensure uniform use of 'id' for all DB across the project
                return user;
            }
        }
        if (userId) {
            const user = await userModel.findByIdAndUpdate(userId, { $set: requestBody }, { new: true, select: '-password' });
            if (user) {
                user.id = user._id; // set '_id' to 'id', to ensure uniform use of 'id' for all DB across the project
                return user;
            }
        }
        return;
    }
    catch (error) {
        customServiceErrorHandler(error);
        return;
    }
}
