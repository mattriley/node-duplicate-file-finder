const path = require('path');

module.exports = ({ lib, globby }) => async basepaths => {

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
    const groups = lib.groupBySize(files).filter(files => files.length > 1);
    const duplicates = await lib.findDuplicatesInGroupsAsync(groups);

    return duplicates.map(files => {
        return files.map(f => {
            const { basepathIndex, relpath } = f;
            return { basepathIndex, relpath };
        });
    });

};
