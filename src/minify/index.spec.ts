import { Ainsley } from '../types'
import { minify } from '.'

describe('minify', () => {
  test('invalid config', async () => {
    try {
      minify((null as unknown) as Ainsley)
      expect(1).toBe(2)
    } catch (err) {
      expect(err.message).toMatch(/^Invalid input Ainsley:/)
    }
  })

  test('example one', () => {
    const start: Ainsley = {
      children: [
        {
          variables: {
            colors: {
              b: 'black',
              w: 'white'
            }
          },
          children: [
            {
              variables: {
                '+colors': {
                  p: '#313375',
                  s: '#b4d455'
                }
              },
              children: [
                '*{box-sizing:border-box}',
                ['&', [['color', '{colors}']]],
                {
                  variables: {
                    '?colors': {
                      gray: '#333'
                    },
                    'unused': {
                      magic: 'val'
                    }
                  },
                  children: [
                    '*{outline-offset:0}',
                    ['b&', [['border-color', '{colors}']]]
                  ]
                }
              ]
            },
            '.h1{font-size:69px}'
          ]
        },
        'body{margin:0}'
      ]
    }

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: 'black',
          w: 'white',
          p: '#313375',
          s: '#b4d455'
        }
      },
      children: [
        '*{box-sizing:border-box}',
        ['&', [['color', '{colors}']]],
        '*{outline-offset:0}',
        ['b&', [['border-color', '{colors}']]],
        '.h1{font-size:69px}body{margin:0}'
      ]
    })
  })

  test('example two', () => {
    const start: Ainsley = {
      children: [
        {
          variables: {
            colors: {
              b: 'black',
              w: 'white'
            }
          },
          children: [
            {
              variables: {
                '+colors': {
                  p: '#313375',
                  s: '#b4d455'
                }
              },
              children: [
                '*{box-sizing:border-box}',
                ['&', [['color', '{colors}']]],
                {
                  variables: {
                    '?colors': {
                      gray: '#333'
                    },
                    'unused': {
                      magic: 'val'
                    }
                  },
                  children: [
                    '*{outline-offset:0}',
                    ['b&', [['border-color', '{colors}']]]
                  ]
                }
              ]
            },
            '.h1{font-size:69px}',
            ['bg&', [['background-color', '{colors}']]]
          ]
        },
        'body{margin:0}'
      ]
    }

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: 'black',
          w: 'white'
        }
      },
      children: [
        {
          variables: {
            '+colors': {
              p: '#313375',
              s: '#b4d455'
            }
          },
          children: [
            '*{box-sizing:border-box}',
            ['&', [['color', '{colors}']]],
            '*{outline-offset:0}',
            ['b&', [['border-color', '{colors}']]]
          ]
        },
        '.h1{font-size:69px}',
        ['bg&', [['background-color', '{colors}']]],
        'body{margin:0}'
      ]
    })
  })

  test('example three', () => {
    const start: Ainsley = {
      variables: {
        colors: {
          b: 'black'
        }
      },
      variations: [[['h-', ':hover']]],
      children: [
        {
          variations: [[['f-', ':focus']]],
          children: [
            {
              variables: {
                '+colors': { p: '#313375' }
              },
              children: [['&', [['color', '{colors}']]]]
            }
          ]
        },
        'body{margin:0}'
      ]
    }

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: 'black',
          p: '#313375'
        }
      },
      variations: [[['h-', ':hover']]],
      children: [
        {
          variations: [[['f-', ':focus']]],
          children: [['&', [['color', '{colors}']]]]
        },
        'body{margin:0}'
      ]
    })
  })

  test('example four', () => {
    const start: Ainsley = {
      variations: [
        [
          ['s', '@media(min-width:384px)'],
          ['m', '@media(min-width:768px)'],
          ['l', '@media(min-width:1024px)']
        ]
      ],
      variables: {
        colors: {
          b: 'black',
          w: 'white'
        }
      },
      children: [
        {
          variables: {
            '+colors': {
              lg: '#eee',
              g: '#888',
              dg: '#222'
            }
          },
          children: [['bgc', [['background-color', '{colors}']]]]
        }
      ]
    }

    expect(minify(start)).toEqual({
      variations: [
        [
          ['s', '@media(min-width:384px)'],
          ['m', '@media(min-width:768px)'],
          ['l', '@media(min-width:1024px)']
        ]
      ],
      variables: {
        colors: {
          b: 'black',
          w: 'white',
          lg: '#eee',
          g: '#888',
          dg: '#222'
        }
      },
      children: [['bgc', [['background-color', '{colors}']]]]
    })
  })

  test('example five', () => {
    const start: Ainsley = {
      variables: {
        colors: {
          b: 'black'
        }
      },
      children: [
        {
          children: [
            {
              variables: {
                '+colors': { p: '#313375' }
              },
              children: [['&', [['color', '{colors}']]], 'html{padding:0}']
            }
          ]
        },
        '',
        'body{margin:0}'
      ]
    }

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: 'black',
          p: '#313375'
        }
      },
      children: [
        ['&', [['color', '{colors}']]],
        'html{padding:0}body{margin:0}'
      ]
    })
  })

  test('example six', () => {
    const start: Ainsley = {
      variables: {
        colors: {
          b: 'black'
        }
      },
      children: [
        {
          children: [
            {
              variations: [],
              variables: {
                '+colors': { p: '#313375' }
              },
              children: []
            }
          ]
        },
        '',
        'body{margin:0}'
      ]
    }

    expect(minify(start)).toEqual({
      children: ['body{margin:0}']
    })
  })

  test('example seven', () => {
    const start: Ainsley = {
      children: [
        {
          children: [
            {
              children: [['c', [['color', '{colors}']]]],
              variables: {
                '?colors': {
                  B05: 'hsla(0,0%,0%,05%)',
                  B10: 'hsla(0,0%,0%,10%)',
                  B20: 'hsla(0,0%,0%,20%)',
                  B40: 'hsla(0,0%,0%,40%)',
                  B80: 'hsla(0,0%,0%,80%)',
                  W05: 'hsla(0,0%,100%,05%)',
                  W10: 'hsla(0,0%,100%,10%)',
                  W20: 'hsla(0,0%,100%,20%)',
                  W40: 'hsla(0,0%,100%,40%)',
                  W80: 'hsla(0,0%,100%,80%)'
                }
              }
            }
          ]
        }
      ],
      variables: {
        colors: {
          b: 'black',
          w: 'white',
          t: 'transparent',
          g90: 'hsl(0,0%,90%)',
          g80: 'hsl(0,0%,80%)',
          g70: 'hsl(0,0%,70%)',
          g60: 'hsl(0,0%,60%)',
          g50: 'hsl(0,0%,50%)',
          g40: 'hsl(0,0%,40%)',
          g30: 'hsl(0,0%,30%)',
          g20: 'hsl(0,0%,20%)',
          g10: 'hsl(0,0%,10%)',
          p: '#43A5FF',
          pl: '#F2F9FE',
          pd: '#2F4066'
        }
      }
    }

    expect(minify(start)).toEqual({
      children: [['c', [['color', '{colors}']]]],
      variables: {
        colors: {
          b: 'black',
          w: 'white',
          t: 'transparent',
          g90: 'hsl(0,0%,90%)',
          g80: 'hsl(0,0%,80%)',
          g70: 'hsl(0,0%,70%)',
          g60: 'hsl(0,0%,60%)',
          g50: 'hsl(0,0%,50%)',
          g40: 'hsl(0,0%,40%)',
          g30: 'hsl(0,0%,30%)',
          g20: 'hsl(0,0%,20%)',
          g10: 'hsl(0,0%,10%)',
          p: '#43A5FF',
          pl: '#F2F9FE',
          pd: '#2F4066'
        }
      }
    })
  })
})
