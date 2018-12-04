import { Prisma as PrismaBinding } from '@/lib/prisma/prisma-binding';
import { ModuleContext } from '@graphql-modules/core';

export interface AppContext extends ModuleContext {
  db: PrismaBinding;
}
