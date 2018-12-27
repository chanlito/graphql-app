import { createServer } from 'http';

import apolloServer from './apollo-server';
import app from './app';

apolloServer.applyMiddleware({ app, path: '/' });

const server = createServer(app);

apolloServer.installSubscriptionHandlers(server);

export default server;
