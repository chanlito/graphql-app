import { IResolvers } from '../../types';
import { AuthService } from './auth.service';

const resolvers: IResolvers = {
  Mutation: {
    signIn: async (root, args, { injector }, info) => {
      const authService = injector.get<AuthService>(AuthService);
      const user = await authService.verifyAccount(
        args.input.emailOrUsername,
        args.input.password,
      );
      const token = await authService.signToken({
        id: user.id,
        email: user.email,
      });
      return { token, user };
    },

    signUp: async (root, args, { injector }, info) => {
      const authService = injector.get<AuthService>(AuthService);
      const user = await authService.createAccount(args.input);
      const token = await authService.signToken({
        id: user.id,
        email: user.email,
      });
      return { token, user };
    },
  },
};

export default resolvers as any;
