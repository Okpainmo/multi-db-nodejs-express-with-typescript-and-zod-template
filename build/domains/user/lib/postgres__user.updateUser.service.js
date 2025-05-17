import { PrismaClient } from '@prisma/client';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
const prisma = new PrismaClient();
export async function updateUser__postgres({ userId, email, requestBody }) {
    try {
        if (email) {
            const user = await prisma.user.update({
                where: { email },
                data: requestBody,
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
        if (userId) {
            const user = await prisma.user.update({
                where: { id: userId },
                data: requestBody,
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
