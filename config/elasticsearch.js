import { ENV_TEST } from '../src/constants';

require('dotenv').config({
  path: (process.env.NODE_ENV !== ENV_TEST) ? '.env' : '.env.test',
});

module.exports = {
  node: process.env.ES_HOST,
  maxRetries: 5,
  requestTimeout: 60000,
  sniffOnStart: true,
  // ssl: null,
  // cloud: { id: null },
  // auth: {
  //  username: null,
  //  password: null,
  //  apiKey: null,
  // },
};
