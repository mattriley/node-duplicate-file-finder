const composer = require('module-composer');
const modules = require('./modules');

module.exports = (overrides = {}) => {

    const compose = composer(modules, { overrides });

    const strategies = compose('strategies');
    const io = compose('io', {}, io => io.setup());
    const lib = compose('lib', { strategies, io });
    compose('commands', { strategies, lib });

    return compose.modules;

};
