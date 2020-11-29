module.exports = ({ lib }) => getStrategy => files => {

    return Promise.all(files.map(async f => {
        try {
            if (f.done) return f;
            if (!f.strategy) f.strategy = getStrategy(f);
            const bufferSize = f.strategy.getBufferSize(f);
            f = await lib.openFileAsync(f, bufferSize);
            const { length, position } = f.strategy.next(f);
            const readResult = await f.handle.read(f.buffer, 0, length, position);
            const done = f.strategy.isDone(readResult, f);
            if (done) await lib.closeFilesAsync([f]);
            return { ...f, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));
    
};
