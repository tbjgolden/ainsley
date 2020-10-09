import { Ainsley } from '../types'
import { generate } from '.'

const basicInput: Ainsley = {
  variations: [
    [
      ['s', '@media(min-width:384px)'],
      ['m', '@media(min-width:768px)']
    ]
  ],
  variables: {
    length: {
      0: 0,
      1: '1px'
    },
    colors: {
      b: 'black',
      w: 'white',
      p: '#313375',
      s: '#b4d455'
    }
  },
  children: [
    '*{box-sizing:border-box}',
    ['c', [['color', '{colors}']]],
    '*{outline-offset:0}',
    ['b', [['border', '{length} solid {colors}']]],
    '.h1{font-size:69px}body{margin:0}',
    [
      'Display',
      {
        n: 'none',
        b: 'block'
      }
    ],
    {
      variables: {
        '+colors': {
          t: '#aabbcc'
        }
      },
      children: [['bc', [['background-color', '{colors}']]]]
    }
  ]
}

describe('compiler', () => {
  test('compiles ainsley as expected', () => {
    const expected =
      '*{box-sizing:border-box}.c-b{color:black}.c-w{color:white}.c-p{color:#313375}.c-s{color:#b4d455}*{outline-offset:0}.b-0-b{border:0 solid black}.b-1-b{border:1px solid black}.b-0-w{border:0 solid white}.b-1-w{border:1px solid white}.b-0-p{border:0 solid #313375}.b-1-p{border:1px solid #313375}.b-0-s{border:0 solid #b4d455}.b-1-s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-D-n{Display:none}.-D-b{Display:block}.bc-b{background-color:black}.bc-w{background-color:white}.bc-p{background-color:#313375}.bc-s{background-color:#b4d455}.bc-t{background-color:#aabbcc}@media(min-width:384px){.s_c-b{color:black}.s_c-w{color:white}.s_c-p{color:#313375}.s_c-s{color:#b4d455}.s_b-0-b{border:0 solid black}.s_b-1-b{border:1px solid black}.s_b-0-w{border:0 solid white}.s_b-1-w{border:1px solid white}.s_b-0-p{border:0 solid #313375}.s_b-1-p{border:1px solid #313375}.s_b-0-s{border:0 solid #b4d455}.s_b-1-s{border:1px solid #b4d455}.s_-D-n{Display:none}.s_-D-b{Display:block}.s_bc-b{background-color:black}.s_bc-w{background-color:white}.s_bc-p{background-color:#313375}.s_bc-s{background-color:#b4d455}.s_bc-t{background-color:#aabbcc}}@media(min-width:768px){.m_c-b{color:black}.m_c-w{color:white}.m_c-p{color:#313375}.m_c-s{color:#b4d455}.m_b-0-b{border:0 solid black}.m_b-1-b{border:1px solid black}.m_b-0-w{border:0 solid white}.m_b-1-w{border:1px solid white}.m_b-0-p{border:0 solid #313375}.m_b-1-p{border:1px solid #313375}.m_b-0-s{border:0 solid #b4d455}.m_b-1-s{border:1px solid #b4d455}.m_-D-n{Display:none}.m_-D-b{Display:block}.m_bc-b{background-color:black}.m_bc-w{background-color:white}.m_bc-p{background-color:#313375}.m_bc-s{background-color:#b4d455}.m_bc-t{background-color:#aabbcc}}'

    expect(generate(basicInput)).toEqual(expected)
  })

  test('compiles ainsley with partial options (even index) as expected', () => {
    const expected =
      '*{box-sizing:border-box}.c\\:b{color:black}.c\\:w{color:white}.c\\:p{color:#313375}.c\\:s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b{border:0 solid black}.b\\:1\\:b{border:1px solid black}.b\\:0\\:w{border:0 solid white}.b\\:1\\:w{border:1px solid white}.b\\:0\\:p{border:0 solid #313375}.b\\:1\\:p{border:1px solid #313375}.b\\:0\\:s{border:0 solid #b4d455}.b\\:1\\:s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-D\\:n{Display:none}.-D\\:b{Display:block}.bc\\:b{background-color:black}.bc\\:w{background-color:white}.bc\\:p{background-color:#313375}.bc\\:s{background-color:#b4d455}.bc\\:t{background-color:#aabbcc}@media(min-width:384px){.c\\:b_s{color:black}.c\\:w_s{color:white}.c\\:p_s{color:#313375}.c\\:s_s{color:#b4d455}.b\\:0\\:b_s{border:0 solid black}.b\\:1\\:b_s{border:1px solid black}.b\\:0\\:w_s{border:0 solid white}.b\\:1\\:w_s{border:1px solid white}.b\\:0\\:p_s{border:0 solid #313375}.b\\:1\\:p_s{border:1px solid #313375}.b\\:0\\:s_s{border:0 solid #b4d455}.b\\:1\\:s_s{border:1px solid #b4d455}.-D\\:n_s{Display:none}.-D\\:b_s{Display:block}.bc\\:b_s{background-color:black}.bc\\:w_s{background-color:white}.bc\\:p_s{background-color:#313375}.bc\\:s_s{background-color:#b4d455}.bc\\:t_s{background-color:#aabbcc}}@media(min-width:768px){.c\\:b_m{color:black}.c\\:w_m{color:white}.c\\:p_m{color:#313375}.c\\:s_m{color:#b4d455}.b\\:0\\:b_m{border:0 solid black}.b\\:1\\:b_m{border:1px solid black}.b\\:0\\:w_m{border:0 solid white}.b\\:1\\:w_m{border:1px solid white}.b\\:0\\:p_m{border:0 solid #313375}.b\\:1\\:p_m{border:1px solid #313375}.b\\:0\\:s_m{border:0 solid #b4d455}.b\\:1\\:s_m{border:1px solid #b4d455}.-D\\:n_m{Display:none}.-D\\:b_m{Display:block}.bc\\:b_m{background-color:black}.bc\\:w_m{background-color:white}.bc\\:p_m{background-color:#313375}.bc\\:s_m{background-color:#b4d455}.bc\\:t_m{background-color:#aabbcc}}'

    expect(
      generate(basicInput, {
        addVariationToSelector: (a, b) => a + '_' + b,
        addValueToSelector: (a, b) => a + '\\:' + b
      })
    ).toEqual(expected)
  })

  test('compiles ainsley with partial options (odd index) as expected', () => {
    const expected =
      '*{box-sizing:border-box}.c-b{color:black}.c-w{color:white}.c-p{color:#313375}.c-s{color:#b4d455}*{outline-offset:0}.b-0-b{border:0 solid black}.b-1-b{border:1px solid black}.b-0-w{border:0 solid white}.b-1-w{border:1px solid white}.b-0-p{border:0 solid #313375}.b-1-p{border:1px solid #313375}.b-0-s{border:0 solid #b4d455}.b-1-s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-d-n{display:none}.-d-b{display:block}.bc-b{background-color:black}.bc-w{background-color:white}.bc-p{background-color:#313375}.bc-s{background-color:#b4d455}.bc-t{background-color:#aabbcc}@media(min-width:384px){.s_c-b{color:black}.s_c-w{color:white}.s_c-p{color:#313375}.s_c-s{color:#b4d455}.s_b-0-b{border:0 solid black}.s_b-1-b{border:1px solid black}.s_b-0-w{border:0 solid white}.s_b-1-w{border:1px solid white}.s_b-0-p{border:0 solid #313375}.s_b-1-p{border:1px solid #313375}.s_b-0-s{border:0 solid #b4d455}.s_b-1-s{border:1px solid #b4d455}.s_-d-n{display:none}.s_-d-b{display:block}.s_bc-b{background-color:black}.s_bc-w{background-color:white}.s_bc-p{background-color:#313375}.s_bc-s{background-color:#b4d455}.s_bc-t{background-color:#aabbcc}}@media(min-width:768px){.m_c-b{color:black}.m_c-w{color:white}.m_c-p{color:#313375}.m_c-s{color:#b4d455}.m_b-0-b{border:0 solid black}.m_b-1-b{border:1px solid black}.m_b-0-w{border:0 solid white}.m_b-1-w{border:1px solid white}.m_b-0-p{border:0 solid #313375}.m_b-1-p{border:1px solid #313375}.m_b-0-s{border:0 solid #b4d455}.m_b-1-s{border:1px solid #b4d455}.m_-d-n{display:none}.m_-d-b{display:block}.m_bc-b{background-color:black}.m_bc-w{background-color:white}.m_bc-p{background-color:#313375}.m_bc-s{background-color:#b4d455}.m_bc-t{background-color:#aabbcc}}'

    expect(
      generate(basicInput, {
        addPropertyToSelector: (a, b) => a + '-' + b,
        abbreviateProperty: (a) => {
          const noLowerCase = a.replace(/[a-z]+/g, '')
          return [noLowerCase.toLowerCase(), a.toLowerCase()]
        }
      })
    ).toEqual(expected)
  })

  test('compiles ainsley with all options as expected', () => {
    const expected =
      '*{box-sizing:border-box}.c\\:b{color:black}.c\\:w{color:white}.c\\:p{color:#313375}.c\\:s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b{border:0 solid black}.b\\:1\\:b{border:1px solid black}.b\\:0\\:w{border:0 solid white}.b\\:1\\:w{border:1px solid white}.b\\:0\\:p{border:0 solid #313375}.b\\:1\\:p{border:1px solid #313375}.b\\:0\\:s{border:0 solid #b4d455}.b\\:1\\:s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-d\\:n{display:none}.-d\\:b{display:block}.bc\\:b{background-color:black}.bc\\:w{background-color:white}.bc\\:p{background-color:#313375}.bc\\:s{background-color:#b4d455}.bc\\:t{background-color:#aabbcc}@media(min-width:384px){.c\\:b_s{color:black}.c\\:w_s{color:white}.c\\:p_s{color:#313375}.c\\:s_s{color:#b4d455}.b\\:0\\:b_s{border:0 solid black}.b\\:1\\:b_s{border:1px solid black}.b\\:0\\:w_s{border:0 solid white}.b\\:1\\:w_s{border:1px solid white}.b\\:0\\:p_s{border:0 solid #313375}.b\\:1\\:p_s{border:1px solid #313375}.b\\:0\\:s_s{border:0 solid #b4d455}.b\\:1\\:s_s{border:1px solid #b4d455}.-d\\:n_s{display:none}.-d\\:b_s{display:block}.bc\\:b_s{background-color:black}.bc\\:w_s{background-color:white}.bc\\:p_s{background-color:#313375}.bc\\:s_s{background-color:#b4d455}.bc\\:t_s{background-color:#aabbcc}}@media(min-width:768px){.c\\:b_m{color:black}.c\\:w_m{color:white}.c\\:p_m{color:#313375}.c\\:s_m{color:#b4d455}.b\\:0\\:b_m{border:0 solid black}.b\\:1\\:b_m{border:1px solid black}.b\\:0\\:w_m{border:0 solid white}.b\\:1\\:w_m{border:1px solid white}.b\\:0\\:p_m{border:0 solid #313375}.b\\:1\\:p_m{border:1px solid #313375}.b\\:0\\:s_m{border:0 solid #b4d455}.b\\:1\\:s_m{border:1px solid #b4d455}.-d\\:n_m{display:none}.-d\\:b_m{display:block}.bc\\:b_m{background-color:black}.bc\\:w_m{background-color:white}.bc\\:p_m{background-color:#313375}.bc\\:s_m{background-color:#b4d455}.bc\\:t_m{background-color:#aabbcc}}'

    expect(
      generate(basicInput, {
        addVariationToSelector: (a, b) => a + '_' + b,
        addValueToSelector: (a, b) => a + '\\:' + b,
        addPropertyToSelector: (a, b) => a + '-' + b,
        abbreviateProperty: (a) => [
          a.replace(/[a-z]+/g, '').toLowerCase(),
          a.toLowerCase()
        ]
      })
    ).toEqual(expected)
  })

  test('compiles complex ainsley successfully and under 200ms', () => {
    const gen = () =>
      generate(
        {
          children: [
            '*,::after,::before{box-sizing:border-box;outline-offset:0;border:0 solid}[type=button],[type=date],[type=datetime-local],[type=email],[type=file],[type=image],[type=month],[type=number],[type=password],[type=reset],[type=search],[type=submit],[type=tel],[type=text],[type=time],[type=url],[type=week],a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,button,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,time,tt,u,ul,var,video{margin:0;padding:0;border:0 solid;background:0 0;font:inherit;color:inherit;text-align:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}html{overflow-y:scroll;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:none}textarea{resize:vertical;overflow:auto}applet,canvas,img,object,svg,video{max-width:100%;height:auto}',
            {
              children: [
                ['c', [['color', '{colors}']]],
                ['bac', [['background-color', '{colors}']]],
                [
                  'fosz',
                  [
                    ['font-size', '{typeScale}'],
                    ['line-height', 1.2]
                  ]
                ],
                ['', [['{scalar}', '{scale}']]],
                ['', [['{direction}', '{scale}']]],
                ['', [['{vector}', '{scale}']]],
                ['', [['{vector}-{direction}', '{scale}']]],
                ['ma$N', [['margin-{direction}', '-{scale}']]],
                ['bap', [['background-position', '{xLoc} {yLoc}']]],
                ['bo$w', [['border-{direction}-width', '{scale}']]],
                ['bo$c', [['border-{direction}-color', '{colors}']]],
                ['fl', [['flex', '{flexChange} {flexChange} {flexBasis}']]],
                ['', [['{flexCrossAxes}', '{flexCrossAxis}']]],
                ['ov', [['overflow', '{overflow} {overflow}']]],
                [
                  'Display',
                  {
                    i: 'inline',
                    b: 'block',
                    fx: 'flex',
                    n: 'none',
                    ib: 'inline-block',
                    ifx: 'inline-flex'
                  }
                ],
                [
                  'Text-Decoration',
                  {
                    l: 'line-through',
                    u: 'underline',
                    n: 'none'
                  }
                ],
                [
                  'FOnt-STyle',
                  {
                    i: 'italic',
                    n: 'normal'
                  }
                ],
                [
                  'Text-TransForm',
                  {
                    u: 'uppercase',
                    l: 'lowercase'
                  }
                ],
                [
                  'OVerflow-Wrap',
                  {
                    bw: 'break-word',
                    a: 'anywhere',
                    n: 'normal'
                  }
                ],
                [
                  'BAckground-Repeat',
                  {
                    r: 'repeat',
                    n: 'no-repeat'
                  }
                ],
                [
                  'Position',
                  {
                    r: 'relative',
                    a: 'absolute',
                    f: 'fixed',
                    s: 'sticky'
                  }
                ],
                [
                  'Text-Align',
                  {
                    l: 'left',
                    c: 'center',
                    r: 'right',
                    j: 'justify'
                  }
                ],
                [
                  'Vertical-Align',
                  {
                    t: 'top',
                    m: 'middle',
                    b: 'bottom'
                  }
                ],
                [
                  'CUrsor',
                  {
                    d: 'default',
                    p: 'pointer'
                  }
                ],
                [
                  'Pointer-Events',
                  {
                    n: 'none',
                    a: 'all'
                  }
                ],
                [
                  'Z-Index',
                  {
                    '0': '0',
                    '1': '-1',
                    '2': '2',
                    '4': '4',
                    '8': '8',
                    '16': '16',
                    '32': '32'
                  }
                ],
                [
                  'Opacity',
                  {
                    '0': '0',
                    '10': '10',
                    '20': '20',
                    '40': '40',
                    '80': '80',
                    '100': '100'
                  }
                ],
                [
                  'White-Space',
                  {
                    p: 'pre',
                    pw: 'pre-wrap',
                    nw: 'nowrap',
                    n: 'normal'
                  }
                ],
                [
                  'BAckground-SiZe',
                  {
                    cv: 'cover',
                    ct: 'contain'
                  }
                ],
                [
                  'FLex-Direction',
                  {
                    r: 'row',
                    c: 'column',
                    rr: 'row-reverse',
                    cr: 'column-reverse'
                  }
                ],
                [
                  'Justify-Content',
                  {
                    c: 'center',
                    fs: 'flex-start',
                    fe: 'flex-end',
                    sb: 'space-between',
                    se: 'space-evenly'
                  }
                ],
                ['Line-Height', { B: 1, T: 1.2, C: 1.3 }],
                ['FOnt-Weight', { N: 400, M: 600, B: 700 }]
              ],
              variables: {
                overflow: {
                  h: 'hidden',
                  s: 'scroll',
                  a: 'auto',
                  v: 'visible'
                },
                flexCrossAxes: {
                  ai: 'align-items',
                  as: 'align-self',
                  ac: 'align-content'
                },
                flexCrossAxis: {
                  fs: 'flex-start',
                  fe: 'flex-end',
                  c: 'center',
                  b: 'baseline',
                  s: 'stretch'
                },
                flexChange: {
                  0: '0',
                  1: '1',
                  2: '2',
                  x: '11111111'
                },
                flexBasis: {
                  0: '0%',
                  a: 'auto',
                  p: '100%'
                },
                xLoc: {
                  l: 'left',
                  r: 'right',
                  c: 'center'
                },
                yLoc: {
                  t: 'top',
                  b: 'bottom',
                  c: 'center'
                },
                scalar: {
                  w: 'width',
                  xw: 'max-width',
                  nw: 'min-width',
                  h: 'height',
                  xh: 'max-height',
                  nh: 'min-height',
                  bor: 'border-radius'
                },
                vector: {
                  ma: 'margin',
                  pa: 'padding'
                },
                direction: {
                  t: 'top',
                  l: 'left',
                  r: 'right',
                  b: 'bottom'
                },
                colors: {
                  W: 'white',
                  B: 'black',
                  TR: 'transparent',
                  G98: 'hsl(0,0%,98%)',
                  G94: 'hsl(0,0%,94%)',
                  G88: 'hsl(0,0%,88%)',
                  G80: 'hsl(0,0%,80%)',
                  G30: 'hsl(0,0%,30%)',
                  G20: 'hsl(0,0%,20%)',
                  G10: 'hsl(0,0%,10%)',
                  B05: 'hsla(0,0%,0%,05%)',
                  B10: 'hsla(0,0%,0%,10%)',
                  B20: 'hsla(0,0%,0%,20%)',
                  B40: 'hsla(0,0%,0%,40%)',
                  B80: 'hsla(0,0%,0%,80%)',
                  W05: 'hsla(0,0%,100%,05%)',
                  W10: 'hsla(0,0%,100%,10%)',
                  W20: 'hsla(0,0%,100%,20%)',
                  W40: 'hsla(0,0%,100%,40%)',
                  W80: 'hsla(0,0%,100%,80%)',
                  PRIMARY: '#8d1d90',
                  ALTPRIMARY: '#9d3ea0',
                  SECONDARY: '#b7de58',
                  ALTSECONDARY: '#c1e270',
                  GOOD: '#3bb273',
                  LIGHTGOOD: '#ebf7f1',
                  WARN: '#e1bc29',
                  LIGHTWARN: '#fcf8e9',
                  BAD: '#e15554',
                  LIGHTBAD: '#fceeed',
                  MSG: '#3d70b2',
                  LIGHTMSG: '#ebf0f7'
                },
                typeScale: {
                  H1: '72px',
                  H2: '48px',
                  H3: '32px',
                  H4: '24px',
                  H5: '20px',
                  LG: '20px',
                  MD: '16px',
                  SM: '14px',
                  XS: '12px'
                },
                scale: {
                  0: '0',
                  1: '1px',
                  2: '2px',
                  3: '3px',
                  10: '4px',
                  15: '6px',
                  20: '8px',
                  25: '12px',
                  30: '16px',
                  35: '24px',
                  40: '32px',
                  45: '48px',
                  50: '64px',
                  55: '96px',
                  60: '128px',
                  65: '192px',
                  70: '256px',
                  75: '384px',
                  80: '512px',
                  85: '768px',
                  90: '1024px',
                  95: '1536px',
                  P50: '50%',
                  P: '100%',
                  H: '100vh',
                  W: '100vw',
                  X: '11111111px'
                }
              },
              variations: [
                [
                  ['o', ':hover'],
                  ['o', ':focus'],
                  ['o', ':active']
                ],
                [
                  ['s', '@media(min-width:384px)'],
                  ['m', '@media(min-width:768px)'],
                  ['l', '@media(min-width:1024px)'],
                  ['x', '@media(min-width:1536px)']
                ]
              ]
            }
          ]
        },
        {
          addVariationToSelector: (a, b) => a + '_' + b,
          addValueToSelector: (a, b) => a + '\\:' + b,
          addPropertyToSelector: (a, b) => a + '-' + b,
          abbreviateProperty: (a) => [
            a.replace(/[a-z]+/g, '').toLowerCase(),
            a.toLowerCase()
          ]
        }
      )

    const runs = 5
    const startTime = Date.now()
    for (let i = 0; i < 5; i++) gen()
    expect(Date.now() - startTime).toBeLessThan(runs * 200)
  })

  test('compiles ainsley with nested at rules', () => {
    const css = generate({
      children: [['c', [['color', '{color}']]]],
      variables: {
        color: {
          b: 'black',
          w: 'white'
        }
      },
      variations: [
        [['n', '@supports(-webkit-box-orient:vertical)']],
        [['l', '@media(min-width:1024px)']]
      ]
    })

    const expected =
      '.c-b{color:black}.c-w{color:white}@supports(-webkit-box-orient:vertical){.n_c-b{color:black}.n_c-w{color:white}}@media(min-width:1024px){.l_c-b{color:black}.l_c-w{color:white}}@supports(-webkit-box-orient:vertical){@media(min-width:1024px){.l_n_c-b{color:black}.l_n_c-w{color:white}}}'

    expect(css).toEqual(expected)
  })

  test('compiles ainsley with nested ainsley with variations', () => {
    const css = generate({
      children: [
        ['c', [['color', '{color}']]],
        {
          variations: [[['l', '@media(min-width:1024px)']]],
          children: [['bg', [['background-color', '{color}']]]]
        }
      ],
      variables: {
        color: {
          b: 'black',
          w: 'white'
        }
      },
      variations: [[['n', '@supports(-webkit-box-orient:vertical)']]]
    })

    const expected =
      '.c-b{color:black}.c-w{color:white}.bg-b{background-color:black}.bg-w{background-color:white}@media(min-width:1024px){.l_bg-b{background-color:black}.l_bg-w{background-color:white}}@supports(-webkit-box-orient:vertical){.n_c-b{color:black}.n_c-w{color:white}.n_bg-b{background-color:black}.n_bg-w{background-color:white}@media(min-width:1024px){.l_n_bg-b{background-color:black}.l_n_bg-w{background-color:white}}}'

    expect(css).toEqual(expected)
  })

  test('compiles ainsley with variations without duplicating strings', () => {
    const css = generate({
      children: ['.example-css{color:red}', ['c', [['color', '{color}']]]],
      variables: {
        color: {
          b: 'black',
          w: 'white'
        }
      },
      variations: [[['n', '@supports(-webkit-box-orient:vertical)']]]
    })

    const expected =
      '.example-css{color:red}.c-b{color:black}.c-w{color:white}@supports(-webkit-box-orient:vertical){.n_c-b{color:black}.n_c-w{color:white}}'

    expect(css).toEqual(expected)
  })

  test('compiles ainsley even when it is getting ugly', () => {
    const css = generate({
      variables: {
        '?colors': {
          b: 'black',
          w: 'white'
        }
      },
      variations: [[['s', '@media(min-width:384px)']]],
      children: [
        ['c', [['color', '{colors}']]],
        {
          variables: {
            '+colors': {
              g: '#777'
            }
          },
          variations: [[['m', '@media(min-width:768px)']]],
          children: [
            ['bgc', [['background-color', '{colors}']]],
            {
              variables: {
                '+colors': {
                  y: '#ff0'
                }
              },
              variations: [[['l', '@media(min-width:1024px)']]],
              children: [['bc', [['border-color', '{colors}']]]]
            }
          ]
        }
      ]
    })

    const expected =
      '.c-b{color:black}.c-w{color:white}.bgc-b{background-color:black}.bgc-w{background-color:white}.bgc-g{background-color:#777}.bc-b{border-color:black}.bc-w{border-color:white}.bc-g{border-color:#777}.bc-y{border-color:#ff0}@media(min-width:1024px){.l_bc-b{border-color:black}.l_bc-w{border-color:white}.l_bc-g{border-color:#777}.l_bc-y{border-color:#ff0}}@media(min-width:768px){.m_bgc-b{background-color:black}.m_bgc-w{background-color:white}.m_bgc-g{background-color:#777}.m_bc-b{border-color:black}.m_bc-w{border-color:white}.m_bc-g{border-color:#777}.m_bc-y{border-color:#ff0}@media(min-width:1024px){.l_m_bc-b{border-color:black}.l_m_bc-w{border-color:white}.l_m_bc-g{border-color:#777}.l_m_bc-y{border-color:#ff0}}}@media(min-width:384px){.s_c-b{color:black}.s_c-w{color:white}.s_bgc-b{background-color:black}.s_bgc-w{background-color:white}.s_bgc-g{background-color:#777}.s_bc-b{border-color:black}.s_bc-w{border-color:white}.s_bc-g{border-color:#777}.s_bc-y{border-color:#ff0}@media(min-width:1024px){.l_s_bc-b{border-color:black}.l_s_bc-w{border-color:white}.l_s_bc-g{border-color:#777}.l_s_bc-y{border-color:#ff0}}@media(min-width:768px){.m_s_bgc-b{background-color:black}.m_s_bgc-w{background-color:white}.m_s_bgc-g{background-color:#777}.m_s_bc-b{border-color:black}.m_s_bc-w{border-color:white}.m_s_bc-g{border-color:#777}.m_s_bc-y{border-color:#ff0}@media(min-width:1024px){.l_m_s_bc-b{border-color:black}.l_m_s_bc-w{border-color:white}.l_m_s_bc-g{border-color:#777}.l_m_s_bc-y{border-color:#ff0}}}}'

    expect(css).toEqual(expected)
  })
})
