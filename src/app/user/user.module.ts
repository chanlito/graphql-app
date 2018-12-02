import { GraphQLModule } from '@graphql-modules/core';
import { importSchema } from 'graphql-import';
import { resolve } from 'path';

import * as resolvers from './user.resolvers';

export const UserModule = new GraphQLModule({
  resolvers,
  typeDefs: importSchema(resolve('.', 'src/app/user/user.schema.graphql')),
});
