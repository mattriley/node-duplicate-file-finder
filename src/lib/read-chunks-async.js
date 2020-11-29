module.exports = ({ lib }) => strategy => files => {

    return Promise.all(files.map(async f => {
        try {
            if (f.done) return f;
            const bufferSize = strategy.getBufferSize(f);
            f = await lib.openFileAsync(f, bufferSize);
            const { length, position } = strategy.next(f);
            const readResult = await f.handle.read(f.buffer, 0, length, position);
            const done = strategy.isDone(readResult, f);
            if (done) await lib.closeFilesAsync([f]);
            return { ...f, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));
    
};
