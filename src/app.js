const compose = require('./compose');
const { commands, strategies } = compose({});
module.exports = { ...commands, strategies };
