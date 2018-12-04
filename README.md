# GraphQL App using GraphQL-Modules vs Vanilla Apollo Server

> There are some issues encountered along the way when trying out GraphQL-Modules for the first time.

## Issues

1. The `context` in `graphql-modules` is not the same as vanilla apollo server.
2. The `prisma-binding` not working correctly when it comes to passing resolver fragments.
3. Unable to create a `PrismaModule` as a GraphQLModule because `prisma-binding` needs to `extractFragmentReplacements` from  graphql resolvers.

## Setup

```
yarn
```

## Development

- Start dev server using graphql-modules
```
yarn dev
```

- Start dev server using vanilla apollo server
```
yarn vanilla
```

## Run the following query

```graphql
query {
  user(id: "cjp935861exkv0a62xz543lzp") {
    id
    fullName
  }
}
```

Results aren't the same.
