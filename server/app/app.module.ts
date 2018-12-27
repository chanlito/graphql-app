import { GraphQLModule } from '@graphql-modules/core';

import { UserModule } from './user';

export const AppModule = new GraphQLModule({
  imports: [UserModule],
});
