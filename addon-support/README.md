# Simple Addon Support

Showcase how simple it is to write an addon in bare that supports many engines.

## Setup

1. Install `bare-make` a tool for compiling native bindings.
   ```
   npm i -g bare-make
   ```
2. Generate the build system for compiling the bindings:
   ```console
   bare-make generate
   ```
3. Compile the native addon as a shared library:
   ```console
   bare-make build
   ```
4. Install the shared library in `prebuilds/` where the Bare addon resolution
   algorithm expects to find it:
   ```console
   bare-make install
   ```
5. Run `index.js` to see the native output:
   ```console
   bare index.js
   ```
   You should see the output:
   ```
   Hello addon
   ```

## Links
