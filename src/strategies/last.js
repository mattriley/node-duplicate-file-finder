module.exports = ({ length, bufferSize }) => f => {
    
    let position = f.size - chunkSize;
    const chunkSize = Math.trunc(length / bufferSize);
    const nextRead = () => ({ position, length: chunkSize });
    const onRead = ({ bytesRead }) => { position += bytesRead; };
    const isDone = () => position >= f.size;
    const getBufferSize = () => bufferSize;
    return { getBufferSize, nextRead, onRead, isDone };

};
