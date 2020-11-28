module.exports = ({ config }) => () => {

    return { 
        position: null, 
        length: config.length,
        isDone: ({ bytesRead }) => bytesRead === 0 
    };

};
