import { ApolloServer } from 'apollo-server-express';
import { Request, Response } from 'express';

import { AppModule } from '@/app/app.module';
import { initPrismaBinding } from '../prisma/prisma-binding';

const { schema, context, resolvers } = AppModule;

const prismaBinding = initPrismaBinding(resolvers);

const apolloServer = new ApolloServer({
  schema,
  introspection: true,
  playground: true,
  context: (ctx: Ctx) => context({ ...ctx, prismaBinding }),
  subscriptions: {
    path: '/',
  },
});

export default apolloServer;

interface Ctx {
  req: Request;
  res: Response;
}
