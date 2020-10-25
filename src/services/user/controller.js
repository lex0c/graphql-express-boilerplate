import bcrypt from 'bcrypt';

import { encode } from '../../utils/auth';

import {
  USER_EMAIL_ALREADY_IN_USE,
  EMAIL_OR_PASSWORD_INCORRECT,
} from '../../constants';

import User from './model';

export default class Controller {
  static async createUser({ input }, { db: { knex } }) {
    const userContext = User.setContext({ db: knex });

    const user = await userContext.findOneByEmail(input.email);

    if (!user) {
      return userContext.createOne(input);
    }

    throw new Error(USER_EMAIL_ALREADY_IN_USE);
  }

  static async authenticate({ input }, { db: { knex } }) {
    const userContext = User.setContext({ db: knex });

    const user = await userContext.findOneByEmail(input.email);

    if (user && (await bcrypt.compare(input.password, user.password_hash))) {
      return {
        token: encode({
          id: user.id,
          email: user.email,
          name: user.name,
        }),
      };
    }

    throw new Error(EMAIL_OR_PASSWORD_INCORRECT);
  }
}
