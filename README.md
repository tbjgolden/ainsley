<!-- DO NOT EDIT DIRECTLY! -->

# Ainsley 👨🏾‍🍳

![npm](https://img.shields.io/npm/v/ainsley) ![Coveralls github branch](https://img.shields.io/coveralls/github/tbjgolden/ainsley/master) ![David](https://img.shields.io/david/tbjgolden/ainsley) ![npm bundle size](https://img.shields.io/bundlephobia/minzip/ainsley) [![GitHub issues](https://img.shields.io/github/issues/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/issues) [![GitHub stars](https://img.shields.io/github/stars/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley/stargazers) [![GitHub license](https://img.shields.io/github/license/tbjgolden/ainsley)](https://github.com/tbjgolden/ainsley)

Ainsley is a functional CSS framework and library with no compromises.
It is the tiny spiritual successor of Tachyons and Tailwind.

It is comprised of multiple sub-libraries that together make it possible to:

- have an unmatched developer experience
- use your existing CSS knowledge
- use the least possible bytes
- have total flexibility
- serialize your framework as tiny, readable JSON

An analogy might be to say that Ainsley is to CSS what Markdown is to HTML.

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
| minified bytes | 4,665 |     1,883 |    744,896 |
++---------------+-------+-----------+------------+
 | gzipped bytes | 2,038 |       919 |    133,465 |
 ++--------------+-------+-----------+------------+
  | brotli bytes | 1,753 |       846 |     22,821 |
  +-+------------+-------+-----------+------------+
    | TOTAL SENT |             2,599 |     22,821 |
    +------------+-------------------+------------+
```

# Comparisons to others

| **Name**      | **Minified** |   **Gzip** | **Brotli** | **CSS Rules** | **Efficiency\*** |  **Load 1** |  **Load 2** | **Load 3** |
| :------------ | -----------: | ---------: | ---------: | ------------: | ---------------: | ----------: | ----------: | ---------: |
| **ainsley**   |   **`6,548`** | **`2,957`** | **`2,599`** |   **`21,729`** |       **`6.08`** | **`4,272`** | **`1,263`** |      `115` |
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

# Getting started

### Server

```bash
yarn add ainsley # or `npm install ainsley`
```

```js
// server, only needed if you are going to modify the config
const { extend, base } = require("ainsley");

// extend is only needed if you want to merge two ainsleys
const ainsley = extend([
  base,
  // your custom ainsley extension
  {
    defs: [[".ls&", [["list-style", "{listStyleType} {listStylePosition}"]]]],
    props: [["letter-spacing", ["0", "1px", "2px", "3px"]]],
    "{listStyleType}": {
      D: "disc",
      C: "circle",
      S: "square"
    },
    "{listStylePosition}": {
      I: "inside",
      O: "outside"
    }
  }
]);

// send your custom ainsley object to client as JS/JSON
// different ways of doing this are covered below in Client
```

### Client

This can be done in many ways! Here's some ideas to start from.

##### Common core concepts

```html
<head>
  <!-- your head html here -->

  <!-- you will want a reset (normalize makes less sense with functional css)
       this project includes one which is suitable for ainsley -->
  <link href="/reset.min.css" rel="stylesheet" type="text/css" />
</head>
<!-- Hide body while loading to prevent flash of unstyled content -->
<body style="display: none">
  <!-- your body html here -->

  <!-- 👨🏾‍🍳 insert ainsley logic here! -->
</body>
```

##### 👨🏾‍🍳 Recipe 1: embed it in script

```html
<script src="/compiler.lite.js"></script>
<script>
  var styleEl = document.createElement("style");
  styleEl.appendChild(
    // your ainsley object goes here
    document.createTextNode(AinsleyToCSS(/*AINSLEY*/))
  );
  document.head.appendChild(styleEl);
  document.body.style.display = "block";
</script>
```

##### 👨🏾‍🍳 Recipe 2: fetch ainsley at runtime

```html
<head>
  <!-- your html here -->

  <link href="/reset.min.css" rel="stylesheet" type="text/css" />
</head>
<body style="display: none">
  <!-- your html here -->

  <script src="/compiler.lite.js"></script>
  <script>
    var req = new XMLHttpRequest();
    req.open("GET", "/ainsley.json");
    req.onreadystatechange = function() {
      if (req.readyState === 4 && req.status === 200) {
        var styleEl = document.createElement("style");
        styleEl.appendChild(
          document.createTextNode(AC(JSON.parse(req.responseText)))
        );
        document.head.appendChild(styleEl);
        document.body.style.display = "block";
      }
    };
    req.send();
  </script>
</body>
```

# All classes are regular

```js
const ainsleyClassRegex = /^((?:[a-z]+-)*)([a-z]+)([A-Z0-9]+)$/;
const [, mods, prop, val] = "<anyAinsleyClass>".match(ainsleyClassRegex);
```

```none
A Complex Example: "s-o-bgcTR"
                ____\__/\_/\/
(optional)     /         \  \
modifier prefixes        /   \
(lowercase then a -)    /     \
                       /       \
          Property abbrev     Value abbrev
         (always lowercase)  (always uppercase or digits)

Meaning:
  "s-" => "[s]mall screens (384px) and bigger"
  "o-" => "[o]n any pseudo class (:hover, :focus or :active)"
  "bgc" => "[b]ack[g]round-[c]olor"
  "TR" => "[tr]ansparent"

Equivalent CSS:
@media (min-width: 384px) {
  .s-o-bgcTR:hover, .s-o-bgcTR:focus, .s-o-bgcTR:active {
    background-color: transparent;
  }
}
```

This makes it easier for both humans and computers to parse them, making them
easier to learn than other utility class libraries and also allow for better
implementation specific generated documentation.

# Irregular property word abbreviations

Property prefixes are the first letters of each (hyphen delimited) word in the
full property. For instance "white-space" becomes "ws", and "color" becomes "c".

With this strategy alone, most abbreviations are unique to the property they
come from, which avoids properties clashing. To fully prevent clashes, some
property words are mapped to irregular abbreviations.

|       Word | Abbreviation | Reason                                                      |
| ---------: | :----------- | :---------------------------------------------------------- |
| background | bg           | "b" = {"border", "background"}                              |
|     cursor | cu           | "c" = {"color", "cursor"}                                   |
|       flex | fx           | "f" = {"float", "flex"}, fw" = {"font-weight", "flex-wrap"} |
|        max | x            | "m" = {"min", "max", "margin"}                              |
|        min | n            | "m" = {"min", "max", "margin"}                              |
|   overflow | ov           | "o" = {"opacity", "overflow"}                               |
|   position | po           | "p" = {"padding", "position"}                               |
|      style | st           | "fs" = {"font-size", "font-style"}                          |

(MIT Licence)
