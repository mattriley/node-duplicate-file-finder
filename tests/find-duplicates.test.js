const { findDuplicates } = require('..');

module.exports = ({ test }) => {
    
    test('finds duplicates', async t => {
        const sourcePath = 'test-files/source-path';
        const searchPaths = ['test-files/search-path-1', 'test-files/search-path-2'];
        const duplicates = await findDuplicates({ sourcePath, searchPaths });
        t.equal(duplicates, [
            [
                { basepathIndex: 0, relpath: '/A-2-201KB.JPG' },
                { basepathIndex: 0, relpath: '/A-1-201KB.JPG' },
                { basepathIndex: 0, relpath: '/A/A-3-201KB.JPG' },
                { basepathIndex: 1, relpath: '/A-3-201KB.JPG' },
                { basepathIndex: 2, relpath: '/A-3-201KB.JPG' }
            ],
            [
                { basepathIndex: 0, relpath: '/B/B-2-38KB.JPG' },
                { basepathIndex: 0, relpath: '/B-1-38KB.JPG' }
            ]
        ]);
    });

};
