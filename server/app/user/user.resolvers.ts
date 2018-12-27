import { UserNotFoundError } from '../../lib/errors';
import { Prisma as PrismaClient } from '../../lib/prisma/prisma-client';
import { IResolvers } from '../../types';

const resolvers: IResolvers = {
  Query: {
    user: async (_, args, ctx, info) => {
      console.log({ ctx });
      const db = ctx.injector.get<PrismaClient>(PrismaClient);
      const user = await db.user({ id: args.id });
      if (!user) throw new UserNotFoundError();
      return { ...user, fullName: '' };
    },

    users: async (root, args, ctx, info) => {
      console.log({ ctx });
      const db = ctx.injector.get<PrismaClient>(PrismaClient);
      const users = await db.users();
      return users.map(u => ({ ...u, fullName: '' }));
    },
  },

  User: {
    fullName: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  },
};

export default resolvers as any;
