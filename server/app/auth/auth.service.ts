import { Injectable } from '@graphql-modules/di';
import { compare, hash } from 'bcryptjs';
import { sign, SignOptions, verify, VerifyOptions } from 'jsonwebtoken';
import { promisify } from 'util';

import { IncorrectPasswordError, UserNotFoundError } from '../../lib/errors';
import { Prisma as PrismaClient } from '../../lib/prisma/prisma-client';
import { ApolloError } from 'apollo-server-core';

const signAsync = promisify<
  string | object | Buffer,
  string,
  SignOptions,
  string
>(sign);

const verifyAsync = promisify<
  string,
  string | Buffer,
  VerifyOptions,
  string | object
>(verify);

const { JWT_SECRET = 'change-me' } = process.env;

@Injectable()
export class AuthService {
  constructor(private db: PrismaClient) {}

  comparePasswords(passwordString: string, passwordHash: string) {
    return compare(passwordString, passwordHash);
  }

  hashPassword(password: string) {
    return hash(password, 10);
  }

  signToken(options: SignTokenOptions) {
    return signAsync({ id: options.id, email: options.email }, JWT_SECRET, {
      expiresIn: options.expiresIn || '7 days',
    });
  }

  verifyToken(token: string) {
    return verifyAsync(token, JWT_SECRET, {});
  }

  async createAccount(options: CreateAccountOptions) {
    const { password, ...rest } = options;
    const hashedPassword = await this.hashPassword(password);
    const user = await this.db.createUser({
      password: hashedPassword,
      ...rest,
    });
    return { ...user, fullName: '' };
  }

  async verifyAccount(emailOrUsername: string, password: string) {
    const [user] = await this.db.users({
      where: {
        OR: [
          {
            email: emailOrUsername,
          },
          {
            username: emailOrUsername,
          },
        ],
      },
      first: 1,
    });
    if (!user) throw new UserNotFoundError();

    const isPasswordCorrect = await this.comparePasswords(
      password,
      user.password,
    );
    if (!isPasswordCorrect) throw new IncorrectPasswordError();

    return { ...user, fullName: '' };
  }

  async authorizeUser(token: string) {
    if (!token) return null;
    const payload: any = await this.verifyToken(token).catch(err => {
      // console.error(err);
      // We'll handle this elsewhere.
    });
    return payload ? this.db.user({ id: payload.id }) : null;
  }
}

interface CreateAccountOptions {
  email: string;
  username: string;
  password: string;
  firstName: string;
  lastName: string;
}

interface SignTokenOptions {
  id: string;
  email: string;
  expiresIn?: string | number;
}
