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
  Mutation: {
    deletePost: async (_, { id }) => {
      try {
        const post = await prisma.post.findUnique({
          where: {
            id: id,
          },
        });

        if (!post) {
          return {
            code: 404,
            success: false,
            message: "Post not found",
          };
        }

        await prisma.post.delete({
          where: {
            id: id,
          },
        });

        return {
          code: 200,
          success: true,
          message: "Post deleted successfully",
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err.extensions.response.body}`,
        };
      }
    },
  },
};
