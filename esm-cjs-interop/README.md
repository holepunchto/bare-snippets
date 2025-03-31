# ESM & CommonJS Interop Support

Bare uses the same module resolution between CommonJS and ESM modules allowing an ESM module to be `require()`'d.

## Snippet

### `index.js`

```js
const { foo } = require('./esm')
foo().then(() => console.log('done'))
```

### `esm.mjs`

```js
await new Promise((resolve) => setTimeout(resolve, 1 * 1000))
console.log('After top-level await')

export async function foo () {
  await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
  console.log('foo')
}
```

## Running & Explanation

### Bare

```
bare index.js
```

Will output:

```
After top-level await
foo
done
```

### Node

```
node index.js
```

Should error like so:

```
node:internal/modules/cjs/loader:1252
  throw err;
  ^

Error: Cannot find module './esm'
Require stack:
- ./bare-snippets/esm-cjs-interop/index.js
    at Function._resolveFilename (node:internal/modules/cjs/loader:1249:15)
    at Function._load (node:internal/modules/cjs/loader:1075:27)
    at TracingChannel.traceSync (node:diagnostics_channel:315:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:218:24)
    at Module.require (node:internal/modules/cjs/loader:1340:12)
    at require (node:internal/modules/helpers:141:16)
    at Object.<anonymous> (./bare-snippets/esm-cjs-interop/index.js:1:17)
    at Module._compile (node:internal/modules/cjs/loader:1546:14)
    at Object..js (node:internal/modules/cjs/loader:1689:10)
    at Module.load (node:internal/modules/cjs/loader:1318:32) {
  code: 'MODULE_NOT_FOUND',
  requireStack: [
    './bare-snippets/esm-cjs-interop/index.js'
  ]
}
```

Nodejs cannot resolve `./esm` identifier because it doesn't automatically add the `.mjs` to identifiers like it does for `.js`. Even if the `./esm` is changed to `./esm.mjs`, it outputs the following error:

```
node:internal/modules/esm/module_job:392
      throw new ERR_REQUIRE_ASYNC_MODULE();
      ^

Error [ERR_REQUIRE_ASYNC_MODULE]: require() cannot be used on an ESM graph with top-level await. Use import() instead. To see where the top-level await comes from, use --experimental-print-required-tla.
    at ModuleJobSync.runSync (node:internal/modules/esm/module_job:392:13)
    at ModuleLoader.importSyncForRequire (node:internal/modules/esm/loader:329:47)
    at Object.loadESMFromCJS [as .mjs] (node:internal/modules/cjs/loader:1411:24)
    at Module.load (node:internal/modules/cjs/loader:1313:32)
    at Function._load (node:internal/modules/cjs/loader:1123:12)
    at TracingChannel.traceSync (node:diagnostics_channel:322:14)
    at wrapModuleLoad (node:internal/modules/cjs/loader:217:24)
    at Module.require (node:internal/modules/cjs/loader:1335:12)
    at require (node:internal/modules/helpers:136:16)
    at Object.<anonymous> (./bare-snippets/esm-cjs-interop/index.js:1:17) {
  code: 'ERR_REQUIRE_ASYNC_MODULE'
}
```

This is because it doesn't allow `require()`'ing an ESM module with top-level awaits. Having a top-level await in a module requires the module to be evaluated asynchronously, but `require()` is synchronous. Bare runs this async module for you synchronously. This is why the first line output by Bare is `After top-level await`.

See [`bare-module-resolve`'s "Algorithm" section](https://github.com/holepunchto/bare-module-resolve?tab=readme-ov-file#algorithm) for more details.
