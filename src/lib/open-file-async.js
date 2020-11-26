const path = require('path');

module.exports = ({ fs, config }) => async f => {

    if (f.handle) return f;
    const handle = await fs.promises.open(path.join(f.base, f.path), 'r');
    const buffer = Buffer.alloc(config.bufferSize);
    return { ...f, handle, buffer, pos: 0 };

};
