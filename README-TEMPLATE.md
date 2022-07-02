# Duplicate File Finder

<%- lib.renderMetrics() %>

Finds duplicate files across given directories without hashing.

## Table of Contents

<!-- START doctoc generated TOC please keep comment here to allow auto update -->
<!-- END doctoc generated TOC please keep comment here to allow auto update -->

## Install

```
npm install duplicate-file-finder
```

## Usage

```js
const { findDuplicates } = require('duplicate-file-finder');
const sourcePath = 'photos'; // defaults to current directory.
const searchPaths = ['more-photos', 'even-more-photos']; // defaults to empty.
const duplicates = findDuplicates({ sourcePath, searchPaths }).then(duplicates => {
    // do something with duplicates.
});
```

`duplicates` is a data structure like:

```js
[
    [
        'photos/family.jpg',
        'more-photos/copy-of-family.jpg',
        'even-more-photos/another-copy-of-family.jpg'
    ],
    [
        'photos/pets.jpg',
        'more-photos/copy-of-pets.jpg'
    ]
]
```

## Architecture

<%- await lib.compose(c => lib.renderCode(c.mermaid(), 'mermaid')) %>
