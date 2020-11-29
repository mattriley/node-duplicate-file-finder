module.exports = ({ chunkSize }) => {
    
    const next = f => ({ position: f.size - chunkSize, length: chunkSize });
    const isDone = () => true; 
    const getBufferSize = () => chunkSize;
    return { getBufferSize, next, isDone };

};
