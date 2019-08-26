const path = require('path');
const fs = require('fs');

try {
  const dbPath = path.resolve(process.cwd() + '/database/dbtest.sqlite');
  fs.stat(dbPath, (err) => {
    if (!err) {
      fs.unlinkSync(dbPath, (error) => {
        if (!error) global.console.log('Deleted file: ', dbPath);
      });
    }
  });
} catch(err) {
  global.console.log(err);
}
