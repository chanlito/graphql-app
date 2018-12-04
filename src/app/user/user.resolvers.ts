import { MutationResolvers, QueryResolvers, UserResolvers } from '@/types';
import { ApolloError } from 'apollo-server-core';

export const Mutation: MutationResolvers.Resolvers = {
  createUser: async (parent, args, ctx, info) => {
    const user = await ctx.db.mutation.createUser({
      data: {
        firstName: args.input.firstName,
        lastName: args.input.lastName,
      },
    });
    return { ...user, fullName: '' };
  },
};

export const Query: QueryResolvers.Resolvers = {
  user: async (parent, args, ctx, info) => {
    const user = await ctx.networkRequest.db.query.user({ where: { id: args.id } }, info);
    if (!user) throw new ApolloError('User not found.');
    return { ...user, fullName: '' };
  },
};

export const User: UserResolvers.Resolvers = {
  id: ({ id }) => id,
  firstName: ({ firstName }) => firstName,
  lastName: ({ lastName }) => lastName,
  fullName: {
    fragment: 'fragment FirstAndLastNames on User { firstName, lastName }',
    resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
  } as any, // HACK: graphql-code-generator doesn't know fragment signature *bummer*
};
