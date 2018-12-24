import { ApolloError } from 'apollo-server-core';

export class UserNotFoundError extends ApolloError {
  constructor() {
    super('User was not found.', 'USER_NOT_FOUND');
  }
}
