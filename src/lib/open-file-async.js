module.exports = ({ fs, config }) => async f => {

    if (f.handle) return f;
    const handle = await fs.promises.open(f.path, 'r');
    const buffer = Buffer.alloc(config.bufferSize);
    return { ...f, handle, buffer, position: 0 };

};
