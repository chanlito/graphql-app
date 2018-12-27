import { ApolloServer } from 'apollo-server-express';
import { createTestClient } from 'apollo-server-testing';

import { AppModule } from '@/app/app.module';

const { schema, context } = AppModule;

const server = new ApolloServer({
  schema,
  context,
  introspection: true,
  playground: true,
});

const { mutate, query } = createTestClient(server);

export { mutate, query };
