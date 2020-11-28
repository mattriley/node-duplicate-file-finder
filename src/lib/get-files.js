const { join } = require('path');

module.exports = ({ globby }) => async basepaths => {

    const groupedByBasepath = await Promise.all(basepaths.map(async basepath => {
        const files = await globby('**', { cwd: basepath, stats: true });
        return files.map(f => {
            const relpath = f.path;
            const path = join(basepath, relpath);
            const { size } = f.stats;
            return { ...f, basepath, relpath, path, size };
        });
    }));

    return groupedByBasepath.flat().sort((a, b) => a.stats.size - b.stats.size);

};
