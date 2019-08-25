export default {
  up: (queryInterface) => {
    return queryInterface.bulkInsert('users', [{
      first_name: 'Testerson',
      last_name: 'Junior',
      email: 'jtesterson2019@gmail.com',
      password: 'secret123',
      created_at: new Date(),
      updated_at: new Date(),
    }], {});
  },
  down: (queryInterface) => {
    return queryInterface.bulkDelete('users', null, {});
  },
};
