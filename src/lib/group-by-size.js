module.exports = () => files => {

    return Object.values(files.reduce((acc, f) => {
        const { size } = f.stats;
        const arr = acc[size] || [];
        acc[size] = arr;
        arr.push(f);
        return acc;
    }, {})); 

};
