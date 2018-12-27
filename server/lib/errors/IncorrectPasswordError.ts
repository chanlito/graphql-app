import { ApolloError } from 'apollo-server-core';

export class IncorrectPasswordError extends ApolloError {
  constructor() {
    super('Password is incorrect.', 'INCORRECT_PASSWORD');
  }
}
