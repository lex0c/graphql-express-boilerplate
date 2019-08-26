import '@babel/polyfill';

import faker from 'faker/locale/pt_BR';

import { generatePasswordHash } from '../../src/utils/auth';

export default {
  up: async (queryInterface) => {
    return queryInterface.bulkInsert('users', [
      {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password_hash: await generatePasswordHash(faker.internet.password(6)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password_hash: await generatePasswordHash(faker.internet.password(6)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password_hash: await generatePasswordHash(faker.internet.password(6)),
        created_at: new Date(),
        updated_at: new Date()
      },
      {
        first_name: faker.name.firstName(),
        last_name: faker.name.lastName(),
        email: faker.internet.email(),
        password_hash: await generatePasswordHash(faker.internet.password(6)),
        created_at: new Date(),
        updated_at: new Date()
      },
    ], {});
  },

  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  }
};
