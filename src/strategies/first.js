module.exports = ({ chunkSize }) => () => {
    
    const next = () => ({ position: 0, length: chunkSize });
    const isDone = () => true; 
    const getBufferSize = () => chunkSize;
    return { getBufferSize, next, isDone };

};
