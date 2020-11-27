module.exports = ({ globby }) => async basepaths => {

    const groupedByBasepath = await Promise.all(basepaths.map(async base => {
        const files = await globby('**', { cwd: base, stats: true });
        return files.map(f => ({ ...f, base }));
    }));

    return groupedByBasepath.flat().sort((a, b) => a.stats.size - b.stats.size);

};
