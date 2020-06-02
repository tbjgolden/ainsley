# 👨🏾‍🍳 Ainsley

[![Financial Contributors on Open Collective](https://opencollective.com/ainsley/all/badge.svg?label=financial+contributors)](https://opencollective.com/ainsley)
![npm](https://img.shields.io/npm/v/ainsley)
![coverage](/scripts/jest/shield.svg)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/ainsley)
[![GitHub issues](https://img.shields.io/github/issues/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/issues)
[![GitHub stars](https://img.shields.io/github/stars/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/stargazers)
[![GitHub license](https://img.shields.io/github/license/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley)

Ainsley is a more efficient way to define your stylesheet.

It promises to let you:

- have an unmatched developer experience
- use your existing CSS knowledge
- compress your bytes sent by an order of magnitude
- serialize your framework as tiny, readable JSON

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
// 💞 ➡ 💖
const configWithoutDependencies = await flatten(ainsley)
// minify generates a config which is designed to use less bytes
// after it has been compressed; this is how it should be sent to the client
// 💖 ➡ 💌
const minifiedConfig = minify(configWithoutDependencies)

// (ON THE CLIENT) to generate CSS, and embed it into the page
// 💌 ➡ 🧡💛💚💙💜
Ainsley.embed(Ainsley.generate(minifiedConfig /* , options */))
```

## Compression potential

Instead of writing a stylesheet in CSS, you write it in a small JavaScript
object, which can be optionally serialized as JSON.

The browser receives this small object and recursively compiles it into CSS.
This compresses it massively.

```none
+==============+ +-------+-----------+------------+
|    Example   | |    JS | JS-to-CSS | Equivalent |
+==============+ | input |  compiler | CSS output |
+----------------+-------+-----------+------------+
| minified bytes | 5,094 |     2,751 |    786,877 |
+---+------------+-------+-----------+------------+
|  gzipped bytes | 2,146 |     1,317 |    139,296 |
+---+------------+-------+-----------+------------+
|   brotli bytes | 1,821 |     1,163 |     23,747 |
+---+------------+-------+-----------+------------+
    | TOTAL SENT |             2,984 |     23,747 |
    +------------+-------------------+------------+

(using default settings with src/configs/examples.baseConfig)
```

## Comparisons to others

| **Name**      | **Minified** |    **Gzip** |  **Brotli** | **CSS Rules** | **Rules per byte** |
| :------------ | -----------: | ----------: | ----------: | ------------: | -----------------: |
| **ainsley**   |  **`7,845`** | **`3,463`** | **`2,984`** |  **`22,809`** |         **`7.64`** |
| tailwindcss   |    `710,997` |    `97,417` |    `10,199` |      `14,445` |             `1.42` |
| tachyons      |     `73,497` |    `13,697` |     `2,421` |       `2,113` |             `0.87` |
| sane-tachyons |     `49,793` |     `9,200` |     `1,957` |       `1,278` |             `0.65` |
| turretcss     |     `93,542` |    `17,025` |     `4,311` |       `1,588` |             `0.37` |
| solid         |     `82,482` |    `12,585` |     `2,497` |       `1,469` |             `0.59` |
| basscss       |     `11,326` |     `2,477` |       `589` |         `260` |             `0.44` |
| bootstrap     |    `159,515` |    `23,681` |     `4,762` |       `2,027` |             `0.43` |
| bulma         |    `194,420` |    `25,511` |     `5,705` |       `2,142` |             `0.38` |
| materialize   |    `141,841` |    `21,558` |     `5,579` |       `1,609` |             `0.29` |
| spectre       |     `45,964` |     `9,631` |     `1,992` |         `638` |             `0.32` |
| foundation    |    `132,474` |    `17,219` |     `3,471` |       `1,420` |             `0.41` |
| milligram     |      `8,718` |     `2,295` |       `442` |          `90` |             `0.20` |
| skeleton      |      `5,879` |     `1,630` |       `356` |          `84` |             `0.24` |

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute.
[[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/tbjgolden/ainsley/graphs/contributors"><img src="https://opencollective.com/ainsley/contributors.svg?width=890&button=false" /></a>

### Contribute

[[Contribute](https://opencollective.com/ainsley/contribute)]

<a href="https://opencollective.com/ainsley"><img src="https://opencollective.com/ainsley/individuals.svg?width=890"></a>
<a href="https://opencollective.com/ainsley/organization/0/website"><img src="https://opencollective.com/ainsley/organization/0/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/1/website"><img src="https://opencollective.com/ainsley/organization/1/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/2/website"><img src="https://opencollective.com/ainsley/organization/2/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/3/website"><img src="https://opencollective.com/ainsley/organization/3/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/4/website"><img src="https://opencollective.com/ainsley/organization/4/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/5/website"><img src="https://opencollective.com/ainsley/organization/5/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/6/website"><img src="https://opencollective.com/ainsley/organization/6/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/7/website"><img src="https://opencollective.com/ainsley/organization/7/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/8/website"><img src="https://opencollective.com/ainsley/organization/8/avatar.svg"></a>
<a href="https://opencollective.com/ainsley/organization/9/website"><img src="https://opencollective.com/ainsley/organization/9/avatar.svg"></a>

## Use cases

- Write it, import and minify using repl, use it as css - easy
- Webpack config - validate + flatten + minify + embed
- CRA/SSG (locked Webpack config) - use babel macros
- Babel macros - // @preval file comment
- Using a framework without babel macros - use embed directly
- CSS and wants to migrate - embed as string, and gradually migrate
- SASS and wants to migrate - compile to CSS and gradually migrate
- Explain why no webpack plugin / autoprefixer

(MIT Licence)
