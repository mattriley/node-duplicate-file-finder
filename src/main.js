const compose = require('./compose');
const { modules } = compose({});
const { commands, strategies } = modules;
module.exports = { ...commands, strategies };
