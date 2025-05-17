import { PrismaClient } from '@prisma/client';
import type { UserSpecs } from '../../user/schema/user.schema.js';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';

const prisma = new PrismaClient();

export async function createUser__postgres(data: { user: UserSpecs }) {
  try {
    // Create new user
    if (data.user.email && data.user.password && data.user.password) {
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
  } catch (error) {
    customServiceErrorHandler(error);

    return;
  }
}
