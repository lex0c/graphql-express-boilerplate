import { ENV_TEST } from '../src/constants';

require('dotenv').config({
  path: (process.env.NODE_ENV !== ENV_TEST) ? '.env' : '.env.test',
  debug: process.env.DEBUG,
});

export default {
  sequelize: {
    username: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
    port: process.env.DB_PORT,
    logging: false,
    storage: './database/database.sqlite',
    define: {
      timestamps: true,
      underscored: true,
      underscoredAll: true,
    },
    pool: {
      max: 5,
      min: 0,
      idle: 10000,
      acquire: 30000,
    },
  },
};
