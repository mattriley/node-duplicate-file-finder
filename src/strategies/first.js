module.exports = ({ length, bufferSize }) => () => {
    
    let position = 0;
    const chunkSize = Math.trunc(length / bufferSize);
    const nextRead = () => ({ position, length: chunkSize });
    const onRead = ({ bytesRead }) => { position += bytesRead; };
    const isDone = () => position >= length;
    const getBufferSize = () => bufferSize;
    return { getBufferSize, nextRead, onRead, isDone };

};
