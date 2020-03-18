/** @license Ainsley v0.0.1-alpha.1 (Tom Golden <tom.bio> @tbjgolden) */

(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.auto = {}));
}(this, (function (exports) { 'use strict';

  var baseConfig = {
    defs: [["c&", [["color", "{colors}"]]], ["d&", [["display", "{display}"]]], ["bgc&", [["background-color", "{colors}"]]], ["fs&", [["font-size", "{typeScale}"], ["line-height", "1.2"]]], ["&&", [["{scalar}", "{scale}"]]], ["&a&", [["{vector}", "{scale}"]]], ["&&&", [["{vector}-{direction}", "{scale}"]]], ["m&N&", [["margin-{direction}", "-{scale}"]]], ["fw&", [["font-weight", "{weight}"]]], ["ws&", [["white-space", "{whiteSpace}"]]], ["bgp&&", [["background-position", "{xLoc} {yLoc}"]]], ["bgs&", [["background-size", "{bgSize}"]]], ["b&w&", [["border-{direction}-width", "{scale}"]]], ["b&c&", [["border-{direction}-color", "{colors}"]]], ["fx&&&", [["flex", "{flexChange} {flexChange} {flexBasis}"]]], ["fxd&", [["flex-direction", "{flexDirection}"]]], ["&&", [["{flexCrossAxes}", "{flexCrossAxis}"]]], ["jc&", [["justify-content", "{flexMainAxis}"]]], ["ov&&", [["overflow", "{overflow} {overflow}"]]], ["o&", [["opacity", "{opacity}"]]]],
    props: [["text-decoration", ["line-through", "underline", "none"]], ["font-style", ["italic", "normal"]], ["text-transform", ["uppercase", "lowercase"]], ["overflow-wrap", ["break-word", "anywhere", "normal"]], ["background-repeat", ["repeat", "no-repeat"]], ["position", ["relative", "absolute", "fixed", "sticky"]], ["text-align", ["left", "center", "right", "justify"]], ["vertical-align", ["top", "middle", "bottom"]], ["cursor", ["default", "pointer"]], ["pointer-events", ["none", "all"]]],
    mods: [[["o-", ":hover"], ["o-", ":focus"], ["o-", ":active"]], [["s-", "@media(min-width:384px)"], ["m-", "@media(min-width:768px)"], ["l-", "@media(min-width:1024px)"], ["x-", "@media(min-width:1536px)"]]],
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
    "{overflow}": {
      H: "hidden",
      S: "scroll",
      A: "auto",
      V: "visible"
    },
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
    "{flexChange}": {
      "0": "0",
      "1": "1",
      "2": "2",
      X: "11111111"
    },
    "{flexBasis}": {
      "0": "0%",
      A: "auto",
      P: "100%"
    },
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
    "{weight}": {
      N: 400,
      M: 600,
      B: 700
    },
    "{lineHeight}": {
      B: 1,
      T: 1.2,
      C: 1.3
    },
    "{xLoc}": {
      L: "left",
      R: "right",
      C: "center"
    },
    "{bgSize}": {
      CV: "cover",
      CT: "contain"
    },
    "{yLoc}": {
      T: "top",
      B: "bottom",
      C: "center"
    },
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
    "{vector}": {
      m: "margin",
      p: "padding"
    },
    "{direction}": {
      t: "top",
      l: "left",
      r: "right",
      b: "bottom"
    },
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

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  var fastClone = function fastClone(val) {
    if (_typeof(val) !== "object") return val;
    var arr = [];
    var len = val.length;

    for (var i = 0; i < len; i++) {
      arr.push(fastClone(val[i]));
    }

    return arr;
  };
  var map = function map(arr, fn) {
    var out = [];
    var len = arr.length;

    for (var i = 0; i < len; i++) {
      out.push(fn(arr[i]));
    }

    return out;
  };
  var flat = function flat(arr) {
    return [].concat.apply([], arr);
  };
  var combinations = function combinations(mods) {
    var list = [[]];

    while (mods.length) {
      list = flat(mods.shift().map(function (opt) {
        return list.map(function (prev) {
          return prev.concat([opt]);
        });
      }));
    }

    return list;
  };
  var assign = function assign(objects) {
    if (!Array.isArray(objects)) throw new Error("assign needs an array");
    var out = {};
    var len = objects.length;

    for (var i = 1; i < len; i++) {
      var obj = objects[i];
      if (obj) for (var nextKey in obj) {
        out[nextKey] = obj[nextKey];
      }
    }

    return out;
  };

  var propFragMap = {
    flex: "fx",
    background: "bg",
    min: "n",
    max: "x",
    style: "st",
    overflow: "ov",
    cursor: "cu"
  };
  var iteratorRegex = /\{[a-z]+\}/gi; // private helpers

  var _abbrev = function _abbrev(w) {
    return propFragMap[w] || w[0];
  };

  var _expandDeclaration = function _expandDeclaration(subpair) {
    return "".concat(subpair[0], ":").concat(subpair[1]);
  };

  var _addEmptyMod = function _addEmptyMod(mod) {
    return [["", ""]].concat(mod);
  };

  var _abbrevWord = function _abbrevWord(w) {
    return w[0].toUpperCase();
  }; // expand ainsley.defs


  var expandDefs = function expandDefs(ainsley, ruleSet) {
    var pair = ruleSet[1].reduce(function (iters, pair) {
      return [iters[0].concat(pair[0].match(iteratorRegex) || []), iters[1].concat(pair[1].match(iteratorRegex) || [])];
    }, [[], []]);
    return map(combinations(map(pair[0].concat(pair[1]), function (iter) {
      return map(Object.keys(ainsley[iter]), function (abbr) {
        return [iter, abbr, ainsley[iter][abbr]];
      });
    })), function (perm) {
      var clone = fastClone(ruleSet);

      for (var i = 0; clone[0].includes("&"); i++) {
        clone[0] = clone[0].replace("&", perm[i][1]);
      }

      for (var _i = 0; _i < clone[1].length; _i++) {
        var decl = clone[1][_i];

        while (perm.length > 0 && decl[0].includes(perm[0][0])) {
          var first = perm.shift();
          decl[0] = decl[0].replace(first[0], first[2]);
        }
      }

      for (var _i2 = 0; _i2 < clone[1].length; _i2++) {
        var _decl = clone[1][_i2];

        while (perm.length > 0 && _decl[1].includes(perm[0][0])) {
          var _first = perm.shift();

          _decl[1] = _decl[1].replace(_first[0], _first[2]);
        }
      }

      return clone;
    });
  }; // expand ainsley.props

  var expandProps = function expandProps(pair) {
    var propAbbrev = map(pair[0].split("-"), _abbrev).join("");
    return map(pair[1], function (value) {
      return ["".concat(propAbbrev).concat(map(value.split(" "), _abbrevWord).join("")), [[pair[0], value]]];
    });
  }; // compile ainsley to a simple stylesheet ast

  var ainsleyToAst = function ainsleyToAst(ainsley) {
    var ast = [].concat(flat(map(ainsley.defs || [], function (def) {
      return expandDefs(ainsley, def);
    })), flat(map(ainsley.props || [], expandProps)), ainsley.raw || []);
    return flat(map(combinations(map(ainsley.mods || [], _addEmptyMod)), function (comb) {
      return comb.reduce(function (ast, pair) {
        if (!pair[1]) {
          return ast;
        } else if (pair[1][0] === "@") {
          return [[pair[1], map(ast, function (subpair) {
            return ["".concat(pair[0]).concat(subpair[0]), subpair[1]];
          })]];
        } else {
          return map(ast, function (subpair) {
            return ["".concat(pair[0]).concat(subpair[0]).concat(pair[1]), subpair[1]];
          });
        }
      }, ast);
    }));
  };
  var ruleToCSS = function ruleToCSS(rule) {
    return rule[0][0] === "@" ? "".concat(rule[0], "{").concat(astToCss(rule[1]), "}") : ".".concat(rule[0], "{").concat(map(rule[1], _expandDeclaration).join(";"), "}");
  }; // generate css from simple stylesheet ast

  var astToCss = function astToCss(ast) {
    return map(ast, ruleToCSS).join("");
  }; // generate css from ainsley

  var ainsleyToCss = function ainsleyToCss(ainsley) {
    return astToCss(ainsleyToAst(ainsley));
  }; // insert ainsley into a dom
  if (globalThis.ACCB) globalThis.ACCB(ainsleyToCss);

  var base = baseConfig;
  var extend = function extend(ainsleys) {
    if (!Array.isArray(ainsleys)) throw new Error("extend needs an array");
    return ainsleys.reduce(function (ainsley, next) {
      return assign([ainsley || {}, next || {}, {
        defs: flat([ainsley.defs, next.defs || []]),
        props: flat([ainsley.props, next.props || []]),
        raw: flat([ainsley.raw, next.raw || []]),
        mods: flat([ainsley.mods, next.mods || []])
      }]);
    }, {
      defs: [],
      props: [],
      raw: [],
      mods: []
    });
  };

  exports.base = base;
  exports.extend = extend;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tools.js.map
