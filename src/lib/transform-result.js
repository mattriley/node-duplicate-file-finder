const { join } = require('path');

module.exports = () => (groups, objectMode) => {

    return groups.map(files => files.map(f => {
        const { name, base, path, stats } = f;
        return objectMode ? { name, base, path, stats } : join(base, path);
    }));

};
