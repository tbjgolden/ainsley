const Ainsley = require('../dist/ainsley.cjs')

const startTime = Date.now()
Ainsley.ainsleyToCSS({
  defs: [
    ['c&', [['color', '{colors}']]],
    ['bac&', [['background-color', '{colors}']]],
    [
      'fosz&',
      [
        ['font-size', '{typeScale}'],
        ['line-height', 1.2]
      ]
    ],
    ['&&', [['{scalar}', '{scale}']]],
    ['&&', [['{direction}', '{scale}']]],
    ['&&', [['{vector}', '{scale}']]],
    ['&&&', [['{vector}-{direction}', '{scale}']]],
    ['ma&N&', [['margin-{direction}', '-{scale}']]],
    ['bap&&', [['background-position', '{xLoc} {yLoc}']]],
    ['bo&w&', [['border-{direction}-width', '{scale}']]],
    ['bo&c&', [['border-{direction}-color', '{colors}']]],
    ['fl&&&', [['flex', '{flexChange} {flexChange} {flexBasis}']]],
    ['&&', [['{flexCrossAxes}', '{flexCrossAxis}']]],
    ['ov&&', [['overflow', '{overflow} {overflow}']]]
  ],
  props: [
    [
      'Display',
      ['Inline', 'Block', 'FleX', 'None', 'Inline-Block', 'Inline-FleX']
    ],
    ['Text-Decoration', ['Line-through', 'Underline', 'None']],
    ['FOnt-STyle', ['Italic', 'Normal']],
    ['Text-TransForm', ['Uppercase', 'Lowercase']],
    ['OVerflow-Wrap', ['Break-Word', 'Anywhere', 'Normal']],
    ['BAckground-Repeat', ['Repeat', 'No-repeat']],
    ['Position', ['Relative', 'Absolute', 'Fixed', 'Sticky']],
    ['Text-Align', ['Left', 'Center', 'Right', 'Justify']],
    ['Vertical-Align', ['Top', 'Middle', 'Bottom']],
    ['CUrsor', ['Default', 'Pointer']],
    ['Pointer-Events', ['None', 'All']],
    ['Z-Index', [0, 1, 2, 4, 8, 16, 32, -1]],
    ['Opacity', [0, 10, 20, 40, 80, 100]],
    ['White-Space', ['Pre', 'Pre-Wrap', 'NoWrap', 'Normal']],
    ['BAckground-SiZe', ['CoVer', 'ConTain']],
    ['FLex-Direction', ['Row', 'Column', 'Row-Reverse', 'Column-Reverse']],
    [
      'Justify-Content',
      ['Center', 'Flex-Start', 'Flex-End', 'Space-Between', 'Space-Evenly']
    ],
    ['Line-Height', { B: 1, T: 1.2, C: 1.3 }],
    ['FOnt-Weight', { N: 400, M: 600, B: 700 }]
  ],
  mods: [
    [
      ['o-', ':hover'],
      ['o-', ':focus'],
      ['o-', ':active']
    ],
    [
      ['s-', '@media(min-width:384px)'],
      ['m-', '@media(min-width:768px)'],
      ['l-', '@media(min-width:1024px)'],
      ['x-', '@media(min-width:1536px)']
    ]
  ],
  '{overflow}': ['Hidden', 'Scroll', 'Auto', 'Visible'],
  '{flexCrossAxes}': ['Align-Items', 'Align-Self', 'Align-Content'],
  '{flexCrossAxis}': [
    'Flex-Start',
    'Flex-End',
    'Center',
    'Baseline',
    'Stretch'
  ],
  '{flexChange}': { '0': '0', '1': '1', '2': '2', X: '11111111' },
  '{flexBasis}': { '0': '0%', A: 'auto', P: '100%' },
  '{xLoc}': ['Left', 'Right', 'Center'],
  '{yLoc}': ['Top', 'Bottom', 'Center'],
  '{scalar}': [
    'Width',
    'maX-Width',
    'miN-Width',
    'Height',
    'maX-Height',
    'miN-Height',
    'BOrder-Radius'
  ],
  '{vector}': ['MArgin', 'PAdding'],
  '{direction}': ['Top', 'Left', 'Right', 'Bottom'],
  '{colors}': {
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
  '{typeScale}': {
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
  '{scale}': {
    '0': '0',
    '1': '1px',
    '2': '2px',
    '3': '3px',
    '10': '4px',
    '15': '6px',
    '20': '8px',
    '25': '12px',
    '30': '16px',
    '35': '24px',
    '40': '32px',
    '45': '48px',
    '50': '64px',
    '55': '96px',
    '60': '128px',
    '65': '192px',
    '70': '256px',
    '75': '384px',
    '80': '512px',
    '85': '768px',
    '90': '1024px',
    '95': '1536px',
    P50: '50%',
    P: '100%',
    H: '100vh',
    W: '100vw',
    X: '11111111px'
  },
  reset:
    '*,::after,::before{box-sizing:border-box;outline-offset:0;border:0 solid}[type=button],[type=date],[type=datetime-local],[type=email],[type=file],[type=image],[type=month],[type=number],[type=password],[type=reset],[type=search],[type=submit],[type=tel],[type=text],[type=time],[type=url],[type=week],a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,button,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,time,tt,u,ul,var,video{margin:0;padding:0;border:0 solid;background:0 0;font:inherit;color:inherit;text-align:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}html{overflow-y:scroll;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:none}textarea{resize:vertical;overflow:auto}applet,canvas,img,object,svg,video{max-width:100%;height:auto}'
})
const endTime = Date.now()

console.log('Duration:', endTime - startTime + 'ms')

// "Duration: 72ms"
