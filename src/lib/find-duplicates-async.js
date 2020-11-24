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

    const filterGroups = groups => {
        return groups.filter(files => {
            return files.length > 1 && files.some(f => f.path.startsWith(sourcePath));
        });
    };

    const groupedBySize = filterGroups(lib.groupBySize(files));
    const groupedByContent = await lib.findDuplicatesInGroupsAsync(groupedBySize);
    return filterGroups(groupedByContent).map(files => files.map(f => f.path));

};
