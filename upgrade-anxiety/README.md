# Forget Upgrade Anxiety
 
Because Bare has no standard library beyond the core JavaScript API, codebases can be easily upgrade so that different versions of builtins can be used for different dependencies.

## Snippet

### `index.js`

```js
const fs = require('bare-fs') // Uses current version w/ `copyFile`
const legacy = require('./legacy')

console.log('[index.js] fs.copyFile', fs.copyFile) // defined
legacy()
```

### `legacy/index.js`

```js
const fs = require('bare-fs') // Uses 3.0.2 w/o `copyFile`

module.exports = function test () {
  console.log('[legacy/index.js] fs.copyFile', fs.copyFile) // undefined
}
```

### `legacy/package.json`

```js
{
  "main": "index.js",
  "dependencies": { "bare-fs": "3.0.2" }
}

```

## Run / Usage

1. Install the `legacy` dependencies:
   ```console
   # Install dependencies in legacy package
   cd legacy
   npm i
   cd - # Jump back to root of snippet
   ```
2. Run `index.js` which calls the `legacy` module:
   ```console
   bare index.js
   ```

   This will output the following:
   ```
   [index.js]        fs.copyFile [function copyFile]
   [legacy/index.js] fs.copyFile undefined
   done
   ```

To see a list of all the external modules built for Bare specifically, check out the [Bare README](https://github.com/holepunchto/bare?tab=readme-ov-file#modules).
