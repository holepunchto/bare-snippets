await new Promise((resolve) => setTimeout(resolve, 1 * 1000))
console.log('After top-level await')

export async function foo () {
  await new Promise((resolve) => setTimeout(resolve, 2 * 1000))
  console.log('foo')
}
