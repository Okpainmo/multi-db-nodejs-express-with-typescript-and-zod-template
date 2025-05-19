// import { userModel } from '../models/user.model.js';
import { PrismaClient } from '../../../../generated/prisma/index.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';

const prisma = new PrismaClient();

export async function findUser__postgres({ userId, email }: { userId?: number; email?: string }) {
  try {
    if (email) {
      const user = await prisma.user.findUnique({
        where: { email }
      });

      return user;
    }

    if (userId) {
      const user = await prisma.user.findUnique({
        where: { id: userId }
      });

      return user;
    }

    return null;
  } catch (error) {
    customServiceErrorHandler(error);

    return;
  }
}

// export async function findUser__mongo({ userId, email }: { userId?: string | number; email?: string }) {
//   try {
//     if (email) {
//       const user = await userModel.findOne({
//         email
//       });

//       return user;
//     }

//     if (userId) {
//       const user = await userModel.findOne({
//         _id: userId
//       });

//       return user;
//     }

//     return;
//   } catch (error) {
//     customServiceErrorHandler(error);

//     return;
//   }
// }
