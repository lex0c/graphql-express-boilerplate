const crypto = require('crypto');

export default text => crypto.createHash('sha1').update(text, 'binary').digest('hex');

