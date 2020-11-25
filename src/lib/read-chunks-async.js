module.exports = ({ lib, config }) => files => {

    return Promise.all(files.map(async f => {
        f = await lib.openFileAsync(f);
        const res = await f.handle.read(f.buffer, 0, config.step, null);
        const done = res.bytesRead === 0;
        if (done) lib.closeFiles([f]);
        return { ...f, done };
    }));
    
};
