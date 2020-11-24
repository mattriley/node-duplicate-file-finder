const { findDuplicates } = require('..');

module.exports = ({ test }) => {
    
    test('finds duplicates', async t => {
        const basepaths = ['test-files'];
        const duplicates = await findDuplicates(basepaths);
        t.equal(duplicates, [
            [
                { basepathIndex: 0, relpath: '/A-2-201KB.JPG' },
                { basepathIndex: 0, relpath: '/A-1-201KB.JPG' },
                { basepathIndex: 0, relpath: '/A/A-3-201KB.JPG' }
            ],
            [
                { basepathIndex: 0, relpath: '/B/B-2-38KB.JPG' },
                { basepathIndex: 0, relpath: '/B-1-38KB.JPG' }
            ]
        ]);
    });

};
