module.exports = ({ strategies }) => ({ bufferSize }) => f => {
    
    const position = 0;
    const length = f.size;
    return strategies.section({ position, length, bufferSize })(f);

};
