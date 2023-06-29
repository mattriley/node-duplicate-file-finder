module.exports = ({ test, assert }) => ({ findDuplicates }) => {

    test('finds duplicates', async () => {
        const sourcePath = 'test-files/source-path';
        const searchPaths = ['test-files/search-path-1', 'test-files/search-path-2'];
        const duplicates = await findDuplicates({ sourcePath, searchPaths });
        assert.deepEqual(duplicates, [
            [
                'test-files/source-path/A-1-201KB.JPG',
                'test-files/source-path/A-2-201KB.JPG',
                'test-files/source-path/A/A-3-201KB.JPG',
                'test-files/search-path-1/A-4-201KB.JPG',
                'test-files/search-path-2/A-5-201KB.JPG'
            ],
            [
                'test-files/source-path/B-1-38KB.JPG',
                'test-files/source-path/B/B-2-38KB.JPG'
            ]
        ]);
    });

};
