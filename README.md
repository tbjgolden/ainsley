# Ainsley

Ainsley is a functional CSS framework and library with no compromises.
It is the tiny spiritual successor of Tachyons and Tailwind.

It is comprised of multiple sub-libraries that together make it possible to:
  * have an unmatched developer experience
  * use your existing CSS knowledge
  * use the least possible bytes
  * have total flexibility
  * serialize your framework as tiny JSON

# Impossibly small

Instead of writing a stylesheet in CSS, you write it in a small JavaScript
object, which can be optionally serialized as JSON.

The browser receives this small object and compiles it into CSS. This compresses
it massively.

```none
+==============+ +-------+-----------+------------+
| Base Ainsley | |    JS | JS-to-CSS | Equivalent |
+==============+ | input |  compiler | CSS output |
+----------------+-------+-----------+------------+
| minified bytes |  3520 |      1083 |      28091 |
++---------------+-------+-----------+------------+
 | gzipped bytes |  1478 |       572 |       6406 |
 +---------------+-------+-----------+------------+
 | over the wire | 1478 + 572 = 2050 |       6406 |
 +---------------+-------------------+------------+
  | rel diff (%) |          68% less |  212% more |
  +--------------+-------------------+------------+
```

When added together the number of bytes sent over the wire is less than one
third `(1487+568)/6406 = 32%` of the original number.

# Comparisons to others

All sizes in kB.

Framework   | Original | Minified |      Gzip |    Brotli | CSS Rule Count
------------|---------:|---------:|----------:|----------:|--------------:
**Ainsley** |    `6.2` |    `4.6` | **`2.1`** | **`1.8`** |         `1069`
Tailwind    |  `783.5` |  `603.3` |    `78.0` |    `22.6` |        `14445`
Bootstrap   |  `187.8` |  `152.1` |    `22.7` |    `16.7` |         `2027`
Bulma       |  `224.2` |  `189.9` |    `24.9` |    `19.1` |         `2142`
Foundation  |  `154.1` |  `119.2` |    `15.9` |    `12.9` |         `1420`
Tachyons    |  `111.7` |   `71.8` |    `13.4` |     `7.5` |         `2113`
Semantic UI |  `809.4` |  `613.8` |   `100.6` |    `77.8` |         `5934`
Materialize |  `175.0` |  `138.5` |    `21.1` |    `17.1` |         `1609`

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

# Getting started

### Server

```bash
yarn add ainsley # or `npm install ainsley`
```

```js
// server, only needed if you are going to modify the config
const { extend } = require('ainsley');

// extend is only needed if you want to merge two ainsleys
const ainsley = extend(
  null, // <- null implies base config
  {
    "defs": [
      [
        ".ls&",
        [["list-style", "{listStyleType} {listStylePosition}"]]
      ]
    ],
    "props": [
      ["letter-spacing", ["0", "1px", "2px", "3px"]]
    ],
    "{listStyleType}": {
      "D": "disc",
      "C": "circle",
      "S": "square"
    },
    "{listStylePosition}": {
      "I": "inside",
      "O": "outside"
    }
  }
);

// send custom ainsley to client
```

### Client

```html
// receive ainsley, assuming server-side rendering but any method works
<script src="compiler.lite.js"></script>
<script>document.write("<style>"+Ainsley(/* your ainsley here */)+"</style>")</script>
```

(MIT Licence)
