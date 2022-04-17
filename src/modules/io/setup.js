const fs = require('fs');
const glob = require('fast-glob');

module.exports = () => () => {

    return { fs, glob };

};
