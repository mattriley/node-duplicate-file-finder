const { findDuplicates, moveDuplicates } = require('..');

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

    test.skip('moves duplicates', async () => {
        const basepaths = ['/Users/mattriley/Home/Docs/Matt/Photos/dupes'];
        const duplicates = await findDuplicates(basepaths);
        const destdir = '/Users/mattriley/Home/Docs/Matt/Photos/dupes2';
        await moveDuplicates({ basepaths, duplicates, destdir });
    });

};
