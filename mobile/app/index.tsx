import { useEffect } from 'react'
import { Text } from 'react-native'
import { Worklet } from 'react-native-bare-kit'

export default function () {
  useEffect(() => {
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
  }, [])

  return <Text>Look in React Native Logs for response.</Text>
}
