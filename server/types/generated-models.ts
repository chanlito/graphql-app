export type Maybe<T> = T | null;

export interface SignInInput {
  emailOrUsername: string;

  password: string;
}

export interface SignUpInput {
  email: string;

  username: string;

  password: string;

  firstName: string;

  lastName: string;
}

// ====================================================
// Types
// ====================================================

export interface Query {
  user: User;

  users: User[];
}

export interface User {
  id: string;

  email: string;

  username: string;

  firstName: string;

  lastName: string;

  fullName: string;
}

export interface Mutation {
  signIn: AuthPayload;

  signUp: AuthPayload;
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
  input: SignInInput;
}
export interface SignUpMutationArgs {
  input: SignUpInput;
}

import { GraphQLResolveInfo } from 'graphql';

import { ModuleContext } from '@graphql-modules/core';

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
  export interface Resolvers<Context = ModuleContext, TypeParent = {}> {
    user?: UserResolver<User, TypeParent, Context>;

    users?: UsersResolver<User[], TypeParent, Context>;
  }

  export type UserResolver<
    R = User,
    Parent = {},
    Context = ModuleContext
  > = Resolver<R, Parent, Context, UserArgs>;
  export interface UserArgs {
    id: string;
  }

  export type UsersResolver<
    R = User[],
    Parent = {},
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
}

export namespace UserResolvers {
  export interface Resolvers<Context = ModuleContext, TypeParent = User> {
    id?: IdResolver<string, TypeParent, Context>;

    email?: EmailResolver<string, TypeParent, Context>;

    username?: UsernameResolver<string, TypeParent, Context>;

    firstName?: FirstNameResolver<string, TypeParent, Context>;

    lastName?: LastNameResolver<string, TypeParent, Context>;

    fullName?: FullNameResolver<string, TypeParent, Context>;
  }

  export type IdResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type EmailResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type UsernameResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type FirstNameResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type LastNameResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type FullNameResolver<
    R = string,
    Parent = User,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
}

export namespace MutationResolvers {
  export interface Resolvers<Context = ModuleContext, TypeParent = {}> {
    signIn?: SignInResolver<AuthPayload, TypeParent, Context>;

    signUp?: SignUpResolver<AuthPayload, TypeParent, Context>;
  }

  export type SignInResolver<
    R = AuthPayload,
    Parent = {},
    Context = ModuleContext
  > = Resolver<R, Parent, Context, SignInArgs>;
  export interface SignInArgs {
    input: SignInInput;
  }

  export type SignUpResolver<
    R = AuthPayload,
    Parent = {},
    Context = ModuleContext
  > = Resolver<R, Parent, Context, SignUpArgs>;
  export interface SignUpArgs {
    input: SignUpInput;
  }
}

export namespace AuthPayloadResolvers {
  export interface Resolvers<
    Context = ModuleContext,
    TypeParent = AuthPayload
  > {
    token?: TokenResolver<string, TypeParent, Context>;

    user?: UserResolver<User, TypeParent, Context>;
  }

  export type TokenResolver<
    R = string,
    Parent = AuthPayload,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
  export type UserResolver<
    R = User,
    Parent = AuthPayload,
    Context = ModuleContext
  > = Resolver<R, Parent, Context>;
}

/** Directs the executor to skip this field or fragment when the `if` argument is true. */
export type SkipDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  SkipDirectiveArgs,
  ModuleContext
>;
export interface SkipDirectiveArgs {
  /** Skipped when true. */
  if: boolean;
}

/** Directs the executor to include this field or fragment only when the `if` argument is true. */
export type IncludeDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  IncludeDirectiveArgs,
  ModuleContext
>;
export interface IncludeDirectiveArgs {
  /** Included when true. */
  if: boolean;
}

/** Marks an element of a GraphQL schema as no longer supported. */
export type DeprecatedDirectiveResolver<Result> = DirectiveResolverFn<
  Result,
  DeprecatedDirectiveArgs,
  ModuleContext
>;
export interface DeprecatedDirectiveArgs {
  /** Explains why this element was deprecated, usually also including a suggestion for how to access supported similar data. Formatted using the Markdown syntax (as specified by [CommonMark](https://commonmark.org/). */
  reason?: string;
}

export interface IResolvers {
  Query?: QueryResolvers.Resolvers;
  User?: UserResolvers.Resolvers;
  Mutation?: MutationResolvers.Resolvers;
  AuthPayload?: AuthPayloadResolvers.Resolvers;
}

export interface IDirectiveResolvers<Result> {
  skip?: SkipDirectiveResolver<Result>;
  include?: IncludeDirectiveResolver<Result>;
  deprecated?: DeprecatedDirectiveResolver<Result>;
}
