import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';
import { extractFragmentReplacements } from 'prisma-binding';

import { AppModule } from './app/app.module';
import { Prisma as PrismaBinding } from './lib/prisma/prisma-binding';

const {
  PRISMA_ENDPOINT = 'https://us1.prisma.sh/chanlito-607279/graphql-app/dev', // this uses primsa demo server
  PRISMA_MANAGEMENT_API_SECRET,
  NODE_ENV = 'development',
  PORT = '4000',
} = process.env;

(async function main() {
  const { context, resolvers, typeDefs } = AppModule;

  const fragmentReplacements = extractFragmentReplacements(resolvers);

  const db = new PrismaBinding({
    endpoint: PRISMA_ENDPOINT,
    secret: PRISMA_MANAGEMENT_API_SECRET,
    debug: NODE_ENV === 'development',
    fragmentReplacements,
  });

  const server = new ApolloServer({
    resolvers,
    typeDefs,
    introspection: true,
    playground: true,
    context: request => context({ ...request, db }),
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen(PORT, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
