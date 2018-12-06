import 'reflect-metadata';

import { ApolloServer } from 'apollo-server-express';
import express from 'express';

import { AppModule } from './app/app.module';

const {
  PORT = '4000',
} = process.env;

(async function main() {
  const { schema, context } = AppModule;

  const server = new ApolloServer({
    schema,
    context,
    introspection: true,
    playground: true,
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
