require('dotenv').config({ path: '.env' });

module.exports = {
  host: process.env.CACHE_HOST,
  port: process.env.CACHE_PORT,
  prefix: process.env.CACHE_PREFIX,
};
