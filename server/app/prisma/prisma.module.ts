import { GraphQLModule } from '@graphql-modules/core';

import {
  Prisma as PrismaClient,
  prisma as prismaClient,
} from '@/lib/prisma/prisma-client';

export const PrismaModule = new GraphQLModule({
  providers: [
    {
      provide: PrismaClient,
      useValue: prismaClient,
    },
  ],
});
