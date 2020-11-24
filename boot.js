const src = require('./src');
const fs = require('fs');
const mkdirp = require('mkdirp');
const globby = require('globby');
const composer = require('module-composer');

module.exports = (overrides = {}) => {

    const compose = composer(src, { overrides });
    const config = compose('config');
    const lib = compose('lib', { config, fs, globby, mkdirp });
    compose('public', { lib });
    return compose.getModules();

};
