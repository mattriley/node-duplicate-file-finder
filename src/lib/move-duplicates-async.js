const path = require('path');

const defaults = {
    predicate: files => files.slice(1)
};

module.exports = ({ fs, mkdirp }) => args => {

    const { basepaths, duplicates, destdir, predicate } = { ...defaults, ...args };
    const filesToMove = duplicates.flatMap(predicate);

    return Promise.all(filesToMove.map(async f => {
        const basepath = basepaths[f.basepathIndex];
        const source = path.join(basepath, f.relpath);
        const dest = path.join(destdir, basepath, f.relpath);
        await mkdirp(path.dirname(dest));
        return fs.promises.rename(source, dest); 
    }));

};