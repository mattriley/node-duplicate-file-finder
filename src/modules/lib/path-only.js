module.exports = () => groups => {
    
    return groups.map(files => files.map(f => f.path));

};
