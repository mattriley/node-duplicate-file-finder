const defaults = { sourcePath: '.', searchPaths: [] };

module.exports = ({ lib, globby }) => async args => {

    const { sourcePath, searchPaths } = { ...defaults, ...args };
    const basepaths = [sourcePath, ...searchPaths];

    const files = await basepaths.reduce(async (p, basepath) => {
        const acc = await p;
        const files = await globby(`${basepath}/**`, { stats: true });
        return acc.concat(files);
    }, []);

    files.sort((a, b) => a.stats.size - b.stats.size);
    const filterPredicate = files => files.length > 1 && files.some(f => f.path.startsWith(sourcePath));
    const groupedBySize = lib.groupBySize(files, filterPredicate);
    const groupedByContent = await lib.findDuplicatesInGroupsAsync(groupedBySize, filterPredicate);
    return lib.pathOnly(groupedByContent);

};
