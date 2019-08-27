import mongoose from 'mongoose';

import dbConfig from '../../config/mongodb';

export default mongoose.connect(dbConfig.url, dbConfig.options).then(() => {
  global.console.info('mongodb: Is connected!');
}, (err) => {
  global.console.error(err);
  throw 'mongodb: Something is wrong on connection!'
});
