module.exports = () => files => {

    files.forEach(f => {
        // console.log(f);
        f.handle.close();
    });

};
