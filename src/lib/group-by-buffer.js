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
        if (res === 0) addFiles([a, b]);
        return res;
    });

    const duplicatePaths = Object.assign({}, ...groups);

    const notDuplicates = files.filter(f => !duplicatePaths[f.path]);

    notDuplicates.forEach(f => {
        groups.push({ [f.path]: f });
    });
    
    return groups.map(files => Object.values(files));
    
};
