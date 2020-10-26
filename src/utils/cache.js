import Redis from 'redis';
import RedisMock from 'redis-mock';
import { promisify } from 'util';

import redisConfig from '../../config/redis';

import { ENV_TEST } from '../constants';

const redis = (process.env.NODE_ENV !== ENV_TEST) ? Redis : RedisMock;

const client = redis.createClient({
  ...redisConfig,
  detect_buffers: true,
  retry_strategy: (options) => {
    if (options.error && options.error.code === 'ECONNREFUSED') {
      return new Error('The server refused the connection');
    } else if (options.total_retry_time > (1000 * 60 * 60)) {
      return new Error('Retry time exhausted');
    } else if (options.attempt > 10) {
      return undefined;
    }
    return Math.min((options.attempt * 100), 3000);
  },
});

client.getAsync = promisify(client.get).bind(client);

client.flushAndQuit = () => {
  client.flushall(() => {});
  client.quit();
};

client.on('connect', () => {});
client.on('reconnecting', () => {});
client.on('error', () => {});
client.on('end', () => {});

export default client;

export const handle = async (key, data = null, expire = 3600) => {
  let cache = null;

  try {
    cache = JSON.parse(await client.getAsync(key));
  } catch (err) {
    global.console.error(err);
  }

  if (data) {
    client.set(key, JSON.stringify(data), 'EX', expire);
    cache = data;
  }

  return cache;
};
