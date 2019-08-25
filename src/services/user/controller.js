import { encode } from '../../utils/auth';
import loader from '../../utils/loader';

import { userById } from './loaders';

import { USER_EMAIL_ALREADY_IN_USE } from '../../constants';

export default class Controller {
  static async createUser({ input }, { db: { sequelize } }) {
    if (!(await sequelize.User.findOne({ where: { email: input.email } }))) {
      return sequelize.User.create(input);
    }

    throw new Error(USER_EMAIL_ALREADY_IN_USE);
  }

  static async authenticate(_, context) {
    return { token: encode(context.auth.token) };
  }

  static async me(_, context) {
    const user = context.auth.user;
    const resp = await loader({
      cacheKey: `me:${user.id}`,
      loaderInstance: userById(user),
    });
    return resp;
  }
}
