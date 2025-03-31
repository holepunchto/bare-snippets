# Built for Mobile

Embedding Bare as a separate thread in a mobile application is easy with Bare Kit. Using Bare Kit and React Native, you can run the same JavaScript as on desktop.

## Running

1. Install all the dependencies:
   ```console
   npm install
   ```
2. Run your app using on iOS:
   ```console
   npm run ios
   ```

   or on Android:

   ```console
   npm run android
   ```
4. [Open the DevTools](https://reactnative.dev/docs/debugging#opening-devtools) to see the console.  
   Press `j` from the CLI.

## Snippet

```js
import { Worklet } from 'react-native-bare-kit'

// ...

const worklet = new Worklet()

worklet.start('/app.js', `
  const { IPC } = BareKit
  IPC.setEncoding('utf8')
  IPC.on('data', (data) => console.log(data))
  IPC.write('Hello from Bare!')
`)

const { IPC } = worklet
IPC.setEncoding('utf8')
IPC.on('data', (data: string) => console.log(data))
IPC.write('Hello from React Native!')
```
