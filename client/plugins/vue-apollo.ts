import { NuxtContext } from 'nuxt';

export default (ctx: NuxtContext) => ({
  httpEndpoint: 'http://localhost:4000/graphql',
  wsEndpoint: 'ws://localhost:4000',
});
