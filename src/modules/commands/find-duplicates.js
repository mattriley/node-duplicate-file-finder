const defaults = { sourcePath: '.', searchPaths: [], objectMode: false, bufferSize: 8192 };

module.exports = ({ strategies, effects, lib }) => async args => {

    const { sourcePath, searchPaths, objectMode, bufferSize } = { ...defaults, ...args };
    const basepaths = [sourcePath, ...searchPaths];
    const files = await effects.getFiles(basepaths);
    const filterPredicate = files => files.length > 1 && files.some(f => f.basepath === sourcePath);
    const groupedBySize = lib.groupBySize(files, filterPredicate);
    const createDefaultStrategy = strategies.whole({ bufferSize });
    const createStrategy = args.createStrategy || createDefaultStrategy;
    const readChunksAsync = effects.readChunksAsync(createStrategy);
    const groupedByContent = await effects.findDuplicatesInGroupsAsync(groupedBySize, readChunksAsync, filterPredicate);
    return lib.transformResult(groupedByContent, objectMode);

};
