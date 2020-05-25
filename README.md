# Ainsley 👨🏾‍🍳

[![Financial Contributors on Open Collective](https://opencollective.com/ainsley/all/badge.svg?label=financial+contributors)](https://opencollective.com/ainsley) ![npm](https://img.shields.io/npm/v/ainsley) ![Coveralls github branch](https://img.shields.io/coveralls/github/tbjgolden/ainsley/master) ![David](https://img.shields.io/david/tbjgolden/ainsley) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/ainsley) [![GitHub issues](https://img.shields.io/github/issues/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/issues) [![GitHub stars](https://img.shields.io/github/stars/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/stargazers) [![GitHub license](https://img.shields.io/github/license/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley)

Ainsley is a functional CSS framework and library with no compromises.
It is the tiny spiritual successor of Tachyons and Tailwind.

It is comprised of multiple sub-libraries that together make it possible to:

- have an unmatched developer experience
- use your existing CSS knowledge
- use the least possible bytes
- have total flexibility
- serialize your framework as tiny, readable JSON

An analogy might be to say that Ainsley is to CSS what Markdown is to HTML.

## Impossibly small

Instead of writing a stylesheet in CSS, you write it in a small JavaScript
object, which can be optionally serialized as JSON.

The browser receives this small object and compiles it into CSS. This compresses
it massively.

```none
+==============+ +-------+-----------+------------+
| Base Ainsley | |    JS | JS-to-CSS | Equivalent |
+==============+ | input |  compiler | CSS output |
+----------------+-------+-----------+------------+
| minified bytes | 4,702 |     1,883 |    780,954 |
++---------------+-------+-----------+------------+
 | gzipped bytes | 2,042 |       918 |    141,189 |
 ++--------------+-------+-----------+------------+
  | brotli bytes | 1,775 |       844 |     23,646 |
  +-+------------+-------+-----------+------------+
    | TOTAL SENT |             2,619 |     23,646 |
    +------------+-------------------+------------+
```

## Comparisons to others

| **Name**      | **Minified** |   **Gzip** | **Brotli** | **CSS Rules** | **Efficiency\*** |  **Load 1** |  **Load 2** | **Load 3** |
| :------------ | -----------: | ---------: | ---------: | ------------: | ---------------: | ----------: | ----------: | ---------: |
| **ainsley**   |   **`6,585`** | **`2,960`** | **`2,619`** |   **`22,809`** |       **`6.36`** | **`4,272`** | **`1,263`** |      `115` |
| tailwindcss   |    `710,997` |   `97,417` |   `10,199` |      `14,445` |           `0.08` |    `18,031` |     `5,075` |      `183` |
| tachyons      |     `73,497` |   `13,697` |    `2,421` |       `2,113` |           `0.10` |     `5,606` |     `1,621` |   **`71`** |
| sane-tachyons |     `49,793` |    `9,200` |    `1,957` |       `1,278` |           `0.08` |     `5,345` |     `1,552` |       `75` |
| turretcss     |     `93,542` |   `17,025` |    `4,311` |       `1,588` |           `0.06` |           - |           - |          - |
| solid         |     `82,482` |   `12,585` |    `2,497` |       `1,469` |           `0.06` |           - |           - |          - |
| basscss       |     `11,326` |    `2,477` |      `589` |         `260` |           `0.07` |           - |           - |          - |
| bootstrap     |    `159,515` |   `23,681` |    `4,762` |       `2,027` |           `0.05` |           - |           - |          - |
| bulma         |    `194,420` |   `25,511` |    `5,705` |       `2,142` |           `0.04` |           - |           - |          - |
| materialize   |    `141,841` |   `21,558` |    `5,579` |       `1,609` |           `0.04` |           - |           - |          - |
| spectre       |     `45,964` |    `9,631` |    `1,992` |         `638` |           `0.04` |           - |           - |          - |
| foundation    |    `132,474` |   `17,219` |    `3,471` |       `1,420` |           `0.04` |           - |           - |          - |
| milligram     |      `8,718` |    `2,295` |      `442` |          `90` |           `0.03` |           - |           - |          - |
| skeleton      |      `5,879` |    `1,630` |      `356` |          `84` |           `0.04` |           - |           - |          - |

> \* Efficiency here can be thought of as real-world rules per byte (it uses a weighted average of real-world compression data).
>
> Load times are measured milliseconds to first contentful paint using an example html file.
> The test server and browser both use brotli compression.
>
> - Load Test 1: Chrome, Low-end mobile, Slow 3G, 360x640
> - Load Test 2: Chrome, Mid-tier mobile, Fast 3G, 414x736
> - Load Test 3: Chrome, MacBook Pro, South Korea speed, full resolution

## What's the magic sauce?

The reason this is so much more efficient than sending CSS because:

1. JS can perform combinatorial recursion
2. CSS frameworks often contain predictable patterns, as they are often created
   by preprocessors
3. CSS needs to send the whole attribute string every time it's used with a
   different value
4. CSS needs to send the whole value string every time it's used with a
   different attribute
5. The compiler is tiny, and minifies and compresses well, because JS minifies
   and compresses well

## Getting started

### Server

```bash
yarn add ainsley # or `npm install ainsley`
```

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

## Contributors

### Code Contributors

This project exists thanks to all the people who contribute. [[Contribute](CONTRIBUTING.md)].
<a href="https://github.com/tbjgolden/ainsley/graphs/contributors"><img src="https://opencollective.com/ainsley/contributors.svg?width=890&button=false" /></a>

### Financial Contributors

Become a financial contributor and help us sustain our community. [[Contribute](https://opencollective.com/ainsley/contribute)]

#### Individuals

<a href="https://opencollective.com/ainsley"><img src="https://opencollective.com/ainsley/individuals.svg?width=890"></a>

#### Organizations

Support this project with your organization. Your logo will show up here with a link to your website. [[Contribute](https://opencollective.com/ainsley/contribute)]

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
- Write it, translate it using repl, use it as css - easy
- Webpack config - validate + flatten + minify + embed
- CRA/SSG (locked Webpack config) - use babel macros
- Babel macros - // @preval file comment
- Using a framework without babel macros - use embed directly
- CSS and wants to migrate - embed as string, and gradually migrate
- SASS and wants to migrate - compile to CSS and gradually migrate
- Explain why no webpack plugin / autoprefixer

(MIT Licence)

