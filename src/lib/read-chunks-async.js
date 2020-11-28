module.exports = ({ lib }) => getInstruction => files => {

    return Promise.all(files.map(async f => {
        try {
            if (f.done) return f;
            f = await lib.openFileAsync(f);
            const { length, position, isDone } = getInstruction(f);
            const readResult = await f.handle.read(f.buffer, 0, length, position);
            const done = isDone(readResult);
            if (done) await lib.closeFilesAsync([f]);
            return { ...f, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));
    
};
