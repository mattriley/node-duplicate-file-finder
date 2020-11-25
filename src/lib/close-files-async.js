module.exports = () => files => {

    return Promise.all(files.map(f => f.handle.close()));

};
