module.exports = () => files => {

    const flatmap = new Map();
    const maps = [];

    const addMap = () => {
        const map = new Map();
        maps.push(map);
        return map;
    };

    const addToMap = (a, b) => {
        const map = maps.find(map => map.has(a.path) || map.has(b.path)) || addMap();
        map.set(a.path, a).set(b.path, b);
        flatmap.set(a.path, a).set(b.path, b);
    };

    for (let i = 0; i < files.length; i++) {
        for (let j = i + 1; j < files.length; j++) {
            const a = files[i];
            const b = files[j];
            const same = Buffer.compare(a.buffer, b.buffer) === 0;
            if (same) addToMap(a, b);
        }
    }

    files.forEach(f => {
        if (!flatmap.has(f.path)) addMap().set(f.path, f);
    });

    return maps.map(map => [...map.values()]);
    
};
