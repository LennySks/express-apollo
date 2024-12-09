import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const resolvers = {
  Query: {
    users: () => {
      return prisma.user.findMany();
    },
    user: (_, { id }) => {
      return prisma.user.findUnique({
        where: {
          id: id,
        },
      });
    },
    posts: () => {
      return prisma.post.findMany({
        skip: 0,
        take: 3,
        orderBy: {
          addedAt: "desc",
        },
        include: {
          author: true,
        },
      });
    },
    post: (_, { id }) => {
      return prisma.post.findUnique({
        where: {
          id: id,
        },
      });
    },
  },
  Post: {
    user: ({ authorId }) => {
      return prisma.user.findUnique({
        where: {
          id: authorId,
        },
      });
    },
  },
};
