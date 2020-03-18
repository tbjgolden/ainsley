<!-- DO NOT EDIT DIRECTLY! -->

# Ainsley

Ainsley is a functional CSS framework and library with no compromises.
It is the tiny spiritual successor of Tachyons and Tailwind.

It is comprised of multiple sub-libraries that together make it possible to:

- have an unmatched developer experience
- use your existing CSS knowledge
- use the least possible bytes
- have total flexibility
- serialize your framework as tiny JSON

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
| minified bytes | 4,072 |     1,670 |    761,941 |
++---------------+-------+-----------+------------+
 | gzipped bytes | 1,591 |       823 |    137,658 |
 ++--------------+-------+-----------+------------+
  | brotli bytes | 1,353 |       750 |     23,161 |
  +-+------------+-------+-----------+------------+
    | TOTAL SENT |             2,103 |     23,161 |
    +------------+-------------------+------------+
```

When added together the number of bytes sent over the wire is less than one
third `(1487+568)/6406 = 32%` of the original number.

# Comparisons to others

| **Libraries** | **Minified** |   **Gzip** | **Brotli** | **CSS Rules** | **Efficiency\*** |  **Load 1** |  **Load 2** | **Load 3** |
| ------------- | -----------: | ---------: | ---------: | ------------: | ---------------: | ----------: | ----------: | ---------: |
| **ainsley**   |   **`5,742`** | **`2,414`** | **`2,103`** |   **`22,580`** |     **`10.74`** | **`4,272`** | **`1,263`** |      `115` |
| tailwindcss   |    `710,997` |   `97,417` |   `10,199` |      `14,445` |           `1.42` |    `18,031` |     `5,075` |      `183` |
| tachyons      |     `73,497` |   `13,697` |    `2,421` |       `2,113` |           `0.87` |     `5,606` |     `1,621` |   **`71`** |
| sane-tachyons |     `49,793` |    `9,200` |    `1,957` |       `1,278` |           `0.65` |     `5,345` |     `1,552` |       `75` |
| turretcss     |     `93,542` |   `17,025` |    `4,311` |       `1,588` |           `0.36` |           - |           - |          - |
| solid         |     `82,482` |   `12,585` |    `2,497` |       `1,469` |           `0.58` |           - |           - |          - |
| basscss       |     `11,326` |    `2,477` |      `589` |         `260` |           `0.44` |           - |           - |          - |
| bootstrap     |    `159,515` |   `23,681` |    `4,762` |       `2,027` |           `0.43` |           - |           - |          - |
| bulma         |    `194,420` |   `25,511` |    `5,705` |       `2,142` |           `0.38` |           - |           - |          - |
| materialize   |    `141,841` |   `21,558` |    `5,579` |       `1,609` |           `0.29` |           - |           - |          - |
| spectre       |     `45,964` |    `9,631` |    `1,992` |         `638` |           `0.32` |           - |           - |          - |
| foundation    |    `132,474` |   `17,219` |    `3,471` |       `1,420` |           `0.41` |           - |           - |          - |
| milligram     |      `8,718` |    `2,295` |      `442` |          `90` |           `0.20` |           - |           - |          - |
| skeleton      |      `5,879` |    `1,630` |      `356` |          `84` |           `0.24` |           - |           - |          - |

> \* Efficiency is measured as CSS Rules per byte
>
> \*\* these frameworks cannot produce a similar result
>
> Load times are measured milliseconds to first contentful paint using an example html file.
> The test server and browser both use brotli compression.
>
> - Load Test 1: Chrome, Low-end mobile, Slow 3G, 360x640
> - Load Test 2: Chrome, Mid-tier mobile, Fast 3G, 414x736
> - Load Test 3: Chrome, \$3k MacBook Pro, South Korea speed, full resolution

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
const ainsley = extend(
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
);

// send your custom ainsley object to client as JS/JSON
// different ways of doing this are covered below in Client
```

### Client

This can be done in many ways! Here's some ideas to start from.

##### Idea 1: async script and callback + server/build-time rendering json

```html
<head>
  <!-- your html here -->

  <link href="/reset.min.css" rel="stylesheet" type="text/css" />
  <script>
    // receive ainsley object, assuming here that /*AINSLEY*/ is replaced by json
    var ainsley = /*AINSLEY*/;

    // this callback function exists to allow the script to be loaded with async
    function ACCB(ac) {
      var styleEl = document.createElement('style');
      styleEl.appendChild(document.createTextNode(ac(ainsley)));
      document.head.appendChild(styleEl);
      document.body.style.display = 'block';
    }
  </script>
  <script async="async" src="/compiler.lite.js"></script>
</head>
<!-- Hide body while loading to prevent flash of unstyled content -->
<body style="display: none">
  <!-- your html here -->
</body>
```

##### Idea 2: fetch ainsley at runtime and run it using normal script

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
    req.open('GET', '/ainsley.json');
    req.onreadystatechange = function () {
      if (req.readyState === 4 && req.status === 200) {
        var styleEl = document.createElement('style');
        styleEl.appendChild(document.createTextNode(AC(JSON.parse(req.responseText))));
        document.head.appendChild(styleEl);
        document.body.style.display = 'block';
      }
    };
    req.send();
  </script>
</body>
```

# All classes are regular

```js
const ainsleyClassRegex = /^((?:[a-z]+-)*)([a-z]+)([A-Z0-9]+)$/;
const [mods, prop, val] = "<anyAinsleyClass>".match(ainsleyClassRegex);
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

|       Word | Abbreviation | Reason                              |
| ---------: | :----------- | :---------------------------------- |
| background | bg           | "b" = {"border", "background"}      |
|     cursor | cu           | "c" = {"color", "cursor"}           |
|       flex | fx           | "fw" = {"font-weight", "flex-wrap"} |
|     margin | ma           | "m" = {"min", "max", "margin"}      |
|        max | x            | "m" = {"min", "max", "margin"}      |
|        min | n            | "m" = {"min", "max", "margin"}      |
|   overflow | ov           | "o" = {"opacity", "overflow"}       |
|    padding | pa           | "p" = {"position", "padding"}       |
|      style | st           | "fs" = {"font-size", "font-style"}  |

# Full base ainsley

```js
{
  defs: [
    ["c&", [["color", "{colors}"]]],
    ["d&", [["display", "{display}"]]],
    ["bgc&", [["background-color", "{colors}"]]],
    [
      "fs&",
      [
        ["font-size", "{typeScale}"],
        ["line-height", "1.2"]
      ]
    ],
    ["&&", [["{scalar}", "{scale}"]]],
    ["&a&", [["{vector}", "{scale}"]]],
    ["&&&", [["{vector}-{direction}", "{scale}"]]],
    ["m&N&", [["margin-{direction}", "-{scale}"]]],
    ["fw&", [["font-weight", "{weight}"]]],
    ["ws&", [["white-space", "{whiteSpace}"]]],
    ["bgp&&", [["background-position", "{xLoc} {yLoc}"]]],
    ["bgs&", [["background-size", "{bgSize}"]]],
    ["b&w&", [["border-{direction}-width", "{scale}"]]],
    ["b&c&", [["border-{direction}-color", "{colors}"]]],
    ["fx&&&", [["flex", "{flexChange} {flexChange} {flexBasis}"]]],
    ["fxd&", [["flex-direction", "{flexDirection}"]]],
    ["&&", [["{flexCrossAxes}", "{flexCrossAxis}"]]],
    ["jc&", [["justify-content", "{flexMainAxis}"]]],
    ["ov&&", [["overflow", "{overflow} {overflow}"]]],
    ["o&", [["opacity", "{opacity}"]]]
  ],
  props: [
    ["text-decoration", ["line-through", "underline", "none"]],
    ["font-style", ["italic", "normal"]],
    ["text-transform", ["uppercase", "lowercase"]],
    ["overflow-wrap", ["break-word", "anywhere", "normal"]],
    ["background-repeat", ["repeat", "no-repeat"]],
    ["position", ["relative", "absolute", "fixed", "sticky"]],
    ["text-align", ["left", "center", "right", "justify"]],
    ["vertical-align", ["top", "middle", "bottom"]],
    ["cursor", ["default", "pointer"]],
    ["pointer-events", ["none", "all"]]
  ],
  mods: [
    [
      ["o-", ":hover"],
      ["o-", ":focus"],
      ["o-", ":active"]
    ],
    [
      ["s-", "@media(min-width:384px)"],
      ["m-", "@media(min-width:768px)"],
      ["l-", "@media(min-width:1024px)"],
      ["x-", "@media(min-width:1536px)"]
    ]
  ],
  "{display}": {
    I: "inline",
    B: "block",
    IB: "inline-block",
    F: "flex",
    IF: "inline-flex",
    N: "none"
  },
  "{z}": {
    "0": "0",
    "1": "1",
    "2": "2",
    "4": "4",
    "8": "8",
    "16": "16",
    "32": "32",
    N1: "-1"
  },
  "{opacity}": {
    "0": "0",
    "10": "10",
    "20": "20",
    "40": "40",
    "80": "80",
    "100": "100"
  },
  "{overflow}": { H: "hidden", S: "scroll", A: "auto", V: "visible" },
  "{flexMainAxis}": {
    FS: "flex-start",
    FE: "flex-end",
    C: "center",
    SB: "space-between",
    SE: "space-evenly"
  },
  "{flexCrossAxes}": {
    ai: "align-items",
    as: "align-self",
    ac: "align-content"
  },
  "{flexCrossAxis}": {
    FS: "flex-start",
    FE: "flex-end",
    C: "center",
    B: "baseline",
    S: "stretch"
  },
  "{flexChange}": { "0": "0", "1": "1", "2": "2", X: "11111111" },
  "{flexBasis}": { "0": "0%", A: "auto", P: "100%" },
  "{flexDirection}": {
    R: "row",
    C: "column",
    RR: "row-reverse",
    CR: "column-reverse"
  },
  "{whiteSpace}": {
    C: "nowrap",
    CW: "normal",
    P: "pre",
    PW: "pre-wrap"
  },
  "{weight}": { N: 400, M: 600, B: 700 },
  "{lineHeight}": { B: 1, T: 1.2, C: 1.3 },
  "{xLoc}": { L: "left", R: "right", C: "center" },
  "{bgSize}": { CV: "cover", CT: "contain" },
  "{yLoc}": { T: "top", B: "bottom", C: "center" },
  "{colors}": {
    W: "white",
    B: "black",
    TR: "transparent",
    G98: "hsl(0,0%,98%)",
    G94: "hsl(0,0%,94%)",
    G88: "hsl(0,0%,88%)",
    G80: "hsl(0,0%,80%)",
    G30: "hsl(0,0%,30%)",
    G20: "hsl(0,0%,20%)",
    G10: "hsl(0,0%,10%)",
    B05: "hsla(0,0%,0%,05%)",
    B10: "hsla(0,0%,0%,10%)",
    B20: "hsla(0,0%,0%,20%)",
    B40: "hsla(0,0%,0%,40%)",
    B80: "hsla(0,0%,0%,80%)",
    W05: "hsla(0,0%,100%,05%)",
    W10: "hsla(0,0%,100%,10%)",
    W20: "hsla(0,0%,100%,20%)",
    W40: "hsla(0,0%,100%,40%)",
    W80: "hsla(0,0%,100%,80%)",
    PRIMARY: "#8d1d90",
    ALTPRIMARY: "#9d3ea0",
    SECONDARY: "#b7de58",
    ALTSECONDARY: "#c1e270",
    GOOD: "#3bb273",
    LIGHTGOOD: "#ebf7f1",
    WARN: "#e1bc29",
    LIGHTWARN: "#fcf8e9",
    BAD: "#e15554",
    LIGHTBAD: "#fceeed",
    MSG: "#3d70b2",
    LIGHTMSG: "#ebf0f7"
  },
  "{typeScale}": {
    H1: "72px",
    H2: "48px",
    H3: "32px",
    H4: "24px",
    H5: "20px",
    LG: "20px",
    MD: "16px",
    SM: "14px",
    XS: "12px"
  },
  "{scalar}": {
    w: "width",
    xw: "max-width",
    nw: "min-width",
    h: "height",
    xh: "max-height",
    nh: "min-height",
    t: "top",
    l: "left",
    r: "right",
    b: "bottom",
    br: "border-radius"
  },
  "{vector}": { m: "margin", p: "padding" },
  "{direction}": { t: "top", l: "left", r: "right", b: "bottom" },
  "{scale}": {
    "0": "0",
    "1": "1px",
    "2": "2px",
    "3": "3px",
    "10": "4px",
    "15": "6px",
    "20": "8px",
    "25": "12px",
    "30": "16px",
    "35": "24px",
    "40": "32px",
    "45": "48px",
    "50": "64px",
    "55": "96px",
    "60": "128px",
    "65": "192px",
    "70": "256px",
    "75": "384px",
    "80": "512px",
    "85": "768px",
    "90": "1024px",
    "95": "1536px",
    P50: "50%",
    P: "100%",
    H: "100vh",
    W: "100vw",
    X: "11111111px"
  }
}
```

(MIT Licence)
