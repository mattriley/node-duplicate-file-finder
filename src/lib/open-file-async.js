module.exports = ({ fs }) => async (f, bufferSize) => {

    if (f.handle) return f;
    const handle = await fs.promises.open(f.path, 'r');
    const buffer = Buffer.alloc(bufferSize);
    return { ...f, handle, buffer };

};
