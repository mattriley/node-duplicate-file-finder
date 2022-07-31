module.exports = ({ effects }) => createStrategy => files => {

    return Promise.all(files.map(async f => {
        try {
            f = await effects.openFileAsync(f, createStrategy);
            const { length, position } = f.strategy.nextRead(f);
            const readResult = await f.handle.read(f.buffer, 0, length, position);
            f.strategy.onRead(readResult);
            const done = f.strategy.isDone();
            if (done) await effects.closeFilesAsync([f]);
            return { ...f, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));

};
