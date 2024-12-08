import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany()
        }
    },
}

