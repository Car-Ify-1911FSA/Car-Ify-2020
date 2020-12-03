const db = require('./db');

// register models
console.log('db has been REQUIRED!');

require('./models');

console.log('models have been REQUIRED!');

module.exports = db;
