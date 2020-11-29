module.exports = ({ chunkSize }) => {
    
    const next = () => ({ position: null, length: chunkSize });
    const isDone = ({ bytesRead }) => bytesRead === 0; 
    const getBufferSize = () => chunkSize;
    return { getBufferSize, next, isDone };

};
