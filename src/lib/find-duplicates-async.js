const path = require('path');

const defaults = { sourcePath: '.', searchPaths: [] };

module.exports = ({ lib, globby }) => async args => {

    const { sourcePath, searchPaths } = { ...defaults, ...args };

    const basepaths = [sourcePath, ...searchPaths];

    const files = await basepaths.reduce(async (p, basepath, i) => {
        const acc = await p;
        const files = await globby('**', { cwd: basepath, stats: true, absolute: true });
        files.forEach(f => {
            const basepathIndex = i;
            const relpath = f.path.replace(path.resolve(basepath), '');
            acc.push(Object.assign(f, { basepathIndex, basepath, relpath }));
        });
        return acc;
    }, []);

    files.sort((a, b) => a.stats.size - b.stats.size);
    const groups = lib.groupBySize(files).filter(files => {
        return files.length > 1 && files.some(f => f.basepathIndex === 0);
    });


    const duplicates = await lib.findDuplicatesInGroupsAsync(groups);

    return duplicates
        .filter(files => files.some(f => f.basepathIndex === 0))
        .map(files => {
            return files.map(f => {
                const { basepathIndex, relpath } = f;
                return { basepathIndex, relpath };
            });
        });

};
