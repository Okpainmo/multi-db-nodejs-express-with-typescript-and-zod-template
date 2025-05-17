import { PrismaClient } from '@prisma/client';
import { customServiceErrorHandler } from '../../../utils/errorHandlers/customServiceErrorHandler.js';
const prisma = new PrismaClient();
export async function findUser__postgres({ userId, email }) {
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
    }
    catch (error) {
        customServiceErrorHandler(error);
        return;
    }
}
