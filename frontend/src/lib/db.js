import { PrismaClient } from './generated/prisma';

const prismaClientSingleton = () => {
  return new PrismaClient();
};

if (!global.prismaGlobal) {
  global.prismaGlobal = prismaClientSingleton();
}

const prisma = global.prismaGlobal;

export default prisma;
