import { UserNotFoundError } from '@/lib/errors';
import { Prisma as PrismaClient } from '@/lib/prisma/prisma-client';
import { MutationResolvers, QueryResolvers, UserResolvers } from '@/types';

export const Mutation: MutationResolvers.Resolvers = {
  createUser: async (_, args, { injector }, info) => {
    const db = injector.get<PrismaClient>(PrismaClient);
    const user = await db.createUser({
      firstName: args.input.firstName,
      lastName: args.input.lastName,
    });
    return { ...user, fullName: '' };
  },
};

export const Query: QueryResolvers.Resolvers = {
  user: async (_, args, { injector }, info) => {
    const db = injector.get<PrismaClient>(PrismaClient);
    const user = await db.user({ id: args.id });
    if (!user) throw new UserNotFoundError();
    return { ...user, fullName: '' };
  },
};

export const User: UserResolvers.Resolvers = {
  fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
};
