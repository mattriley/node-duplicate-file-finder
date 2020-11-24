const path = require('path');

module.exports = ({ fs, mkdirp }) => (groups, basepaths, destdir) => {

    const filesToMove = groups.flatMap(files => files.slice(1));

    return Promise.all(filesToMove.map(async f => {
        const basepath = basepaths[f.basepathIndex];
        const source = path.join(basepath, f.relpath);
        const dest = path.join(destdir, basepath, f.relpath);
        await mkdirp(path.dirname(dest));
        return fs.promises.rename(source, dest); 
    }));

};