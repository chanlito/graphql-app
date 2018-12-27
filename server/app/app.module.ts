import { GraphQLModule } from '@graphql-modules/core';

import { NetworkRequest } from '../types';
import { AuthModule } from './auth';
import { AuthService } from './auth/auth.service';
import { UserModule } from './user';

export const AppModule = new GraphQLModule({
  imports: [AuthModule, UserModule],
  resolverValidationOptions: { requireResolversForResolveType: false },
  context: async (
    { req }: NetworkRequest,
    currentContext,
    { injector }: GraphQLModule,
  ) => {
    const authService = injector.get<AuthService>(AuthService);
    const token = (req.headers.authorization || '').replace(/Bearer /gi, '');
    const user = await authService.authorizeUser(token);
    return { user };
  },
});
