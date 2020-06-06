import { doSync } from './doSync'

const asyncFunc = (n: number): Promise<number> =>
  new Promise((resolve) => {
    setTimeout(() => {
      resolve(n * n)
    }, 1000)
  })

describe('doSync', () => {
  test('by ref', () => {
    const doAsync = doSync(asyncFunc)
    expect(doAsync(3)).toEqual(9)
  })

  test('direct', () => {
    const doAsync = doSync(
      (n: number): Promise<string> =>
        new Promise((resolve) => {
          setTimeout(() => {
            resolve(`${n}${n}${n}`)
          }, 1000)
        })
    )
    expect(doAsync(3)).toEqual('333')
  })

  test('error', () => {
    const doAsync = doSync(
      (): Promise<string> => {
        console.log('{}')
        return Promise.reject('Intentional test error')
      }
    )
    expect(doAsync()).toEqual({})
  })
})
