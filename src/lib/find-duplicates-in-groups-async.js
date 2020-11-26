module.exports = ({ lib }) => async (groups, filterPredicate) => {

    const queue = [...groups];
    const results = [];

    const partition = groups => {
        return groups.reduce((acc, files) => {
            const i = filterPredicate(files) ? 0 : 1;
            acc[i].push(files);
            return acc;
        }, [[], []]);
    };
    

    while (queue.length) {
        const next = queue.pop();
        const files = await lib.readChunksAsync(next);
        const groupedByContent = await lib.groupByBuffer(files);
        const [keep, discard] = partition(groupedByContent);
        await Promise.all(discard.map(lib.closeFilesAsync));
        keep.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : queue;
            dest.push(files);
        });
    }

    return results;

};

