module.exports = ({ strategies }) => ({ length, bufferSize }) => {
    
    const position = 0;
    return strategies.section({ position, length, bufferSize });

};
