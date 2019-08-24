export default {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'Foo',
      last_name: 'Bar',
      email: 'foobar@example.com',
      password_hash: 'secret123',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
