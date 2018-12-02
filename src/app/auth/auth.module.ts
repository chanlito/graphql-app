import { GraphQLModule } from '@graphql-modules/core';
import { importSchema } from 'graphql-import';
import { resolve } from 'path';

import { resolvers } from './auth.resolvers';

export const AuthModule = new GraphQLModule({
  resolvers,
  typeDefs: importSchema(resolve('.', 'src/app/auth/auth.schema.graphql')),
});
