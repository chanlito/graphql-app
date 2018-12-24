import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { AppModule } from './app/app.module';
import { initPrismaBinding } from './lib/prisma/prisma-binding';

const { PORT = '4000' } = process.env;

(async function main() {
  const { schema, context, resolvers } = AppModule;

  const prismaBinding = initPrismaBinding(resolvers);

  const server = new ApolloServer({
    schema,
    context: ctx => context({ ...ctx, prismaBinding }),
    introspection: true,
    playground: true,
  });

  const app = express();
  server.applyMiddleware({ app, path: '/' });

  app.listen(PORT, () =>
    console.log(`🚀 Server ready at http://localhost:${PORT}`),
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
