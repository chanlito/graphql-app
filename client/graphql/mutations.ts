import gql from 'graphql-tag';

export const SignInMutation = gql`
  mutation SignIn($emailOrUsername: String!, $password: String!) {
    signIn(input: { emailOrUsername: $emailOrUsername, password: $password }) {
      token
      user {
        id
        email
        username
        firstName
        lastName
        fullName
      }
    }
  }
`;
