const defaults = { sourcePath: '.', searchPaths: [], objectMode: false };

module.exports = ({ lib }) => async args => {

    const { sourcePath, searchPaths, objectMode } = { ...defaults, ...args };
    const basepaths = [sourcePath, ...searchPaths];
    const files = await lib.getFiles(basepaths);
    const filterPredicate = files => files.length > 1 && files.some(f => f.basepath === sourcePath);
    const groupedBySize = lib.groupBySize(files, filterPredicate);
    const readChunksAsync = lib.readChunksAsync(args.getInstruction || lib.sequentialReadInstruction);
    const groupedByContent = await lib.findDuplicatesInGroupsAsync(groupedBySize, readChunksAsync, filterPredicate);
    return lib.transformResult(groupedByContent, objectMode);

};
