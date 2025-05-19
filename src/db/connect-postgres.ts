import { PrismaClient } from '../../generated/prisma/index.js';

const prisma = new PrismaClient();

const connectPostgres = async () => {
  if (prisma) {
    await prisma.$connect();
  }
};

export default connectPostgres;
