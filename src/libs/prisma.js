import { PrismaClient } from '@prisma/client';

let prisma;

if (!global.prisma) {
  global.prisma = new PrismaClient(); // Almacenar la instancia globalmente
}

prisma = global.prisma;

export { prisma };