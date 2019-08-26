import bcrypt from 'bcrypt';

import { encode } from '../../utils/auth';

import {
  USER_EMAIL_ALREADY_IN_USE,
  EMAIL_OR_PASSWORD_INCORRECT,
} from '../../constants';

import { getUsersLoader } from './loaders';

export default class Controller {
  static async createUser({ input }, { db: { sequelize } }) {
    if (!(await sequelize.User.findOne({ where: { email: input.email } }))) {
      return sequelize.User.create(input);
    }

    throw new Error(USER_EMAIL_ALREADY_IN_USE);
  }

  static async authenticate({ input }, { db: { sequelize } }) {
    const user = await sequelize.User.findOne({ where: { email: input.email } });

    if (user) {
      const { dataValues } = user;
      const match = await bcrypt.compare(input.password, dataValues.password);
      if (match) {
        return {
          token: encode({
            id: dataValues.id,
            email: dataValues.email,
            firstName: dataValues.firstName,
            lastName: dataValues.lastName,
          }),
        };
      }
    }

    throw new Error(EMAIL_OR_PASSWORD_INCORRECT);
  }

  static async getUsers({ sequelize }) {
    return getUsersLoader({ sequelize }).load([]);
  }
}
