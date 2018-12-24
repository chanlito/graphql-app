import { GraphQLModule } from '@graphql-modules/core';
import { importSchema } from 'graphql-import';

import { PrismaModule } from '../prisma';
import * as resolvers from './user.resolvers';

export const UserModule = new GraphQLModule({
  imports: [PrismaModule],
  resolvers: resolvers as any,
  typeDefs: importSchema('src/app/user/user.schema.graphql'),
});
