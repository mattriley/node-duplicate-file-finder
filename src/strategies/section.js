module.exports = () => ({ position: initialPosition, length, bufferSize }) => () => {
    
    let position = initialPosition;
    const chunkSize = bufferSize;
    const nextRead = () => ({ position, length: chunkSize });
    const onRead = ({ bytesRead }) => { position += bytesRead; };
    const isDone = () => position - initialPosition >= length;
    const getBufferSize = () => bufferSize;
    return { getBufferSize, nextRead, onRead, isDone };

};
