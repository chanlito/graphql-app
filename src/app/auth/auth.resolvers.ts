export const resolvers = {
  Mutation: {
    signIn: () => ({
      token: '...',
      user: {
        id: '1',
        username: 'chanlito',
        email: 'chanlito@mailinator.com',
        password: '...',
      },
    }),
  },
};
