import { validate } from '.'

describe('validate', () => {
  test('basic example', async () => {
    const result = await validate({
      children: [69]
    })

    expect(result).toEqual(['Ainsley.children[0] is invalid'])
  })

  test('basic example', async () => {
    const result = await validate({
      children: [69, 420]
    })

    expect(result).toEqual([
      'Ainsley.children[0] is invalid',
      'Ainsley.children[1] is invalid'
    ])
  })
})
