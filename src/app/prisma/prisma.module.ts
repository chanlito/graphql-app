import { GraphQLModule } from '@graphql-modules/core';
import { ProviderScope } from '@graphql-modules/di';

import {
  Prisma as PrismaBinding,
  prismaBinding,
} from '@/lib/prisma/prisma-binding';
import {
  Prisma as PrismaClient,
  prisma as prismaClient,
} from '@/lib/prisma/prisma-client';

export const PrismaModule = new GraphQLModule({
  providers: [
    {
      provide: PrismaClient,
      scope: ProviderScope.Request,
      useFactory: () => prismaClient,
    },
    {
      provide: PrismaBinding,
      scope: ProviderScope.Request,
      useFactory: () => prismaBinding,
    },
  ],
});
