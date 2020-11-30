module.exports = ({ strategies }) => ({ length, bufferSize }) => f => {
    
    const position = f.size - length;
    return strategies.section({ position, length, bufferSize })(f);

};
