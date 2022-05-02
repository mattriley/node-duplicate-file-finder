module.exports = () => (groups, objectMode) => {

    return groups.map(files => files.map(f => {
        const { name, ext, basepath, relpath, reldirpath, path, stats } = f;
        return objectMode ? { name, ext, basepath, relpath, reldirpath, path, stats } : path;
    }));

};
