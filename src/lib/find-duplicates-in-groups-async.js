module.exports = ({ lib }) => async (groups, filterPredicate) => {

    const queue = [...groups];
    const results = [];

    const partition = groups => {
        return groups.reduce((acc, files) => {
            const keep = Boolean(filterPredicate(files));
            const i = keep ? 0 : 1;
            acc[i].push(files);
            return acc;
        }, [[], []]);
    };
    

    while (queue.length) {
        const next = queue.pop();
        const files = await lib.readChunksAsync(next);
        const groupedByContent = await lib.groupByBuffer(files);
        const [keepGroups, dropGroups] = partition(groupedByContent);
        await Promise.all(dropGroups.map(lib.closeFilesAsync));
        keepGroups.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : queue;
            dest.push(files);
        });
    }

    return results;

};

