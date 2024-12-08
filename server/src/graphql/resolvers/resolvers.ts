import { PrismaClient } from '@prisma/client';
const prisma = new PrismaClient();

export const resolvers = {
    Query: {
        users: () => {
            return prisma.user.findMany()
        },
        user: (_, { id }) => {
            return prisma.user.findUnique({
                where: {
                    id: id
                }
            })
        }
    },
}

