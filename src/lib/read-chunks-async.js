module.exports = ({ lib, config }) => files => {

    return Promise.all(files.map(async f => {
        f = await lib.openFileAsync(f);
        const res = await f.handle.read(f.buffer, 0, config.step, f.pos);
        const pos = f.pos + res.bytesRead;
        const done = pos === f.stats.size;
        if (done) await f.handle.close();
        return { ...f, pos, done };
    }));
    
};
