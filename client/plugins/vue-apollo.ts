import Cookie from 'cookie-universal';

const cookie = Cookie();

const clientState = {
  defaults: {
    connected: cookie.get('connected') || '0',
    token: cookie.get('apollo-token') || '',
  },
  resolvers: {
    Mutation: {
      setConnected: (root, { value }, { cache }) => {
        const data = { connected: value };
        cache.writeData({ data });
        return null;
      },
    },
  },
};

export default ctx => ({
  httpEndpoint: 'http://localhost:4000/graphql',
  clientState,
});
