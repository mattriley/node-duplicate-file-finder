module.exports = () => files => {

    const maps = [];

    const addMap = () => {
        const map = new Map();
        maps.push(map);
        return map;
    };

    [...files].sort((a, b) => {
        const res = Buffer.compare(a.buffer, b.buffer);
        if (res === 0) {
            const map = maps.find(map => map.has(b.path)) || addMap();
            map.set(a.path, a).set(b.path, b);
        }
        return res;
    }); 

    files.forEach(f => {
        const exists = maps.some(map => map.has(f.path));
        if (!exists) addMap().set(f.path, f);
    });

    return maps.map(map => [...map.values()]);
    
};
