module.exports = ({ lib, config }) => (files, getInstruction) => {

    const getInstructionDefault = f => {
        const { position, size } = f;
        const { length } = config;
        return { position, length, done: position + length >= size };
    };

    return Promise.all(files.map(async f => {
        try {
            if (f.done) return f;
            f = await lib.openFileAsync(f);
            getInstruction = getInstruction || getInstructionDefault;
            const instruction = getInstruction(f);
            const { bytesRead } = await f.handle.read(f.buffer, 0, instruction.length, instruction.position);
            const position = f.position + bytesRead;
            const { done } = instruction;
            if (done) await lib.closeFilesAsync([f]);
            return { ...f, position, done };
        } catch (err) {
            err.context = { f };
            throw err;
        }
    }));
    
};
