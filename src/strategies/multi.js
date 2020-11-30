module.exports = () => ({ strategies }) => f => {
    
    const remaining = [...strategies].map(s => s(f));
    let strategy = remaining.pop();

    const nextRead = () => strategy.nextRead();
    const onRead = res => strategy.onRead(res);

    const isDone = () => {
        const done = strategy.isDone();
        if (done) strategy = remaining.pop();
        return Boolean(strategy);
    };

    const getBufferSize = () => strategy.getBufferSize();
    return { getBufferSize, nextRead, onRead, isDone };

};
