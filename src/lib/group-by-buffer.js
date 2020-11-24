module.exports = () => files => {

    const groups = [];

    [...files].sort((a, b) => {
        const res = Buffer.compare(a.buffer, b.buffer);
        if (res === 0) {
            const entries = [[a.path, a], [b.path, b]];
            const files = groups.find(files => entries.some(([path]) => files[path]));
            const newFiles = Object.fromEntries(entries);
            files ? Object.assign(files, newFiles) : groups.push(newFiles);
        } else {
            groups.push({ [a.path]: a });
        }
        return res;
    });

    return groups.map(files => Object.values(files));
    
};
