module.exports = () => files => {

    const groups = [];

    const addFiles = files1 => {
        const entries = files1.map(f => [f.path, f]);
        const files = groups.find(files => entries.some(([path]) => files[path]));
        const newFiles = Object.fromEntries(entries);
        files ? Object.assign(files, newFiles) : groups.push(newFiles);
    };

    [...files].sort((a, b) => {
        const res = Buffer.compare(a.buffer, b.buffer);
        const files = res === 0 ? [a, b] : [a];
        addFiles(files);
        return res;
    });

    return groups.map(files => Object.values(files));
    
};
