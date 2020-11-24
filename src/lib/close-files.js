module.exports = () => files => {

    files.forEach(f => f.handle.close());

};
