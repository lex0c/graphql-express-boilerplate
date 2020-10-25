require('dotenv').config({ path: '.env' });

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
