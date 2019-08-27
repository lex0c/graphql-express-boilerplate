import { ENV_TEST } from '../src/constants';

require('dotenv').config({
  path: (process.env.NODE_ENV !== ENV_TEST) ? '.env' : '.env.test',
});

module.exports = {
  options: {
    autoIndex: false,
    reconnectTries: Number.MAX_VALUE,
    reconnectInterval: 500,
    poolSize: 10,
    bufferMaxEntries: 0,
    useNewUrlParser: true,
  },
  url: process.env.MONGODB_CONNECTION_URL,
};
