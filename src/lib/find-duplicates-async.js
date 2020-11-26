const defaults = { sourcePath: '.', searchPaths: [], objectMode: false };

module.exports = ({ lib, globby }) => async args => {

    const { sourcePath, searchPaths, objectMode } = { ...defaults, ...args };
    const basepaths = [sourcePath, ...searchPaths];

    const groupedByBasepath = await Promise.all(basepaths.map(async base => {
        const files = await globby('**', { cwd: base, stats: true });
        return files.map(f => ({ ...f, base }));
    }));

    const files = groupedByBasepath.flat().sort((a, b) => a.stats.size - b.stats.size);
    const filterPredicate = files => files.length > 1 && files.some(f => f.base === sourcePath);
    const groupedBySize = lib.groupBySize(files, filterPredicate);
    const groupedByContent = await lib.findDuplicatesInGroupsAsync(groupedBySize, filterPredicate);
    return lib.transformResult(groupedByContent, objectMode);

};
