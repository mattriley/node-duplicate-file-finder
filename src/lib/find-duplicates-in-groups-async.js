module.exports = ({ lib }) => async (groups, filterPredicate) => {

    const queue = [...groups];
    const results = [];

    while (queue.length) {
        const files = await lib.readChunksAsync(queue.pop());
        const groups = lib.groupByBuffer(files).filter(filterPredicate);
        groups.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : queue;
            dest.push(files);
        });
    }

    return results;

};

