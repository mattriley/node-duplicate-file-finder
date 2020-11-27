module.exports = () => (groups, objectMode) => {

    return groups.map(files => files.map(f => {
        const { name, basepath, relpath, path, stats } = f;
        return objectMode ? { name, basepath, relpath, path, stats } : path;
    }));

};
