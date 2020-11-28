module.exports = ({ config }) => f => {

    const { position, size } = f;
    const { length } = config;
    const done = position + length >= size;
    return { position, length, done };

};
