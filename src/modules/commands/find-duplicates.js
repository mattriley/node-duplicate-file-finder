const defaults = { sourcePath: '.', searchPaths: [], objectMode: false, bufferSize: 8192 };

module.exports = ({ strategies, services }) => async args => {

    const { sourcePath, searchPaths, objectMode, bufferSize } = { ...defaults, ...args };
    const basepaths = [sourcePath, ...searchPaths];
    const files = await services.getFiles(basepaths);
    const filterPredicate = files => files.length > 1 && files.some(f => f.basepath === sourcePath);
    const groupedBySize = services.groupBySize(files, filterPredicate);
    const createDefaultStrategy = strategies.whole({ bufferSize });
    const createStrategy = args.createStrategy || createDefaultStrategy;
    const readChunksAsync = services.readChunksAsync(createStrategy);
    const groupedByContent = await services.findDuplicatesInGroupsAsync(groupedBySize, readChunksAsync, filterPredicate);
    return services.transformResult(groupedByContent, objectMode);

};
