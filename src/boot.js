const modules = require('./modules');
const fs = require('fs');
const mkdirp = require('mkdirp');
const globby = require('globby');
const composer = require('module-composer');

module.exports = (overrides = {}) => {

    const compose = composer(modules, { overrides });

    const strategies = compose('strategies');
    const lib = compose('lib', { strategies, fs, globby, mkdirp });
    compose('commands', { strategies, lib });

    return compose.modules;

};
