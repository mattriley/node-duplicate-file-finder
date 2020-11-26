module.exports = () => (groups, objectMode) => {

    return groups.map(files => files.map(f => {
        const { path, stats } = f;
        return objectMode ? { path, stats } : path;
    }));

};
