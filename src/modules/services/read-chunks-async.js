module.exports = ({ services }) => createStrategy => files => {

    return Promise.all(files.map(async f => {
        try {
            f = await services.openFileAsync(f, createStrategy);
            const { length, position } = f.strategy.nextRead(f);
            const readResult = await f.handle.read(f.buffer, 0, length, position);
            f.strategy.onRead(readResult);
            const done = f.strategy.isDone();
            if (done) await services.closeFilesAsync([f]);
            return { ...f, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));

};
