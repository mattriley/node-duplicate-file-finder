module.exports = ({ fs }) => async (f, getStrategy) => {

    if (f.handle) return f;
    const strategy = getStrategy(f);
    const buffer = Buffer.alloc(strategy.getBufferSize());
    const handle = await fs.promises.open(f.path, 'r');
    return { ...f, strategy, buffer, handle };

};
