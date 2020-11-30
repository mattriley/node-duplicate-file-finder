const boot = require('./boot');
const { commands, strategies } = boot();
module.exports = { ...commands, strategies };
