// prettier-ignore
export default {
  defs: [
    ["c&", [["color", "{colors}"]]],
    ["bgc&", [["background-color", "{colors}"]]],
    ["fs&", [["font-size", "{typeScale}"], ["line-height", "1.2"]]],
    ["&&", [["{scalar}", "{scale}"]]],
    ["&a&", [["{vector}", "{scale}"]]],
    ["&&&", [["{vector}-{direction}", "{scale}"]]],
    ["m&N&", [["margin-{direction}", "-{scale}"]]],
    ["bgp&&", [["background-position", "{xLoc} {yLoc}"]]],
    ["b&w&", [["border-{direction}-width", "{scale}"]]],
    ["b&c&", [["border-{direction}-color", "{colors}"]]],
    ["fx&&&", [["flex", "{flexChange} {flexChange} {flexBasis}"]]],
    ["&&", [["{flexCrossAxes}", "{flexCrossAxis}"]]],
    ["ov&&", [["overflow", "{overflow} {overflow}"]]]
  ],
  props: [
    ["display", ["inline", "block", "flex", "none", ["inline-block", "IB"], ["inline-flex", "IF"]]],
    ["text-decoration", ["line-through", "underline", "none"]],
    ["font-style", ["italic", "normal"]],
    ["text-transform", ["uppercase", "lowercase"]],
    ["overflow-wrap", ["break-word", "anywhere", "normal"]],
    ["background-repeat", ["repeat", "no-repeat"]],
    ["position", ["relative", "absolute", "fixed", "sticky"]],
    ["text-align", ["left", "center", "right", "justify"]],
    ["vertical-align", ["top", "middle", "bottom"]],
    ["cursor", ["default", "pointer"]],
    ["pointer-events", ["none", "all"]],
    ["line-height", [["1", "B"], ["1.2", "T"], ["1.3", "C"]]],
    ["z-index", ["0", "1", "2", "4", "8", ["16", "16"], ["32", "32"], ["-1", "N1"]]],
    ["opacity", ["0", ["10", "10"], ["20", "20"], ["40", "40"], ["80", "80"], ["100", "100"]]],
    ["font-weight", [["400", "N"], ["600", "M"], ["700", "B"]]],
    ["white-space", ["pre", ["pre-wrap", "PW"], ["nowrap", "C"], ["normal", "CW"]]],
    ["background-size", [["cover", "CV"], ["contain", "CT"]]],
    ["flex-direction", [["row", "R"], ["column", "C"], ["row-reverse", "RR"], ["column-reverse", "CR"]]],
    ["justify-content", ["center", ["flex-start", "FS"], ["flex-end", "FE"], ["space-between", "SB"], ["space-evenly", "SE"]]]
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
  "{overflow}": { H: "hidden", S: "scroll", A: "auto", V: "visible" },
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
  "{xLoc}": { L: "left", R: "right", C: "center" },
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
};
