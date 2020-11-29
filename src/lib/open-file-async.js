module.exports = ({ fs }) => async (f, createStrategy) => {

    if (f.handle) return f;
    const strategy = createStrategy(f);
    const buffer = Buffer.alloc(strategy.getBufferSize());
    const handle = await fs.promises.open(f.path, 'r');
    return { ...f, strategy, buffer, handle };

};
