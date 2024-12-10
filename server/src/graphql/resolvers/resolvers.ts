import { PrismaClient } from "@prisma/client";
import prismaRandom from "prisma-extension-random";

const prisma = new PrismaClient().$extends(prismaRandom());
import { DateTimeResolver } from "graphql-scalars";
import { Resolvers } from "../types";

export const resolvers: Resolvers = {
  Query: {
    // users: () => {
    //   return prisma.user.findMany();
    // },
    // user: (_, { id }) => {
    //   return prisma.user.findUnique({
    //     where: {
    //       id: id,
    //     },
    //   });
    // },
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
    createPost: async (_, { input }) => {
      try {
        const randomUser = await prisma.user.findRandom({
          select: {
            id: true,
          },
        });

        const post = await prisma.post.create({
          data: {
            title: input.title,
            content: input.content,
            addedAt: new Date(),
            authorId: randomUser.id,
          },
        });
        return {
          code: 200,
          success: true,
          message: "Post created successfully",
          post: {
            id: post.id,
            title: input.title,
            content: input.content,
            authorId: post.authorId,
            addedAt: post.addedAt,
          },
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err.extensions.response.body}`,
          post: null,
        };
      }
    },
    updatePost: async (_, { id, input }) => {
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
            post: null,
          };
        }

        await prisma.post.update({
          where: {
            id: id,
          },
          data: {
            title: input.title,
            content: input.content,
          },
        });

        return {
          code: 200,
          success: true,
          message: "Post updated successfully",
          post: {
            id: id,
            title: input.title,
            content: input.content,
            authorId: post.authorId,
            addedAt: post.addedAt,
          },
        };
      } catch (err) {
        return {
          code: 500,
          success: false,
          message: `Something went wrong: ${err.extensions.response.body}`,
          post: null,
        };
      }
    },
  },
};
