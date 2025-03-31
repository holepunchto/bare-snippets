const fs = require('bare-fs') // Uses 3.0.2 w/o `copyFile`

module.exports = function test () {
  console.log('[legacy/index.js] fs.copyFile', fs.copyFile) // undefined
}
