module.exports = ({ lib, config }) => files => {

    return Promise.all(files.map(async f => {
        try {
            f = await lib.openFileAsync(f);
            const { bytesRead } = await f.handle.read(f.buffer, 0, config.step, f.pos);
            const pos = f.pos + bytesRead;
            const done = bytesRead === 0;
            if (done) await lib.closeFilesAsync([f]);
            return { ...f, pos, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));
    
};
