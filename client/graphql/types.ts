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

export type DateTime = any;

// ====================================================
// Documents
// ====================================================

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
