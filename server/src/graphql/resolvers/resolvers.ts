import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        allUsers: () => {
            return prisma.user.findMany()
        }
    },
    Mutation: {},
}

