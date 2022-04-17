const boot = require('./src/boot');
const { commands, strategies } = boot();
module.exports = { ...commands, strategies };
