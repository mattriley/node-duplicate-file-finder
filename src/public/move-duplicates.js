module.exports = ({ public, lib }) => async (basepaths, destdir) => {

    const groups = await public.findDuplicates(basepaths);
    return lib.moveDuplicatesAsync(groups, basepaths, destdir);

};
