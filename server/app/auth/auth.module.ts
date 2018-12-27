import { GraphQLModule } from '@graphql-modules/core';
import { importSchema } from 'graphql-import';

import { PrismaModule } from '../prisma';
import resolvers from './auth.resolvers';
import { AuthService } from './auth.service';

export const AuthModule = new GraphQLModule({
  typeDefs: importSchema('server/app/auth/auth.schema.graphql'),
  resolvers,
  resolverValidationOptions: { requireResolversForResolveType: false },
  imports: [PrismaModule],
  providers: [AuthService],
});
