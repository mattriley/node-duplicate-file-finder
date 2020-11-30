module.exports = ({ chunkSize }) => () => {
    
    let done = false;
    const nextRead = () => ({ position: null, length: chunkSize });
    const onRead = ({ bytesRead }) => { done = bytesRead === 0; };
    const getBufferSize = () => chunkSize;
    const isDone = () => done;
    return { getBufferSize, nextRead, onRead, isDone };

};
