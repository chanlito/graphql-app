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
// Documents
// ====================================================

export namespace SignIn {
  export type Variables = {
    emailOrUsername: string;
    password: string;
  };

  export type Mutation = {
    __typename?: 'Mutation';

    signIn: SignIn;
  };

  export type SignIn = {
    __typename?: 'AuthPayload';

    token: string;

    user: User;
  };

  export type User = {
    __typename?: 'User';

    id: string;

    email: string;

    username: string;

    firstName: string;

    lastName: string;

    fullName: string;
  };
}

export namespace GetUsers {
  export type Variables = {};

  export type Query = {
    __typename?: 'Query';

    users: Users[];
  };

  export type Users = {
    __typename?: 'User';

    id: string;

    fullName: string;
  };
}
