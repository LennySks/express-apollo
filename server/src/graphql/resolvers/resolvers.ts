import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import { DateTimeResolver } from "graphql-scalars";

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
    posts: (_, { offset, limit }) => {
      return prisma.post.findMany({
        skip: offset,
        take: limit,
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
  DateTime: DateTimeResolver,
};
