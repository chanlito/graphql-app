import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { AppModule } from './app/app.module';

(async function main() {
  const { schema, context } = AppModule;
  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    playground: true,
    subscriptions: {
      path: '/subscriptions',
    },
  });

  const app = express();
  server.applyMiddleware({ app });

  app.listen({ port: 4000 }, () =>
    console.log(
      `🚀 Server ready at http://localhost:4000${server.graphqlPath}`,
    ),
  );
})().catch(err => {
  console.error(err);
  process.exit(1);
});
