import { AuthenticationError } from 'apollo-server-core';

export const isAuthenticated = () => next => async (
  root,
  args,
  context,
  info,
) => {
  if (!context.user) {
    throw new AuthenticationError('You are not authenticated.');
  }
  return next(root, args, context, info);
};

export const hasRole = (role: string) => next => async (
  root,
  args,
  context,
  info,
) => {
  if (!context.user.roles || context.user.roles.includes(role)) {
    throw new Error('You are not authorized!');
  }
  return next(root, args, context, info);
};
