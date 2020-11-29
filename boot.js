const { strategies, ...src } = require('./src');
const fs = require('fs');
const mkdirp = require('mkdirp');
const globby = require('globby');
const composer = require('module-composer');

module.exports = (overrides = {}) => {

    const compose = composer(src, { overrides });
    const config = compose('config');
    const lib = compose('lib', { strategies, config, fs, globby, mkdirp });
    compose('commands', { strategies, lib });
    return compose.getModules();

};
