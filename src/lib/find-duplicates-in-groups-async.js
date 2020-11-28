module.exports = ({ lib }) => async (groups, filterPredicate, getInstruction) => {

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
        const files = await lib.readChunksAsync(queue.pop(), getInstruction);
        const groups = await lib.groupByBuffer(files);
        const [keep, drop] = partition(groups);
        await Promise.all(drop.map(lib.closeFilesAsync));
        keep.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : queue;
            dest.push(files);
        });
    }

    return results;

};

