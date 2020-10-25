require('dotenv').config({ path: '.env' });

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
