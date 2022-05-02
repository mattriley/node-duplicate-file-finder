module.exports = ({ services }) => async (groups, readChunksAsync, filterPredicate) => {

    const stack = [...groups];
    const results = [];

    const partition = groups => {
        return groups.reduce((acc, files) => {
            const i = filterPredicate(files) ? 0 : 1;
            acc[i].push(files);
            return acc;
        }, [[], []]);
    };

    while (stack.length) {
        const files = await readChunksAsync(stack.pop());
        const groups = await services.groupByBuffer(files);
        const [keep, drop] = partition(groups);
        await Promise.all(drop.map(services.closeFilesAsync));
        keep.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : stack;
            dest.push(files);
        });
    }

    return results;

};

