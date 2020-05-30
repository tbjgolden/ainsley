/**
 * @jest-environment jsdom
 */
import { embed } from '.'

describe('embed', () => {
  beforeEach(() => {
    document.head.innerHTML = '<title>Page</title>'
  })

  test('embeds css', () => {
    embed('#some{color:blue}')

    const firstStyleTag = document.head.querySelector('style')
    expect(document.head.querySelector('style')).not.toBe(null)

    const validFirstStyleTag = firstStyleTag as HTMLStyleElement
    expect(validFirstStyleTag.textContent).toEqual('#some{color:blue}')
    expect(validFirstStyleTag.matches("[type='text/css']")).toBe(true)
  })

  test('has id, when passed in', () => {
    embed('#some{color:blue}', 'id-ting')

    const firstStyleTag = document.head.querySelector('style')
    expect(document.head.querySelector('style')).not.toBe(null)

    const validFirstStyleTag = firstStyleTag as HTMLStyleElement
    expect(validFirstStyleTag.matches("[id='id-ting']")).toBe(true)
  })

  test('overwrites when same id passed in', () => {
    embed('#some{color:blue}', 'id-ting')

    const firstStyleTag = document.head.querySelector('style')
    expect(document.head.querySelector('style')).not.toBe(null)

    const validFirstStyleTag = firstStyleTag as HTMLStyleElement
    expect(validFirstStyleTag.matches("[id='id-ting']")).toBe(true)

    embed('#another{color:red}', 'id-ting')

    const styleTags = document.head.querySelectorAll('style')
    expect(styleTags).toHaveLength(1)
    expect(styleTags[0]).toEqual(validFirstStyleTag)
    expect(validFirstStyleTag.textContent).toBe('#another{color:red}')
    expect(validFirstStyleTag.matches("[id='id-ting']")).toBe(true)
  })
})
