# Ainsley

Pragmatic lightweight extensible functional CSS library.

- [x] **Pragmatic:** only common classes that provide unique value have been
      added
- [x] **Lightweight:** no fluff, classes that don't allow extra functionality
      omitted
- [x] **Extensible:** bring your own project specific classes, and variables for
      project specifics like colors and type scale
- [x] **Functional:** all the benefits of functional CSS, faster development,
      lower CSS size, consistency, easier to review in PRs
- [x] **CSS library:** deliberately not a framework, as flexible as you need it

Ainsley attempts to be opinionated about the tedious stuff, like best practices
and accessibility, without interfering with your style!

## Getting started

```bash
yarn add ainsley # or `npm install ainsley`
```

```scss
// custom ainsley variables
...

// if you want to use the ainsley specific reset (recommended!)
@import "~ainsley/reset";

// import ainsley
@import "~ainsley";

// your custom overrides
...
```

## Key Principles

...

## How to...

> #### Add vendor prefixes for semi-old browsers?
>
> autoprefixer

> #### How to make it work on IE
>
> IE11 is the only version of IE that supports flexbox, and it supports an older
> version of the spec, and with quite a few bugs (flexbugs). Many bugs have been
> accounted for in this library, but some cannot be fixed and may need you to
> write your code differently to support it.

---

## [Check out the docs!](docs)

---

(MIT Licence)

# ainsley

> Pragmatic lightweight extensible functional CSS library

[![NPM](https://img.shields.io/npm/v/ainsley.svg)](https://www.npmjs.com/package/ainsley) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

## Install

```bash
npm install --save ainsley
```

## Usage

```tsx
import * as React from 'react'

import MyComponent from 'ainsley'

class Example extends React.Component {
  render () {
    return (
      <MyComponent />
    )
  }
}
```

## License

MIT © [tbjgolden](https://github.com/tbjgolden)
