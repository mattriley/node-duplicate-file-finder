const composer = require('module-composer');
const modules = require('./modules');

module.exports = (...configs) => {

    const { compose } = composer(modules, ...configs);
    const { strategies } = compose('strategies');
    const { io } = compose('io', {}, io => io.setup());
    const { services } = compose('services', { strategies, io });
    return compose('commands', { strategies, services });

};
