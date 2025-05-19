import { PrismaClient } from '../../../../generated/prisma/index.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
// import log from '../../../utils/logger.js';
// import { userModel } from '../models/user.model.js';
const prisma = new PrismaClient();
export async function updateUser__postgres({ userId, email, requestBody }) {
    try {
        if (email) {
            const user = await prisma.user.update({
                where: { email },
                data: {
                    name: requestBody.name || undefined,
                    email: requestBody.email,
                    password: requestBody.password,
                    isAdmin: requestBody.isAdmin,
                    isActive: requestBody.isActive,
                    accessToken: requestBody.accessToken,
                    refreshToken: requestBody.refreshToken
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                    accessToken: true,
                    refreshToken: true
                }
            });
            return user;
        }
        if (userId) {
            const user = await prisma.user.update({
                where: { id: userId },
                data: {
                    name: requestBody.name || undefined,
                    email: requestBody.email,
                    password: requestBody.password,
                    isAdmin: requestBody.isAdmin,
                    isActive: requestBody.isActive,
                    accessToken: requestBody.accessToken,
                    refreshToken: requestBody.refreshToken
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true,
                    accessToken: true,
                    refreshToken: true
                }
            });
            return user;
        }
        return;
    }
    catch (error) {
        customServiceErrorHandler(error);
        return;
    }
}
// export async function updateUser__mongo({ userId, email, requestBody }: { userId?: string | number; email?: string; requestBody: UserSpecs }) {
//   try {
//     if (email) {
//       const user = await userModel.findOneAndUpdate({ email }, { $set: requestBody }, { new: true, select: '-password' });
//       return user;
//     }
//     if (userId) {
//       const user = await userModel.findByIdAndUpdate(userId, { $set: requestBody }, { new: true, select: '-password' });
//       return user;
//     }
//     return;
//   } catch (error) {
//     customServiceErrorHandler(error);
//     return;
//   }
// }
