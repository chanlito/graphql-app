export interface SignInInput {
  email: string;

  password: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  user: User;
}

export interface User {
  id: string;

  username: string;

  email: string;

  password: string;

  createdAt: string;

  updatedAt: string;
}

export interface Mutation {
  signIn: AuthPayload;
}

export interface AuthPayload {
  token: string;

  user: User;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface SignInMutationArgs {
  input?: SignInInput | null;
}

import { GraphQLResolveInfo, GraphQLScalarTypeConfig } from 'graphql';

export type Resolver<Result, Parent = {}, Context = {}, Args = {}> = (
  parent: Parent,
  args: Args,
  context: Context,
  info: GraphQLResolveInfo,
) => Promise<Result> | Result;

export interface ISubscriptionResolverObject<Result, Parent, Context, Args> {
  subscribe<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): AsyncIterator<R | Result> | Promise<AsyncIterator<R | Result>>;
  resolve?<R = Result, P = Parent>(
    parent: P,
    args: Args,
    context: Context,
    info: GraphQLResolveInfo,
  ): R | Result | Promise<R | Result>;
}

export type SubscriptionResolver<
  Result,
  Parent = {},
  Context = {},
  Args = {}
> =
  | ((
      ...args: any[]
    ) => ISubscriptionResolverObject<Result, Parent, Context, Args>)
  | ISubscriptionResolverObject<Result, Parent, Context, Args>;

type Maybe<T> = T | null | undefined;

export type TypeResolveFn<Types, Parent = {}, Context = {}> = (
  parent: Parent,
  context: Context,
  info: GraphQLResolveInfo,
) => Maybe<Types>;

export type NextResolverFn<T> = () => Promise<T>;

export type DirectiveResolverFn<TResult, TArgs = {}, TContext = {}> = (
  next: NextResolverFn<TResult>,
  source: any,
  args: TArgs,
  context: TContext,
  info: GraphQLResolveInfo,
) => TResult | Promise<TResult>;

export namespace QueryResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    user?: UserResolver<User, TypeParent, Context>;
  }

  export type UserResolver<R = User, Parent = {}, Context = {}> = Resolver<
    R,
    Parent,
    Context,
    UserArgs
  >;
  export interface UserArgs {
    id: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = {}, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    password?: PasswordResolver<string, TypeParent, Context>;

    createdAt?: CreatedAtResolver<string, TypeParent, Context>;

    updatedAt?: UpdatedAtResolver<string, TypeParent, Context>;
  }

  export type IdResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type UsernameResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<R = string, Parent = User, Context = {}> = Resolver<
    R,
    Parent,
    Context
  >;
  export type PasswordResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type CreatedAtResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UpdatedAtResolver<
    R = string,
    Parent = User,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = {}, TypeParent = {}> {
    signIn?: SignInResolver<AuthPayload, TypeParent, Context>;
  }

  export type SignInResolver<
    R = AuthPayload,
    Parent = {},
    Context = {}
  > = Resolver<R, Parent, Context, SignInArgs>;
  export interface SignInArgs {
    input?: SignInInput | null;
  }
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<Context = {}, TypeParent = AuthPayload> {
    token?: TokenResolver<string, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;
  }

  export type TokenResolver<
    R = string,
    Parent = AuthPayload,
    Context = {}
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = AuthPayload,
    Context = {}
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  {}
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  {}
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  {}
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string | null;
}
