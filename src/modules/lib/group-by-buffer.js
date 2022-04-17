module.exports = () => files => {

    const flatmap = new Map();
    const maps = [];

    const newMap = () => {
        const map = new Map();
        maps.push(map);
        return map;
    };

    const push = (...files) => {
        const findMap = () => maps.find(map => files.some(f => map.has(f.path)));
        const map = files.length > 1 ? findMap() || newMap() : newMap();
        files.forEach(f => [map, flatmap].forEach(map => map.set(f.path, f)));
    };

    for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
            const a = files[i];
            const b = files[j];
            if (Buffer.compare(a.buffer, b.buffer) === 0) push(a, b);
        }
    }

    files.forEach(f => !flatmap.has(f.path) && push(f));

    return maps.map(map => [...map.values()]);
    
};
