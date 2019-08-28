const cronConfig = require('../config/cron.js');

module.exports = (cron) => {
  cron.schedule('* * * * *', () => {
    global.console.log('Running a job');
  }, {
    scheduled: true,
    timezone: cronConfig.timezone,
  });
};
