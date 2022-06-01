const crypto = require('crypto');
const res = crypto.createHash('md5').update('1653903981rayplus').digest('hex');
console.log(res);