import cronConfig from '../config/cron.js';

import { esBulkSync } from '../src/utils/elasticsearch';

export default (cron, { sequelize }) => {
  cron.schedule('0 1 * * *', async () => {
    const users = await sequelize.User.findAll({ attributes: ['id', 'email', 'firstName', 'lastName'] });
    esBulkSync('users', users);
    global.console.log('Running users-es-sync job');
  }, {
    scheduled: true,
    timezone: cronConfig.timezone,
  });
};

