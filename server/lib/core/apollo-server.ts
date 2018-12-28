import { ApolloServer } from 'apollo-server-express';

import { AppModule } from '../../app/app.module';
import { initPrismaBinding } from '../prisma/prisma-binding';

const { schema, context, resolvers } = AppModule;

const prismaBinding = initPrismaBinding(resolvers);

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: (ctx: any) => context({ ...ctx, prismaBinding }),
  subscriptions: {
    path: '/',
  },
});

export default apolloServer;
