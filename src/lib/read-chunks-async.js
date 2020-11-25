module.exports = ({ lib, config }) => files => {

    return Promise.all(files.map(async f => {
        f = await lib.openFileAsync(f);
        const { bytesRead } = await f.handle.read(f.buffer, 0, config.step, null);
        const done = bytesRead === 0;
        if (done) await lib.closeFilesAsync([f]);
        return { ...f, done };
    }));
    
};
