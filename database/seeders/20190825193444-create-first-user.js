import '@babel/polyfill';

import { generatePasswordHash } from '../../src/utils/auth';

export default {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'Testerson',
      last_name: 'System',
      email: 'testerson@system.com',
      password_hash: await generatePasswordHash(process.env.TESTERSON_PASSWORD),
      created_at: new Date(),
      updated_at: new Date()
    }], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
