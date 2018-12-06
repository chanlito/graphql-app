export * from './prisma-binding';
import { Prisma as PrismaBinding } from './prisma-binding';
import { AppModule } from '../../../app/app.module';
import { extractFragmentReplacements } from 'prisma-binding';

const {
  PRISMA_ENDPOINT = 'https://us1.prisma.sh/chanlito-607279/graphql-app/dev', // this uses primsa demo server
  PRISMA_MANAGEMENT_API_SECRET,
  NODE_ENV = 'development',
} = process.env;

export const prismaBinding = new PrismaBinding({
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_MANAGEMENT_API_SECRET,
  debug: NODE_ENV === 'development',
  fragmentReplacements: extractFragmentReplacements(AppModule.resolvers),
});
