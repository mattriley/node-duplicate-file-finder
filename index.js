const boot = require('./boot');
const { lib } = boot();
const { findDuplicatesAsync: findDuplicates } = lib;
module.exports = { findDuplicates };
