import { encode } from '../../utils/auth';
import loader from '../../utils/loader';

import {
  userById,
} from './loaders';

export default class Controller {
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
