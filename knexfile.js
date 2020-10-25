require('dotenv').config({ path: '.env' });

const knexDefaults = () => ({
  acquireConnectionTimeout: 10000,
  log: {
    warn(message) {
      // noop
    },
    error(message) {
      console.error('knex error: ', message);
    },
    deprecate(message) {
      // noop
    },
    debug(message) {
      // noop
    },
  },
  migrations: {
    directory: './database/migrations',
    stub: './database/migrations/migration.stub',
  },
  // seeds: {
  //   directory: './database/seeds',
  //   stub: './database/seeds/seed.stub',
  // },
  pool: {
    min: 2,
    max: 10,
  },
});

module.exports = {
  // test: {
  //   client: 'sqlite3',
  //   connection: {
  //     filename: process.env.SQLITE_FILE_PATH_TEST,
  //   },
  //   useNullAsDefault: true,
  //   ...knexDefaults(),
  // },
  development: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST_DEV,
      user: process.env.DB_USER_DEV,
      password: process.env.DB_PASSWORD_DEV,
      database: process.env.DB_NAME_DEV,
    },
    ...knexDefaults(),
  },
  production: {
    client: 'pg',
    connection: {
      host: process.env.DB_HOST_PROD,
      user: process.env.DB_USER_PROD,
      password: process.env.DB_PASSWORD_PROD,
      database: process.env.DB_NAME_PROD,
    },
    ...knexDefaults(),
  },
};
