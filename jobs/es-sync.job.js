import cronConfig from '../config/cron.js';

import { esBulkSync } from '../src/utils/elasticsearch';

const DB = require('../src/models').default;

export default (cron) => {
  cron.schedule('0 1 * * *', () => {
    populateESUsers();
  }, {
    scheduled: true,
    timezone: cronConfig.timezone,
  });
};

export const populateESUsers = async () => {
  global.console.log('Running: populateESUsers');
  const users = await DB.User.findAll({
    attributes: ['id', 'email', 'firstName', 'lastName'],
  });
  return esBulkSync('users', users).then((resp) => {
    global.console.log('Finished: populateESUsers');
    return resp;
  });
};

