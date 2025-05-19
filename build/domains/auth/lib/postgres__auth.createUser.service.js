import { PrismaClient } from '../../../../generated/prisma/index.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
// import { userModel } from '../../user/models/user.model.js';
// import log from '../../../utils/logger.js';
const prisma = new PrismaClient();
export async function createUser__postgres(data) {
    try {
        // Create new user
        if (data.user.email && data.user.name && data.user.password) {
            // log.info(`${data.user.email}, ${data.user.password}, ${data.user.name}`);
            const user = await prisma.user.create({
                data: {
                    name: data.user.name,
                    email: data.user.email,
                    password: data.user.password
                },
                select: {
                    id: true,
                    name: true,
                    email: true,
                    isAdmin: true,
                    isActive: true,
                    createdAt: true,
                    updatedAt: true
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
// export async function createUser__mongo(data: { user: UserSpecs }) {
//   try {
//     const { name, email, password } = data.user;
//     // Create user
//     const newUser: UserSpecs = await userModel.create({
//       name,
//       email,
//       password
//     });
//     // Selectively return fields (excluding password)
//     const user = {
//       _id: newUser._id,
//       name: newUser.name,
//       email: newUser.email,
//       isAdmin: newUser.isAdmin,
//       isActive: newUser.isActive,
//       createdAt: newUser.createdAt,
//       updatedAt: newUser.updatedAt
//     };
//     return user;
//   } catch (error) {
//     customServiceErrorHandler(error);
//     return;
//   }
// }
