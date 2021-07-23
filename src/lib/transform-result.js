module.exports = () => (groups, objectMode) => {

    return groups.map(files => files.map(f => {
        return objectMode ? f : f.path;
    }));

};
