#!/usr/bin/env node

const Ainsley = require('ainsley')

const input = {
  variations: [
    [
      ['s', '@media(min-width:384px)'],
      ['m', '@media(min-width:768px)'],
      ['l', '@media(min-width:1024px)']
    ]
  ],
  variables: {
    color: { b: 'black', w: 'white', lg: '#eee', g: '#888', dg: '#222' },
    length: { '0': 0, '1': '1px', '2': '2px', '8': '8px', '16': '16px' }
  },
  children: [
    '$https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.min.css',
    'body{font:16px/1.25 sans-serif}',
    ['bg', [['background-color', '{color}']]],
    [
      'b',
      [
        ['border', '{length} {color}'],
        ['border-style', 'solid']
      ]
    ],
    ['c', [['color', '{color}']]],
    ['pa', [['padding', '{length}']]],
    ['mt', [['margin-top', '{length}']]],
    [
      'h1',
      [
        ['font-size', '32px'],
        ['font-weight', 'bold']
      ]
    ]
  ]
}

Ainsley.flatten(input).then((flatInput) => {
  const minified = Ainsley.minify(flatInput)
  console.log(JSON.stringify(minified))
})