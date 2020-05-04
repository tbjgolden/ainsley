import { Ainsley } from "../types";
import { generate } from "./generate";

const basicInput: Ainsley = {
  variations: [
    [
      ["s", "@media(min-width:384px)"],
      ["m", "@media(min-width:768px)"]
    ]
  ],
  variables: {
    length: {
      0: 0,
      1: "1px"
    },
    colors: {
      b: "black",
      w: "white",
      p: "#313375",
      s: "#b4d455"
    }
  },
  children: [
    "*{box-sizing:border-box}",
    ["c", [["color", "{colors}"]]],
    "*{outline-offset:0}",
    ["b", [["border", "{length} solid {colors}"]]],
    ".h1{font-size:69px}body{margin:0}",
    [
      "Display",
      {
        n: "none",
        b: "block"
      }
    ],
    {
      variables: {
        "+colors": {
          t: "#aabbcc"
        }
      },
      children: [["bc", [["background-color", "{colors}"]]]]
    }
  ]
};

describe("compiler", () => {
  test("compiles ainsley as expected", () => {
    expect(generate(basicInput)).toEqual(
      "*{box-sizing:border-box}.cB{color:black}.cW{color:white}.cP{color:#313375}.cS{color:#b4d455}*{outline-offset:0}.b0B{border:0 solid black}.b1B{border:1px solid black}.b0W{border:0 solid white}.b1W{border:1px solid white}.b0P{border:0 solid #313375}.b1P{border:1px solid #313375}.b0S{border:0 solid #b4d455}.b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.dN{display:none}.dB{display:block}.bcB{background-color:black}.bcW{background-color:white}.bcP{background-color:#313375}.bcS{background-color:#b4d455}.bcT{background-color:#aabbcc}@media(min-width:384px){*{box-sizing:border-box}.s-cB{color:black}.s-cW{color:white}.s-cP{color:#313375}.s-cS{color:#b4d455}*{outline-offset:0}.s-b0B{border:0 solid black}.s-b1B{border:1px solid black}.s-b0W{border:0 solid white}.s-b1W{border:1px solid white}.s-b0P{border:0 solid #313375}.s-b1P{border:1px solid #313375}.s-b0S{border:0 solid #b4d455}.s-b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.s-dN{display:none}.s-dB{display:block}.s-bcB{background-color:black}.s-bcW{background-color:white}.s-bcP{background-color:#313375}.s-bcS{background-color:#b4d455}.s-bcT{background-color:#aabbcc}}@media(min-width:768px){*{box-sizing:border-box}.m-cB{color:black}.m-cW{color:white}.m-cP{color:#313375}.m-cS{color:#b4d455}*{outline-offset:0}.m-b0B{border:0 solid black}.m-b1B{border:1px solid black}.m-b0W{border:0 solid white}.m-b1W{border:1px solid white}.m-b0P{border:0 solid #313375}.m-b1P{border:1px solid #313375}.m-b0S{border:0 solid #b4d455}.m-b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.m-dN{display:none}.m-dB{display:block}.m-bcB{background-color:black}.m-bcW{background-color:white}.m-bcP{background-color:#313375}.m-bcS{background-color:#b4d455}.m-bcT{background-color:#aabbcc}}"
    );
  });

  test("compiles ainsley with partial options (even index) as expected", () => {
    expect(
      generate(basicInput, {
        addVariationToSelector: (a, b) => a + "_" + b,
        addValueToSelector: (a, b) => a + "\\:" + b
      })
    ).toEqual(
      "*{box-sizing:border-box}.c\\:b{color:black}.c\\:w{color:white}.c\\:p{color:#313375}.c\\:s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b{border:0 solid black}.b\\:1\\:b{border:1px solid black}.b\\:0\\:w{border:0 solid white}.b\\:1\\:w{border:1px solid white}.b\\:0\\:p{border:0 solid #313375}.b\\:1\\:p{border:1px solid #313375}.b\\:0\\:s{border:0 solid #b4d455}.b\\:1\\:s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.d\\:n{display:none}.d\\:b{display:block}.bc\\:b{background-color:black}.bc\\:w{background-color:white}.bc\\:p{background-color:#313375}.bc\\:s{background-color:#b4d455}.bc\\:t{background-color:#aabbcc}@media(min-width:384px){*{box-sizing:border-box}.c\\:b_s{color:black}.c\\:w_s{color:white}.c\\:p_s{color:#313375}.c\\:s_s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b_s{border:0 solid black}.b\\:1\\:b_s{border:1px solid black}.b\\:0\\:w_s{border:0 solid white}.b\\:1\\:w_s{border:1px solid white}.b\\:0\\:p_s{border:0 solid #313375}.b\\:1\\:p_s{border:1px solid #313375}.b\\:0\\:s_s{border:0 solid #b4d455}.b\\:1\\:s_s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.d\\:n_s{display:none}.d\\:b_s{display:block}.bc\\:b_s{background-color:black}.bc\\:w_s{background-color:white}.bc\\:p_s{background-color:#313375}.bc\\:s_s{background-color:#b4d455}.bc\\:t_s{background-color:#aabbcc}}@media(min-width:768px){*{box-sizing:border-box}.c\\:b_m{color:black}.c\\:w_m{color:white}.c\\:p_m{color:#313375}.c\\:s_m{color:#b4d455}*{outline-offset:0}.b\\:0\\:b_m{border:0 solid black}.b\\:1\\:b_m{border:1px solid black}.b\\:0\\:w_m{border:0 solid white}.b\\:1\\:w_m{border:1px solid white}.b\\:0\\:p_m{border:0 solid #313375}.b\\:1\\:p_m{border:1px solid #313375}.b\\:0\\:s_m{border:0 solid #b4d455}.b\\:1\\:s_m{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.d\\:n_m{display:none}.d\\:b_m{display:block}.bc\\:b_m{background-color:black}.bc\\:w_m{background-color:white}.bc\\:p_m{background-color:#313375}.bc\\:s_m{background-color:#b4d455}.bc\\:t_m{background-color:#aabbcc}}"
    );
  });

  test("compiles ainsley with partial options (odd index) as expected", () => {
    expect(
      generate(basicInput, {
        addPropertyToSelector: (a, b) => a + "-" + b,
        abbreviateProperty: (a) => {
          const noLowerCase = a.replace(/[a-z]+/g, "");
          return [noLowerCase.toLowerCase(), a.toLowerCase()];
        }
      })
    ).toEqual(
      "*{box-sizing:border-box}.cB{color:black}.cW{color:white}.cP{color:#313375}.cS{color:#b4d455}*{outline-offset:0}.b0B{border:0 solid black}.b1B{border:1px solid black}.b0W{border:0 solid white}.b1W{border:1px solid white}.b0P{border:0 solid #313375}.b1P{border:1px solid #313375}.b0S{border:0 solid #b4d455}.b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-dN{display:none}.-dB{display:block}.bcB{background-color:black}.bcW{background-color:white}.bcP{background-color:#313375}.bcS{background-color:#b4d455}.bcT{background-color:#aabbcc}@media(min-width:384px){*{box-sizing:border-box}.s-cB{color:black}.s-cW{color:white}.s-cP{color:#313375}.s-cS{color:#b4d455}*{outline-offset:0}.s-b0B{border:0 solid black}.s-b1B{border:1px solid black}.s-b0W{border:0 solid white}.s-b1W{border:1px solid white}.s-b0P{border:0 solid #313375}.s-b1P{border:1px solid #313375}.s-b0S{border:0 solid #b4d455}.s-b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.s--dN{display:none}.s--dB{display:block}.s-bcB{background-color:black}.s-bcW{background-color:white}.s-bcP{background-color:#313375}.s-bcS{background-color:#b4d455}.s-bcT{background-color:#aabbcc}}@media(min-width:768px){*{box-sizing:border-box}.m-cB{color:black}.m-cW{color:white}.m-cP{color:#313375}.m-cS{color:#b4d455}*{outline-offset:0}.m-b0B{border:0 solid black}.m-b1B{border:1px solid black}.m-b0W{border:0 solid white}.m-b1W{border:1px solid white}.m-b0P{border:0 solid #313375}.m-b1P{border:1px solid #313375}.m-b0S{border:0 solid #b4d455}.m-b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.m--dN{display:none}.m--dB{display:block}.m-bcB{background-color:black}.m-bcW{background-color:white}.m-bcP{background-color:#313375}.m-bcS{background-color:#b4d455}.m-bcT{background-color:#aabbcc}}"
    );
  });

  test("compiles ainsley with all options as expected", () => {
    expect(
      generate(basicInput, {
        addVariationToSelector: (a, b) => a + "_" + b,
        addValueToSelector: (a, b) => a + "\\:" + b,
        addPropertyToSelector: (a, b) => a + "-" + b,
        abbreviateProperty: (a) => [
          a.replace(/[a-z]+/g, "").toLowerCase(),
          a.toLowerCase()
        ]
      })
    ).toEqual(
      "*{box-sizing:border-box}.c\\:b{color:black}.c\\:w{color:white}.c\\:p{color:#313375}.c\\:s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b{border:0 solid black}.b\\:1\\:b{border:1px solid black}.b\\:0\\:w{border:0 solid white}.b\\:1\\:w{border:1px solid white}.b\\:0\\:p{border:0 solid #313375}.b\\:1\\:p{border:1px solid #313375}.b\\:0\\:s{border:0 solid #b4d455}.b\\:1\\:s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-d\\:n{display:none}.-d\\:b{display:block}.bc\\:b{background-color:black}.bc\\:w{background-color:white}.bc\\:p{background-color:#313375}.bc\\:s{background-color:#b4d455}.bc\\:t{background-color:#aabbcc}@media(min-width:384px){*{box-sizing:border-box}.c\\:b_s{color:black}.c\\:w_s{color:white}.c\\:p_s{color:#313375}.c\\:s_s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b_s{border:0 solid black}.b\\:1\\:b_s{border:1px solid black}.b\\:0\\:w_s{border:0 solid white}.b\\:1\\:w_s{border:1px solid white}.b\\:0\\:p_s{border:0 solid #313375}.b\\:1\\:p_s{border:1px solid #313375}.b\\:0\\:s_s{border:0 solid #b4d455}.b\\:1\\:s_s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-d\\:n_s{display:none}.-d\\:b_s{display:block}.bc\\:b_s{background-color:black}.bc\\:w_s{background-color:white}.bc\\:p_s{background-color:#313375}.bc\\:s_s{background-color:#b4d455}.bc\\:t_s{background-color:#aabbcc}}@media(min-width:768px){*{box-sizing:border-box}.c\\:b_m{color:black}.c\\:w_m{color:white}.c\\:p_m{color:#313375}.c\\:s_m{color:#b4d455}*{outline-offset:0}.b\\:0\\:b_m{border:0 solid black}.b\\:1\\:b_m{border:1px solid black}.b\\:0\\:w_m{border:0 solid white}.b\\:1\\:w_m{border:1px solid white}.b\\:0\\:p_m{border:0 solid #313375}.b\\:1\\:p_m{border:1px solid #313375}.b\\:0\\:s_m{border:0 solid #b4d455}.b\\:1\\:s_m{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.-d\\:n_m{display:none}.-d\\:b_m{display:block}.bc\\:b_m{background-color:black}.bc\\:w_m{background-color:white}.bc\\:p_m{background-color:#313375}.bc\\:s_m{background-color:#b4d455}.bc\\:t_m{background-color:#aabbcc}}"
    );
  });

  test("compiles complex ainsley successfully and under 100ms", () => {
    const startTime = Date.now();
    expect(() =>
      generate(
        {
          children: [
            "*,::after,::before{box-sizing:border-box;outline-offset:0;border:0 solid}[type=button],[type=date],[type=datetime-local],[type=email],[type=file],[type=image],[type=month],[type=number],[type=password],[type=reset],[type=search],[type=submit],[type=tel],[type=text],[type=time],[type=url],[type=week],a,abbr,acronym,address,applet,article,aside,audio,b,big,blockquote,body,button,canvas,caption,center,cite,code,dd,del,details,dfn,div,dl,dt,em,embed,fieldset,figcaption,figure,footer,form,h1,h2,h3,h4,h5,h6,header,hgroup,html,i,iframe,img,ins,kbd,label,legend,li,mark,menu,nav,object,ol,output,p,pre,q,ruby,s,samp,section,small,span,strike,strong,sub,summary,sup,time,tt,u,ul,var,video{margin:0;padding:0;border:0 solid;background:0 0;font:inherit;color:inherit;text-align:inherit;vertical-align:baseline}article,aside,details,figcaption,figure,footer,header,hgroup,menu,nav,section{display:block}html{overflow-y:scroll;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}ol,ul{list-style:none}blockquote,q{quotes:none}blockquote::after,blockquote::before,q::after,q::before{content:none}textarea{resize:vertical;overflow:auto}applet,canvas,img,object,svg,video{max-width:100%;height:auto}",
            {
              children: [
                ["c", [["color", "{colors}"]]],
                ["bac", [["background-color", "{colors}"]]],
                [
                  "fosz",
                  [
                    ["font-size", "{typeScale}"],
                    ["line-height", 1.2]
                  ]
                ],
                ["", [["{scalar}", "{scale}"]]],
                ["", [["{direction}", "{scale}"]]],
                ["", [["{vector}", "{scale}"]]],
                ["", [["{vector}-{direction}", "{scale}"]]],
                ["ma$N", [["margin-{direction}", "-{scale}"]]],
                ["bap", [["background-position", "{xLoc} {yLoc}"]]],
                ["bo$w", [["border-{direction}-width", "{scale}"]]],
                ["bo$c", [["border-{direction}-color", "{colors}"]]],
                ["fl", [["flex", "{flexChange} {flexChange} {flexBasis}"]]],
                ["", [["{flexCrossAxes}", "{flexCrossAxis}"]]],
                ["ov", [["overflow", "{overflow} {overflow}"]]],
                [
                  "Display",
                  {
                    i: "inline",
                    b: "block",
                    fx: "flex",
                    n: "none",
                    ib: "inline-block",
                    ifx: "inline-flex"
                  }
                ],
                [
                  "Text-Decoration",
                  {
                    l: "line-through",
                    u: "underline",
                    n: "none"
                  }
                ],
                [
                  "FOnt-STyle",
                  {
                    i: "italic",
                    n: "normal"
                  }
                ],
                [
                  "Text-TransForm",
                  {
                    u: "uppercase",
                    l: "lowercase"
                  }
                ],
                [
                  "OVerflow-Wrap",
                  {
                    bw: "break-word",
                    a: "anywhere",
                    n: "normal"
                  }
                ],
                [
                  "BAckground-Repeat",
                  {
                    r: "repeat",
                    n: "no-repeat"
                  }
                ],
                [
                  "Position",
                  {
                    r: "relative",
                    a: "absolute",
                    f: "fixed",
                    s: "sticky"
                  }
                ],
                [
                  "Text-Align",
                  {
                    l: "left",
                    c: "center",
                    r: "right",
                    j: "justify"
                  }
                ],
                [
                  "Vertical-Align",
                  {
                    t: "top",
                    m: "middle",
                    b: "bottom"
                  }
                ],
                [
                  "CUrsor",
                  {
                    d: "default",
                    p: "pointer"
                  }
                ],
                [
                  "Pointer-Events",
                  {
                    n: "none",
                    a: "all"
                  }
                ],
                [
                  "Z-Index",
                  {
                    "0": "0",
                    "1": "-1",
                    "2": "2",
                    "4": "4",
                    "8": "8",
                    "16": "16",
                    "32": "32"
                  }
                ],
                [
                  "Opacity",
                  {
                    "0": "0",
                    "10": "10",
                    "20": "20",
                    "40": "40",
                    "80": "80",
                    "100": "100"
                  }
                ],
                [
                  "White-Space",
                  {
                    p: "pre",
                    pw: "pre-wrap",
                    nw: "nowrap",
                    n: "normal"
                  }
                ],
                [
                  "BAckground-SiZe",
                  {
                    cv: "cover",
                    ct: "contain"
                  }
                ],
                [
                  "FLex-Direction",
                  {
                    r: "row",
                    c: "column",
                    rr: "row-reverse",
                    cr: "column-reverse"
                  }
                ],
                [
                  "Justify-Content",
                  {
                    c: "center",
                    fs: "flex-start",
                    fe: "flex-end",
                    sb: "space-between",
                    se: "space-evenly"
                  }
                ],
                ["Line-Height", { B: 1, T: 1.2, C: 1.3 }],
                ["FOnt-Weight", { N: 400, M: 600, B: 700 }]
              ],
              variables: {
                overflow: {
                  h: "hidden",
                  s: "scroll",
                  a: "auto",
                  v: "visible"
                },
                flexCrossAxes: {
                  ai: "align-items",
                  as: "align-self",
                  ac: "align-content"
                },
                flexCrossAxis: {
                  fs: "flex-start",
                  fe: "flex-end",
                  c: "center",
                  b: "baseline",
                  s: "stretch"
                },
                flexChange: {
                  0: "0",
                  1: "1",
                  2: "2",
                  x: "11111111"
                },
                flexBasis: {
                  0: "0%",
                  a: "auto",
                  p: "100%"
                },
                xLoc: {
                  l: "left",
                  r: "right",
                  c: "center"
                },
                yLoc: {
                  t: "top",
                  b: "bottom",
                  c: "center"
                },
                scalar: {
                  w: "width",
                  xw: "max-width",
                  nw: "min-width",
                  h: "height",
                  xh: "max-height",
                  nh: "min-height",
                  bor: "border-radius"
                },
                vector: {
                  ma: "margin",
                  pa: "padding"
                },
                direction: {
                  t: "top",
                  l: "left",
                  r: "right",
                  b: "bottom"
                },
                colors: {
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
                typeScale: {
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
                scale: {
                  0: "0",
                  1: "1px",
                  2: "2px",
                  3: "3px",
                  10: "4px",
                  15: "6px",
                  20: "8px",
                  25: "12px",
                  30: "16px",
                  35: "24px",
                  40: "32px",
                  45: "48px",
                  50: "64px",
                  55: "96px",
                  60: "128px",
                  65: "192px",
                  70: "256px",
                  75: "384px",
                  80: "512px",
                  85: "768px",
                  90: "1024px",
                  95: "1536px",
                  P50: "50%",
                  P: "100%",
                  H: "100vh",
                  W: "100vw",
                  X: "11111111px"
                }
              },
              variations: [
                [
                  ["o", ":hover"],
                  ["o", ":focus"],
                  ["o", ":active"]
                ],
                [
                  ["s", "@media(min-width:384px)"],
                  ["m", "@media(min-width:768px)"],
                  ["l", "@media(min-width:1024px)"],
                  ["x", "@media(min-width:1536px)"]
                ]
              ]
            }
          ]
        },
        {
          addVariationToSelector: (a, b) => a + "_" + b,
          addValueToSelector: (a, b) => a + "\\:" + b,
          addPropertyToSelector: (a, b) => a + "-" + b,
          abbreviateProperty: (a) => [
            a.replace(/[a-z]+/g, "").toLowerCase(),
            a.toLowerCase()
          ]
        }
      )
    ).not.toThrow();
    expect(Date.now() - startTime).toBeLessThan(100);
  });

  test("compiles ainsley with nested at rules", () => {
    const css = generate({
      children: [["c", [["color", "{color}"]]]],
      variables: {
        color: {
          b: "black",
          w: "white"
        }
      },
      variations: [
        [["n", "@supports(-webkit-box-orient:vertical)"]],
        [["l", "@media(min-width:1024px)"]]
      ]
    });

    expect(css).toEqual(
      ".cB{color:black}.cW{color:white}@supports(-webkit-box-orient:vertical){.n-cB{color:black}.n-cW{color:white}}@media(min-width:1024px){.l-cB{color:black}.l-cW{color:white}}@supports(-webkit-box-orient:vertical){@media(min-width:1024px){.l-n-cB{color:black}.l-n-cW{color:white}}}"
    );
  });

  test("compiles ainsley with nested ainsley with variations", () => {
    const css = generate({
      children: [
        ["c", [["color", "{color}"]]],
        {
          variations: [
            [["n", "@supports(-webkit-box-orient:vertical)"]],
            [["l", "@media(min-width:1024px)"]]
          ],
          children: [["bg", [["background-color", "{color}"]]]]
        }
      ],
      variables: {
        color: {
          b: "black",
          w: "white"
        }
      }
    });

    expect(css).toEqual(
      ".cB{color:black}.cW{color:white}.bgB{background-color:black}.bgW{background-color:white}@supports(-webkit-box-orient:vertical){.n-bgB{background-color:black}.n-bgW{background-color:white}}@media(min-width:1024px){.l-bgB{background-color:black}.l-bgW{background-color:white}}@supports(-webkit-box-orient:vertical){@media(min-width:1024px){.l-n-bgB{background-color:black}.l-n-bgW{background-color:white}}}"
    );
  });
});
