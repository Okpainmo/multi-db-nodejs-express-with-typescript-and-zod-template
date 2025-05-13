import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const connectPostgres = async () => {
  if (prisma) {
    await prisma.$connect();
  }
};

export default connectPostgres;
