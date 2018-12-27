import { extractFragmentReplacements } from 'prisma-binding';

import { Prisma as PrismaBinding } from './prisma-binding';

const { NODE_ENV, PRISMA_ENDPOINT, PRISMA_MANAGEMENT_API_SECRET } = process.env;

export function initPrismaBinding(resolvers?: any) {
  return new PrismaBinding({
    endpoint: PRISMA_ENDPOINT,
    secret: PRISMA_MANAGEMENT_API_SECRET,
    debug: NODE_ENV === 'development',
    fragmentReplacements: extractFragmentReplacements(resolvers),
  });
}

export * from './prisma-binding';
