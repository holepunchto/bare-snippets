const fs = require('bare-fs') // Uses current version w/ `copyFile`
const legacy = require('./legacy')

console.log('[index.js] fs.copyFile', fs.copyFile) // defined
legacy()
