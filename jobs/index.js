import fs from 'fs';
import path from 'path';
import cron from 'node-cron';

try {
  fs.readdirSync(path.resolve(`${__dirname}`)).forEach(file => {
    if (file.substr(-7) === '.job.js') {
      require(`${__dirname}/${file}`).default(cron, {
        sequelize: require('../src/models').default,
      });
    }
  });
} catch (err) {
  global.console.error(err);
}
