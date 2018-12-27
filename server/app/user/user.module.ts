import { GraphQLModule } from '@graphql-modules/core';
import { importSchema } from 'graphql-import';

import { AuthModule } from '../auth';
import { isAuthenticated } from '../auth/auth.guards';
import { PrismaModule } from '../prisma';
import resolvers from './user.resolvers';

export const UserModule = new GraphQLModule({
  imports: [AuthModule, PrismaModule],
  typeDefs: importSchema('server/app/user/user.schema.graphql'),
  resolverValidationOptions: { requireResolversForResolveType: false },
  resolvers,
  resolversComposition: {
    'Query.user': [isAuthenticated()],
    'Query.users': [isAuthenticated()],
  },
});
