import { GraphQLModule } from '@graphql-modules/core';
import { Request } from 'express';

import { UserModule } from './user/user.module';

export const AppModule = new GraphQLModule<{}, Request, {}>({
  imports: [UserModule],
});
