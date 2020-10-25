import Model from '../model';

import { generateHash } from '../../utils/auth';

export default class User extends Model {
  static async findOneByEmail(email) {
    const data = this.extract(
        await this.db.raw(`SELECT * FROM users WHERE email = :email LIMIT 1`, { email })
    );

    return data ? data[0] : null;
  }

  static async createOne(user) {
    const result = await this.db.insert([{
      name: user.name,
      email: user.email,
      password_hash: await generateHash(user.password),
    }], ['id']).into('users');

    return result[0];
  }
}
