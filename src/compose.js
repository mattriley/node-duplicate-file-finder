const composer = require('module-composer');
const modules = require('./modules');

module.exports = ({ configs }) => {

    const { compose } = composer(modules, configs);
    const { strategies } = compose('strategies');
    const { io } = compose('io');
    const { lib } = compose('lib');
    const { effects } = compose('effects', { strategies, lib, io });
    compose('commands', { strategies, effects, lib });
    return compose.end();

};
