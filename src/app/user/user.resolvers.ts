import { QueryResolvers, UserResolvers } from '@/types';

export const Query: QueryResolvers.Resolvers = {
  user: (parent, args, ctx, info) => ({
    id: '1',
    username: 'chanlito',
    email: 'chanlito@mailinator.com',
    password: '',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  }),
};

export const User: UserResolvers.Resolvers = {
  id: ({ id }) => id,
  username: ({ username }) => username,
  email: ({ email }) => email,
  password: () => '******',
  createdAt: ({ createdAt }) => createdAt,
  updatedAt: ({ updatedAt }) => updatedAt,
};
