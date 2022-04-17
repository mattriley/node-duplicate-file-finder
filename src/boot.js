const modules = require('./modules');
const fs = require('fs');
const glob = require('fast-glob');
const composer = require('module-composer');

module.exports = (overrides = {}) => {

    const compose = composer(modules, { overrides });

    const strategies = compose('strategies');
    const lib = compose('lib', { strategies, fs, glob });
    compose('commands', { strategies, lib });

    return compose.modules;

};
