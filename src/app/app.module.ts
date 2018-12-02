import { GraphQLModule } from '@graphql-modules/core';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';

export const AppModule = new GraphQLModule({
  imports: [
    AuthModule,
    UserModule
  ],
});
