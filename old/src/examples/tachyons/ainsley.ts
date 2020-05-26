import {
  generate,
  flatten,
  minify,
  AinsleyVariations,
  AinsleyChildren
} from "../../entrypoints/ainsley";

const addToSelector = (selector: string, abbreviation: string): string => {
  let nextAmp = selector.indexOf("&");
  let nextBang = selector.indexOf("!");
  if (nextAmp === -1) nextAmp = Infinity;
  if (nextBang === -1) nextBang = Infinity;
  if (nextAmp < nextBang) {
    return selector.replace("&", abbreviation);
  } else if (nextBang < nextAmp) {
    return selector.replace("!", "");
  } else {
    return selector + abbreviation;
  }
};

export const tachyonsAinsley = async () => {
  const tachyonsAinsley = await getAinsley();
  return generate(tachyonsAinsley, {
    addVariationToSelector: (selector, variationAbbreviation) =>
      variationAbbreviation === "hover"
        ? "hover-" + selector
        : selector + "-" + variationAbbreviation,
    addPropertyToSelector: (selector, propertyAbbreviation) =>
      selector === ""
        ? propertyAbbreviation
        : addToSelector(selector, propertyAbbreviation),
    addValueToSelector: addToSelector,
    abbreviateProperty: (propertyName) => {
      const abbreviation = propertyName.replace(/[^A-Z]/g, "").toLowerCase();
      return [
        abbreviation === "" ? "" : abbreviation + "-",
        propertyName.toLowerCase()
      ];
    }
  });
};

// don't forget to clean up the inconsistent hyphens
const getAinsley = async () => {
  const flatAinsley = await flatten({
    children: [
      "/*! TACHYONS v4.12.0 | http://tachyons.io */",
      "$https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css",
      `
      a, article, aside, blockquote, body, code,
      dd, div, dl, dt,
      fieldset, figcaption, figure, footer, form,
      h1, h2, h3, h4, h5, h6,
      header, html,
      input[type="email"],
      input[type="number"],
      input[type="password"],
      input[type="tel"],
      input[type="text"],
      input[type="url"],
      legend, li, main, nav, ol, p, pre, section,
      table, td, textarea, th, tr, ul, .border-box {
        box-sizing: border-box;
      }
      img {
        max-width: 100%;
      }
      .nested-copy-line-height p, .nested-copy-line-height ul,
      .nested-copy-line-height ol { line-height: 1.5; }
      .nested-headline-line-height h1, .nested-headline-line-height h2,
      .nested-headline-line-height h3, .nested-headline-line-height h4,
      .nested-headline-line-height h5, .nested-headline-line-height h6 { line-height: 1.25; }
      .nested-list-reset ul, .nested-list-reset ol { padding-left: 0; margin-left: 0; list-style-type: none; }
      .nested-copy-indent p+p { text-indent: 1em; margin-top: 0; margin-bottom: 0; }
      .nested-copy-separator p+p { margin-top: 1.5em; }
      .nested-img img { width: 100%; max-width: 100%; display: block; }
      .nested-links a { color: #357edd; transition: color .15s ease-in; }
      .nested-links a:hover { color: #96ccff; transition: color .15s ease-in; }
      .nested-links a:focus { color: #96ccff; transition: color .15s ease-in; }
      `,
      [
        "pre",
        [
          ["overflow-x", "auto"],
          ["overflow-y", "hidden"],
          ["overflow", "scroll"]
        ]
      ],
      {
        variations: [
          [
            ["hover", ":hover"],
            ["hover", ":focus"]
          ],
          [
            ["ns", "@media screen and (min-width: 30em)"],
            ["m", "@media screen and (min-width: 30em) and (max-width: 60em)"],
            ["l", "@media screen and (min-width: 60em)"]
          ]
        ] as AinsleyVariations,
        variables: {
          color: {
            black: "#000",
            "near-black": "#111",
            "dark-gray": "#333",
            "mid-gray": "#555",
            gray: "#777",
            silver: "#999",
            "light-silver": "#aaa",
            "moon-gray": "#ccc",
            "light-gray": "#eee",
            "near-white": "#f4f4f4",
            white: "#fff",
            "white-90": "rgba(255,255,255,.9)",
            "white-80": "rgba(255,255,255,.8)",
            "white-70": "rgba(255,255,255,.7)",
            "white-60": "rgba(255,255,255,.6)",
            "white-50": "rgba(255,255,255,.5)",
            "white-40": "rgba(255,255,255,.4)",
            "white-30": "rgba(255,255,255,.3)",
            "white-20": "rgba(255,255,255,.2)",
            "white-10": "rgba(255,255,255,.1)",
            "white-05": "rgba(255,255,255,.05)",
            "white-025": "rgba(255,255,255,.025)",
            "white-0125": "rgba(255,255,255,.0125)",
            "black-90": "rgba(0,0,0,.9)",
            "black-80": "rgba(0,0,0,.8)",
            "black-70": "rgba(0,0,0,.7)",
            "black-60": "rgba(0,0,0,.6)",
            "black-50": "rgba(0,0,0,.5)",
            "black-40": "rgba(0,0,0,.4)",
            "black-30": "rgba(0,0,0,.3)",
            "black-20": "rgba(0,0,0,.2)",
            "black-10": "rgba(0,0,0,.1)",
            "black-05": "rgba(0,0,0,.05)",
            "black-025": "rgba(0,0,0,.025)",
            "black-0125": "rgba(0,0,0,.0125)",
            "dark-red": "#e7040f",
            red: "#ff4136",
            "light-red": "#ff725c",
            orange: "#ff6300",
            gold: "#ffb700",
            yellow: "#ffd700",
            "light-yellow": "#fbf1a9",
            purple: "#5e2ca5",
            "light-purple": "#a463f2",
            "dark-pink": "#d5008f",
            "hot-pink": "#ff41b4",
            pink: "#ff80cc",
            "light-pink": "#ffa3d7",
            "dark-green": "#137752",
            green: "#19a974",
            "light-green": "#9eebcf",
            navy: "#001b44",
            "dark-blue": "#00449e",
            blue: "#357edd",
            "light-blue": "#96ccff",
            "lightest-blue": "#cdecff",
            "washed-blue": "#f6fffe",
            "washed-green": "#e8fdf5",
            "washed-yellow": "#fffceb",
            "washed-red": "#ffdfdf",
            transparent: "transparent",
            inherit: "inherit",
            initial: "initial",
            unset: "unset"
          },
          aspectRatio: {
            "16x9": "56.25%",
            "9x16": "177.77%",
            "4x3": "75%",
            "3x4": "133.33%",
            "6x4": "66.6%",
            "4x6": "150%",
            "8x5": "62.5%",
            "5x8": "160%",
            "7x5": "71.42%",
            "5x7": "140%",
            "1x1": "100%"
          },
          placement: {
            top: "top",
            left: "left",
            right: "right",
            bottom: "bottom",
            center: "center"
          },
          direction: {
            top: "top",
            left: "left",
            right: "right",
            bottom: "bottom"
          },
          directionAbbrev: {
            t: "top",
            r: "right",
            b: "bottom",
            l: "left"
          },
          directionScale: {
            "0": "0",
            "1": "1rem",
            "2": "2rem",
            "-1": "-1rem",
            "-2": "-2rem"
          },
          outline: {
            "": "1px solid",
            "-transparent": "1px solid transparent",
            "-0": "0"
          },
          brScale: {
            "0": " 0",
            "1": ".125rem",
            "2": ".25rem",
            "3": ".5rem",
            "4": " 1rem",
            "-100": " 100%",
            "-pill": " 9999px",
            "-inherit": " inherit",
            "-initial": " initial",
            "-unset": " unset"
          },
          borderStyle: {
            dotted: "dotted",
            dashed: "dashed",
            solid: "solid",
            none: "none"
          },
          borderWidth: {
            "0": "0",
            "1": ".125rem",
            "2": ".25rem",
            "3": ".5rem",
            "4": "1rem",
            "5": "2rem"
          },
          shadow: {
            "1": "0 0 4px 2px",
            "2": "0 0 8px 2px",
            "3": "2px 2px 4px 2px",
            "4": "2px 2px 8px 0",
            "5": "4px 4px 8px 0"
          },
          scale: {
            "0": "0",
            "1": ".25rem",
            "2": ".5rem",
            "3": "1rem",
            "4": "2rem",
            "5": "4rem",
            "6": "8rem",
            "7": "16rem",
            "8": "32rem",
            "9": "64rem",
            "-1": "-.25rem",
            "-2": "-.5rem",
            auto: "auto",
            inherit: "inherit"
          },
          float: {
            l: "left",
            r: "right",
            n: "none"
          },
          textAlign: {
            l: "left",
            r: "right",
            c: "center",
            j: "justify"
          },
          textTransform: {
            c: "capitalize",
            l: "lowercase",
            u: "uppercase",
            n: "none"
          },
          fontWeight: {
            "1": 100,
            "2": 200,
            "3": 300,
            "4": 400,
            "5": 500,
            "6": 600,
            "7": 700,
            "8": 800,
            "9": 900
          },
          widthAndHeightScale: {
            "0": "0",
            "1": "1rem",
            "2": "2rem",
            "3": "4rem",
            "4": "8rem",
            "5": "16rem",
            "-auto": "auto",
            "-inherit": "inherit"
          },
          maxWidthScale: {
            "1": "1rem",
            "2": "2rem",
            "3": "4rem",
            "4": "8rem",
            "5": "16rem",
            "6": "32rem",
            "7": "48rem",
            "8": "64rem",
            "9": "96rem"
          },
          display: {
            n: "none",
            b: "block",
            i: "inline",
            ib: "inline-block",
            it: "inline-table",
            t: "table",
            tc: "table-cell",
            "t-row": "table-row",
            "t-row-group": "table-row-group",
            "t-column": "table-column",
            "t-column-group": "table-column-group"
          },
          fontSize: {
            "-6": "6rem",
            "-headline": "6rem",
            "-5": "5rem",
            "-subheadline": "5rem",
            "1": "3rem",
            "2": "2.25rem",
            "3": "1.5rem",
            "4": "1.25rem",
            "5": "1rem",
            "6": ".875rem",
            "7": ".75rem"
          },
          flexChange: {
            "0": 0,
            "1": 1
          },
          clear: {
            l: "left",
            r: "right",
            b: "both",
            n: "none"
          },
          percentage: {
            "0": 0,
            "025": 2.5,
            "05": 5,
            "10": 10,
            "20": 20,
            "25": 25,
            "30": 30,
            "33": 33,
            "34": 34,
            "40": 40,
            "50": 50,
            "60": 60,
            "66": 66,
            "67": 67,
            "70": 70,
            "75": 75,
            "80": 80,
            "90": 90,
            "100": 100,
            third: 33.33333,
            "two-thirds": 66.66667
          },
          opacity: {
            "0": 0,
            "025": 0.025,
            "05": 0.05,
            "10": 0.1,
            "20": 0.2,
            "30": 0.3,
            "40": 0.4,
            "50": 0.5,
            "60": 0.6,
            "70": 0.7,
            "80": 0.8,
            "90": 0.9,
            "100": 1
          },
          tracking: {
            "": ".1em",
            "-tight": "-.05em",
            "-mega": ".25em"
          },
          lineHeight: {
            solid: 1,
            title: 1.25,
            copy: 1.5
          },
          overflow: {
            visible: "visible",
            hidden: "hidden",
            scroll: "scroll",
            auto: "auto"
          },
          position: {
            static: "static",
            relative: "relative",
            absolute: "absolute",
            fixed: "fixed"
          },
          rotate: {
            "45": 45,
            "90": 90,
            "135": 135,
            "180": 180,
            "225": 225,
            "270": 270,
            "315": 315
          },
          measure: {
            "": "30em",
            "-wide": "34em",
            "-narrow": "20em"
          },
          spacing: {
            m: "margin",
            p: "padding"
          },
          textDecoration: {
            strike: "line-through",
            underline: "underline",
            "no-underline": "none"
          }
        },
        children: [
          [
            "aspect-ratio",
            [
              ["height", "0"],
              ["position", "relative"]
            ]
          ],
          [
            "aspect-ratio--object",
            [
              ["position", "absolute"],
              ["top", 0],
              ["right", 0],
              ["bottom", 0],
              ["left", 0],
              ["width", "100%"],
              ["height", "100%"],
              ["z-index", 100]
            ]
          ],
          ["aspect-ratio--", [["padding-bottom", "{aspectRatio}"]]],
          [
            "background-size",
            {
              cover: "cover",
              contain: "contain"
            }
          ],
          [
            "bg-",
            [
              ["background-position", "{placement}"],
              ["background-repeat", "no-repeat"]
            ]
          ],
          ["outline", [["outline", "{outline}"]]],
          [
            "ba",
            [
              ["border-style", "solid"],
              ["border-width", "1px"]
            ]
          ],
          ["b", [["border-{directionAbbrev}-style", "solid"]]],
          ["b", [["border-{directionAbbrev}-width", "1px"]]],
          [
            "bn",
            [
              ["border-style", "none"],
              ["border-width", "0"]
            ]
          ],
          ["b--", [["border-color", "{color}"]]],
          ["br", [["border-radius", "{brScale}"]]],
          [
            "br--bottom",
            [
              ["border-top-left-radius", 0],
              ["border-top-right-radius", 0]
            ]
          ],
          [
            "br--top",
            [
              ["border-bottom-left-radius", 0],
              ["border-bottom-right-radius", 0]
            ]
          ],
          [
            "br--right",
            [
              ["border-top-left-radius", 0],
              ["border-bottom-left-radius", 0]
            ]
          ],
          [
            "br--left",
            [
              ["border-top-right-radius", 0],
              ["border-bottom-right-radius", 0]
            ]
          ],
          ["b--", [["border-style", "{borderStyle}"]]],
          ["bw", [["border-width", "{borderWidth}"]]],
          ["b&-0", [["border-{directionAbbrev}-width", "0"]]],
          ["shadow-", [["box-shadow", "{shadow} rgba(0,0,0,.2)"]]],
          ["pre", [["white-space", "pre"]]],
          ["&-", [["{direction}", "{directionScale}"]]],
          ["absolute--fill!", [["{direction}", "0"]]],
          `
          /* http://nicolasgallagher.com/micro-clearfix-hack/ */
          .cf:before, .cf:after { content: " "; display: table; }
          .cf:after { clear: both; }
          .cf { *zoom: 1; }
          `,
          ["c", [["clear", "{clear}"]]],
          ["d", [["display", "{display}"]]],
          [
            "dt--fixed",
            [
              ["table-layout", "fixed"],
              ["width", "100%"]
            ]
          ],
          ["flex", [["display", "flex"]]],
          ["inline-flex", [["display", "inline-flex"]]],
          ["flex-auto", [["flex", "1 1 auto"]]],
          ["flex-none", [["flex", "none"]]],
          [
            "FLEX-direction",
            {
              column: "column",
              row: "row",
              "column-reverse": "column-reverse",
              "row-reverse": "row-reverse"
            }
          ],
          [
            "FLEX-wrap",
            {
              wrap: "wrap",
              nowrap: "nowrap",
              "wrap-reverse": "wrap-reverse"
            }
          ],
          [
            "align-ITEMS",
            {
              start: "flex-start",
              end: "flex-end",
              center: "center",
              baseline: "baseline",
              stretch: "stretch"
            }
          ],
          [
            "align-SELF",
            {
              start: "flex-start",
              end: "flex-end",
              center: "center",
              baseline: "baseline",
              stretch: "stretch"
            }
          ],
          [
            "JUSTIFY-content",
            {
              start: "flex-start",
              end: "flex-end",
              center: "center",
              between: "space-between",
              around: "space-around"
            }
          ],
          [
            "align-CONTENT",
            {
              start: "flex-start",
              end: "flex-end",
              center: "center",
              between: "space-between",
              around: "space-around",
              stretch: "stretch"
            }
          ],
          [
            "ORDER",
            {
              "0": "0",
              "1": "1",
              "2": "2",
              "3": "3",
              "4": "4",
              "5": "5",
              "6": "6",
              "7": "7",
              "8": "8",
              last: "99999"
            }
          ],
          ["flex-grow-", [["flex-grow", "{flexChange}"]]],
          ["flex-shrink-", [["flex-shrink", "{flexChange}"]]],
          ["f", [["float", "{float}"]]],
          `
          .sans-serif { font-family: -apple-system, BlinkMacSystemFont, 'avenir next', avenir, 'helvetica neue', helvetica, ubuntu, roboto, noto, 'segoe ui', arial, sans-serif; }
          .serif { font-family: georgia, times, serif; }
          .system-sans-serif { font-family: sans-serif; }
          .system-serif { font-family: serif; }
          code, .code { font-family: Consolas, monaco, monospace; }
          .courier { font-family: 'Courier Next', courier, monospace; }
          .helvetica { font-family: 'helvetica neue', helvetica, sans-serif; }
          .avenir { font-family: 'avenir next', avenir, sans-serif; }
          .athelas { font-family: athelas, georgia, serif; }
          .georgia { font-family: georgia, serif; }
          .times { font-family: times, serif; }
          .bodoni { font-family: "Bodoni MT", serif; }
          .calisto { font-family: "Calisto MT", serif; }
          .garamond { font-family: garamond, serif; }
          .baskerville { font-family: baskerville, serif; }
          `,
          ["i", [["font-style", "italic"]]],
          ["fs-normal", [["font-style", "normal"]]],
          ["normal", [["font-weight", "normal"]]],
          ["b", [["font-weight", "bold"]]],
          ["fw", [["font-weight", "{fontWeight}"]]],
          `
          .input-reset { -webkit-appearance: none; -moz-appearance: none; }
          .button-reset::-moz-focus-inner, .input-reset::-moz-focus-inner { border: 0; padding: 0; }
          `,
          ["h", [["height", "{widthAndHeightScale}"]]],
          ["h-", [["height", "{percentage}%"]]],
          ["min-h-100", [["min-height", "100%"]]],
          ["vh-", [["height", "{percentage}vh"]]],
          ["min-vh-100", [["min-height", "100vh"]]],
          ["tracked", [["letter-spacing", "{tracking}"]]],
          ["lh-", [["line-height", "{lineHeight}"]]],
          `
          .link { text-decoration: none; transition: color .15s ease-in; }
          .link:link, .link:visited { transition: color .15s ease-in; }
          .link:hover { transition: color .15s ease-in; }
          .link:active { transition: color .15s ease-in; }
          .link:focus { transition: color .15s ease-in; outline: 1px dotted currentColor; }
          .list { list-style-type: none; }
          `,
          ["mw-", [["max-width", "{percentage}%"]]],
          ["mw", [["max-width", "{maxWidthScale}"]]],
          ["mw-none", [["max-width", "none"]]],
          ["w", [["width", "{widthAndHeightScale}"]]],
          ["w-", [["width", "{percentage}%"]]],
          ["overflow-", [["overflow", "{overflow}"]]],
          ["overflow-x-", [["overflow-x", "{overflow}"]]],
          ["overflow-y-", [["overflow-y", "{overflow}"]]],
          ["", [["position", "{position}"]]],
          ["o-", [["opacity", "{opacity}"]]],
          ["rotate-", [["transform", "rotate({rotate}deg)"]]],
          ["", [["color", "{color}"]]],
          ["color-inherit", [["color", "inherit"]]],
          ["bg-", [["background-color", "{color}"]]],
          ["bg-inherit", [["background-color", "inherit"]]],
          ["&a", [["{spacing}", "{scale}"]]],
          ["&h", [["{spacing}-left", "{scale}"]]],
          ["&h", [["{spacing}-right", "{scale}"]]],
          ["&v", [["{spacing}-top", "{scale}"]]],
          ["&v", [["{spacing}-bottom", "{scale}"]]],
          ["", [["{spacing}-{directionAbbrev}", "{scale}"]]],
          ["na", [["margin", "-{scale}"]]],
          ["n", [["margin-{directionAbbrev}", "-{scale}"]]],
          `
          .collapse { border-collapse: collapse; border-spacing: 0; }
          .striped--light-silver:nth-child(odd) { background-color: #aaa; }
          .striped--moon-gray:nth-child(odd) { background-color: #ccc; }
          .striped--light-gray:nth-child(odd) { background-color: #eee; }
          .striped--near-white:nth-child(odd) { background-color: #f4f4f4; }
          .stripe-light:nth-child(odd) { background-color: rgba( 255, 255, 255, .1 ); }
          .stripe-dark:nth-child(odd) { background-color: rgba( 0, 0, 0, .1 ); }
          `,
          ["", [["text-decoration", "{textDecoration}"]]],
          `
          .strike { text-decoration: line-through; }
          .underline { text-decoration: underline; }
          .no-underline { text-decoration: none; }
          `,
          ["t", [["text-align", "{textAlign}"]]],
          ["tt", [["text-transform", "{textTransform}"]]],
          ["f", [["font-size", "{fontSize}"]]],
          ["measure", [["max-width", "{measure}"]]],
          [
            "indent",
            [
              ["text-indent", "1em"],
              ["margin-top", "0"],
              ["margin-bottom", "0"]
            ]
          ],
          ["small-caps", [["font-variant", "small-caps"]]],
          [
            "truncate",
            [
              ["white-space", "nowrap"],
              ["overflow", "hidden"],
              ["text-overflow", "ellipsis"]
            ]
          ],
          ["overflow-container", [["overflow-y", "scroll"]]],
          [
            "center",
            [
              ["margin-right", "auto"],
              ["margin-left", "auto"]
            ]
          ],
          ["mr-auto", [["margin-right", "auto"]]],
          ["ml-auto", [["margin-left", "auto"]]],
          [
            "clip",
            [
              ["position", "fixed !important"],
              ["clip", "rect(1px,1px,1px,1px)"],
              ["clip", "rect(1px 1px 1px 1px)"]
            ]
          ],
          ["ws-normal", [["white-space", "normal"]]],
          ["nowrap", [["white-space", "nowrap"]]],
          ["pre", [["white-space", "pre"]]],
          [
            "Vertical-align",
            {
              base: "baseline",
              mid: "middle",
              top: "top",
              btm: "bottom"
            }
          ],
          `
          .dim { opacity: 1; transition: opacity .15s ease-in; }
          .dim:hover, .dim:focus { opacity: .5; transition: opacity .15s ease-in; }
          .dim:active { opacity: .8; transition: opacity .15s ease-out; }
          .glow { transition: opacity .15s ease-in; }
          .glow:hover, .glow:focus { opacity: 1; transition: opacity .15s ease-in; }
          .hide-child .child { opacity: 0; transition: opacity .15s ease-in; }
          .hide-child:hover  .child, .hide-child:focus  .child, .hide-child:active .child { opacity: 1; transition: opacity .15s ease-in; }
          .underline-hover:hover, .underline-hover:focus { text-decoration: underline; }
          .grow { transform: translateZ(0); transition: transform .25s ease-out; }
          .grow:hover, .grow:focus { transform: scale(1.05); }
          .grow:active { transform: scale(.90); }
          .grow-large { transform: translateZ(0); transition: transform .25s ease-in-out; }
          .grow-large:hover, .grow-large:focus { transform: scale(1.2); }
          .grow-large:active { transform: scale(.95); }
          .pointer { cursor: pointer; }
          .shadow-hover { cursor: pointer; position: relative; transition: all .5s cubic-bezier( .165, .84, .44, 1 ); }
          .shadow-hover::after { content: ''; box-shadow: 0 0 16px 2px rgba( 0, 0, 0, .2 ); border-radius: inherit; opacity: 0; position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: -1; transition: opacity .5s cubic-bezier( .165, .84, .44, 1 ); }
          .shadow-hover:hover::after, .shadow-hover:focus::after { opacity: 1; }
          .bg-animate { transition: background-color .15s ease-in-out; }
          .bg-animate:focus { transition: background-color .15s ease-in-out; }
          .bg-animate:hover { transition: background-color .15s ease-in-out; }
          `,
          [
            "Z-index",
            {
              "0": 0,
              "1": 1,
              "2": 2,
              "3": 3,
              "4": 4,
              "5": 5,
              "999": 999,
              "9999": 9999,
              max: 2147483647,
              inherit: "inherit",
              initial: "initial",
              unset: "unset"
            }
          ]
        ] as AinsleyChildren
      }
    ]
  });
  return minify(flatAinsley);
};
