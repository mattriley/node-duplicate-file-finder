module.exports = ({ lib }) => paths => {

    return lib.findDuplicatesAsync([paths].flat());

};
