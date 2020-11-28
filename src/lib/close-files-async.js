module.exports = () => files => {

    return Promise.all(files.map(async f => {
        if (f.closed) return;
        await f.handle.close();
        Object.assign(f, { closed: true });
    }));

};
