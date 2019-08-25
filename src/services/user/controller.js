import { encode } from '../../utils/auth';
import loader from '../../utils/loader';

import { userById } from './loaders';

import { USER_EMAIL_EXISTS } from '../../constants';

const { User } = require('../../models').default;

export default class Controller {
  static async createUser({ input }) {
    if (!(await User.findOne({ where: { email: input.email } }))) {
      return User.create(input);
    }

    throw new Error(USER_EMAIL_EXISTS);
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
