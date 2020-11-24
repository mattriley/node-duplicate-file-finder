module.exports = ({ lib }) => async groups => {

    const queue = [...groups];
    const results = [];

    while (queue.length) {
        const files = await lib.readChunksAsync(queue.pop());
        const groups = lib.groupByBuffer(files).filter(files => files.length > 1);
        groups.forEach(files => {
            const done = files.every(f => f.done);
            const dest = done ? results : queue;
            dest.push(files);
        });
    }

    return results;

};

