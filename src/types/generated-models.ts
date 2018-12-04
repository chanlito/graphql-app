export interface CreateUserInput {
  firstName: string;

  lastName: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  user: User;
}

export interface User {
  id: string;

  firstName: string;

  lastName: string;

  fullName: string;
}

export interface Mutation {
  createUser: User;
}

// ====================================================
// Arguments
// ====================================================

export interface UserQueryArgs {
  id: string;
}
export interface CreateUserMutationArgs {
  input: CreateUserInput;
}

import { GraphQLResolveInfo, GraphQLScalarTypeConfig } from 'graphql';

import { AppContext } from 'src/types/context';

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
  export interface Resolvers<Context = AppContext, TypeParent = {}> {
    user?: UserResolver<User, TypeParent, Context>;
  }

  export type UserResolver<
    R = User,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }
}

export namespace UserResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    fullName?: FullNameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string,
    Parent = User,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = User,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
  export type FullNameResolver<
    R = string,
    Parent = User,
    Context = AppContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = AppContext, TypeParent = {}> {
    createUser?: CreateUserResolver<User, TypeParent, Context>;
  }

  export type CreateUserResolver<
    R = User,
    Parent = {},
    Context = AppContext
  > = Resolver<R, Parent, Context, CreateUserArgs>;
  export interface CreateUserArgs {
    input: CreateUserInput;
  }
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  AppContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  AppContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  AppContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string | null;
}
