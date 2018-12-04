import { GraphQLModule, ProviderScope } from '@graphql-modules/core';

import {
  Prisma as PrismaClient,
  prisma as prismaClient,
} from '@/lib/prisma/prisma-client';

import { Prisma as PrismaBinding } from '@/lib/prisma/prisma-binding';

const { PRISMA_ENDPOINT, PRISMA_MANAGEMENT_API_SECRET, NODE_ENV } = process.env;

export const PrismaModule = new GraphQLModule({
  providers: [
    {
      provide: PrismaClient,
      // scope: ProviderScope.Application,
      useFactory: () => prismaClient,
    },
    {
      provide: PrismaBinding,
      // scope: ProviderScope.Application,
      useFactory: () =>
        new PrismaBinding({
          endpoint: PRISMA_ENDPOINT,
          secret: PRISMA_MANAGEMENT_API_SECRET,
          debug: NODE_ENV === 'development',
          // fragmentReplacements: extractFragmentReplacements(resolvers),
        }),
    },
  ],
});
