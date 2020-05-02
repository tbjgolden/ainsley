const Ainsley = require('../dist/ainsley.client.cjs')

const startTime = Date.now()
Ainsley.generate({
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
})
const endTime = Date.now()

console.log('Duration:', endTime - startTime + 'ms')
