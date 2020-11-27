const { join } = require('path');

module.exports = ({ globby }) => async basepaths => {

    const groupedByBasepath = await Promise.all(basepaths.map(async basepath => {
        const files = await globby('**', { cwd: basepath, stats: true });
        return files.map(f => {
            const relpath = f.path;
            const path = join(basepath, relpath);
            return { ...f, basepath, relpath, path };
        });
    }));

    return groupedByBasepath.flat().sort((a, b) => a.stats.size - b.stats.size);

};
