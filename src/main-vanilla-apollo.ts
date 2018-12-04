import { ApolloServer, gql } from 'apollo-server-express';
import express from 'express';
import { extractFragmentReplacements } from 'prisma-binding';

import { Prisma as PrismaBinding } from './lib/prisma/prisma-binding';

const {
  PRISMA_ENDPOINT = 'https://us1.prisma.sh/chanlito-607279/graphql-app/dev', // this uses primsa demo server
  PRISMA_MANAGEMENT_API_SECRET,
  NODE_ENV = 'development',
  PORT = '4000',
} = process.env;

interface MyContext {
  db: PrismaBinding;
}

const resolvers = {
  Mutation: {
    createUser: (parent, args, ctx: MyContext, info) => {
      return ctx.db.mutation.createUser({
        data: {
          firstName: args.input.firstName,
          lastName: args.input.lastName,
        },
      });
    },
  },

  Query: {
    user: (parent, args, ctx: MyContext, info) => {
      return ctx.db.query.user({ where: { id: args.id } }, info);
    },
  },

  User: {
    id: ({ id }) => id,
    firstName: ({ firstName }) => firstName,
    lastName: ({ lastName }) => lastName,
    fullName: {
      fragment: 'fragment FirstAndLastNames on User { firstName, lastName }',
      resolve: ({ firstName, lastName }) => `${firstName} ${lastName}`,
    },
  },
};

const fragmentReplacements = extractFragmentReplacements(resolvers);

const db = new PrismaBinding({
  endpoint: PRISMA_ENDPOINT,
  secret: PRISMA_MANAGEMENT_API_SECRET,
  debug: NODE_ENV === 'development',
  fragmentReplacements,
});

const server = new ApolloServer({
  resolvers,
  typeDefs: gql`
    type Query {
      user(id: String!): User!
    }

    type Mutation {
      createUser(input: CreateUserInput!): User!
    }

    type User {
      id: String!
      firstName: String!
      lastName: String!
      fullName: String!
    }

    input CreateUserInput {
      firstName: String!
      lastName: String!
    }
  `,
  context: params => ({ ...params, db }),
});

const app = express();

server.applyMiddleware({ app });

app.listen(PORT, () => console.log(`🚀 Listening on port ${PORT}`));
