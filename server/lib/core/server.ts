import express from 'express';
import { createServer } from 'http';
import { Builder, Nuxt } from 'nuxt-edge';
import { resolve } from 'path';

import apolloServer from './apollo-server';

const nuxtConfig = require(resolve('.', 'nuxt.config.js'));

const dev = process.env.NODE_ENV === 'development';

export default async function createHttpServer() {
  const app = express();

  apolloServer.applyMiddleware({ app, path: '/graphql' });

  const server = createServer(app);

  apolloServer.installSubscriptionHandlers(server);

  const nuxt = new Nuxt({ dev, ...nuxtConfig });

  if (dev) await new Builder(nuxt).build();

  app.use(nuxt.render);

  return server;
}
