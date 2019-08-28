const fs = require('fs');
const path = require('path');
const cron = require('node-cron');

try {
  fs.readdirSync(path.resolve(`${__dirname}`)).forEach(file => {
    if (file.substr(-7) === '.job.js') {
      require(`${__dirname}/${file}`)(cron);
    }
  });
} catch (err) {
  global.console.error(err);
}

