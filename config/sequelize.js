import { ENV_TEST } from '../src/constants';

require('dotenv').config({
  path: (process.env.NODE_ENV !== ENV_TEST) ? '.env' : '.env.test',
  debug: process.env.DEBUG,
});

module.exports = {
  username: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  host: process.env.DB_HOST,
  port: process.env.DB_PORT,
  dialect: process.env.DB_DIALECT,
  storage: './database/database.sqlite',
  logging: false,
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
};
