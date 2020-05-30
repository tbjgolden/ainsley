# 👨🏾‍🍳 Ainsley

Ainsley is a better (maintainable, self documenting more efficient) way to
define your stylesheet.

```js
// Define your stylesheet using JavaScript, or JSON
const breakpoints = Object.entries({
  s: 384,
  m: 768,
  l: 1024
}).map(([prefix, pixels]) => [prefix, `@media(min-width:${pixels}px)`])

// This tiny object contains all the instructions to assemble a stylesheet
const ainsley = {
  // `variations` allow you to add modifiers to children
  // e.g. breakpoints, or hover styles
  variations: [breakpoints],
  // `variables` allow you to reuse groups of properties and values
  variables: {
    color: { b: 'black', w: 'white' }
  },
  children: [
    // You may use `"$..."` syntax to import configs and remote urls;
    // it is able to import CSS and JSON.
    '$https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css',
    // You may also use it to import configs installed by npm (or yarn);
    // this one would import the npm package "ainsley-config-example".
    '$example',
    // You may nest ainsley objects;
    // this allows you to scope variables, variations and configs.
    {
      variables: {
        // `variables` prefixed with a `+` will merge with any
        // definition higher up (otherwise, it behaves like normal).
        '+color': {
          lg: '#eee',
          g: '#888',
          dg: '#222'
        },
        // `variables` prefixed with a `?` will only be defined
        // if they have not been already been defined higher up.
        '?length': {
          0: 0,
          1: '1px',
          2: '2px'
        }
      },
      children: [
        // This is a "utility rule" - it looks like a typical CSS rule.
        // It uses a variable, which will output every possible permutation!
        ['bg', [['background-color', '{color}']]],
        // This string is the prefix of the "utility class".
        // ↙ Abbreviations of `variable` values will be appended to it.
        [
          'b',
          [
            // "Utility rules" support multiple declarations.
            // "Utility declarations" may use any number of variables.
            ['border', '{length} {color}'],
            ['border-style', 'solid']
          ]
        ]
      ]
    }
  ]
}

// flatten replaces external dependencies with their contents
// (i.e. CSS/JSON urls, configs)
// 💞 ➡ ❤️
const configWithoutDependencies = flatten(ainsley)
// minify generates a config which is designed to use less bytes
// after it has been compressed; this is how it should be sent to the client
// ❤️ ➡ 💌
const minifiedConfig = minify(configWithoutDependencies)

// (ON THE CLIENT) to generate CSS, and embed it into the page
// 💌 ➡ ❤️🧡💛💚💙💜
Ainsley.embed(Ainsley.generate(minifiedConfig /* , options */))
```

### Use cases

- Write it, translate it using repl, use it as css - easy
- Webpack config - validate + flatten + minify + embed
- CRA/SSG (locked Webpack config) - use babel macros
- Babel macros - // @preval file comment
- Using a framework without babel macros - use embed directly
- CSS and wants to migrate - embed as string, and gradually migrate
- SASS and wants to migrate - compile to CSS and gradually migrate
- Explain why no webpack plugin / autoprefixer

<!--

# `ainsley`

[![npm version](https://img.shields.io/npm/v/ainsley.svg?style=flat-square)](https://www.npmjs.com/package/ainsley)
[![npm downloads](https://img.shields.io/npm/dm/ainsley.svg?style=flat-square)](https://www.npmjs.com/package/ainsley)
![coverage](/scripts/jest/shield.svg)

>

## Basic Usage

```jsx
import React from 'react'
import { render } from 'react-dom'

render(, document.getElementById('root'))
```

## Installation

```
$ npm install ainsley --save
```

There are also UMD builds available via [unpkg](https://unpkg.com/):

- https://unpkg.com/ainsley/dist/ainsley.umd.development.js
- https://unpkg.com/ainsley/dist/ainsley.umd.production.js

For the non-minified development version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.development.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.development.js)
- [`PropTypes`](https://unpkg.com/prop-types/prop-types.js)

For the minified production version, make sure you have already included:

- [`React`](https://unpkg.com/react/umd/react.production.min.js)
- [`ReactDOM`](https://unpkg.com/react-dom/umd/react-dom.production.min.js)

## [`Docs`](https://tbjgolden.github.io/ainsley/docs)

## [`API`](https://tbjgolden.github.io/ainsley/docs/api)

## Live Examples

- [Basic Usage](https://github.com/tbjgolden/ainsley/tree/master/examples/basic-usage)

## License

MIT

-->
