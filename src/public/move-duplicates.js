module.exports = ({ public, lib }) => async ({ basepaths, destdir, predicate }) => {

    const duplicates = await public.findDuplicates(basepaths);
    return lib.moveDuplicatesAsync({ basepaths, duplicates, destdir, predicate });

};
