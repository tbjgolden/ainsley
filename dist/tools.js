(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
  typeof define === 'function' && define.amd ? define(['exports'], factory) :
  (global = global || self, factory(global.auto = {}));
}(this, (function (exports) { 'use strict';

  function _defineProperty(obj, key, value) {
    if (key in obj) {
      Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
      });
    } else {
      obj[key] = value;
    }

    return obj;
  }

  function ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);

    if (Object.getOwnPropertySymbols) {
      var symbols = Object.getOwnPropertySymbols(object);
      if (enumerableOnly) symbols = symbols.filter(function (sym) {
        return Object.getOwnPropertyDescriptor(object, sym).enumerable;
      });
      keys.push.apply(keys, symbols);
    }

    return keys;
  }

  function _objectSpread2(target) {
    for (var i = 1; i < arguments.length; i++) {
      var source = arguments[i] != null ? arguments[i] : {};

      if (i % 2) {
        ownKeys(Object(source), true).forEach(function (key) {
          _defineProperty(target, key, source[key]);
        });
      } else if (Object.getOwnPropertyDescriptors) {
        Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
      } else {
        ownKeys(Object(source)).forEach(function (key) {
          Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
      }
    }

    return target;
  }

  function _slicedToArray(arr, i) {
    return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest();
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) {
      for (var i = 0, arr2 = new Array(arr.length); i < arr.length; i++) arr2[i] = arr[i];

      return arr2;
    }
  }

  function _arrayWithHoles(arr) {
    if (Array.isArray(arr)) return arr;
  }

  function _iterableToArray(iter) {
    if (Symbol.iterator in Object(iter) || Object.prototype.toString.call(iter) === "[object Arguments]") return Array.from(iter);
  }

  function _iterableToArrayLimit(arr, i) {
    if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) {
      return;
    }

    var _arr = [];
    var _n = true;
    var _d = false;
    var _e = undefined;

    try {
      for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
        _arr.push(_s.value);

        if (i && _arr.length === i) break;
      }
    } catch (err) {
      _d = true;
      _e = err;
    } finally {
      try {
        if (!_n && _i["return"] != null) _i["return"]();
      } finally {
        if (_d) throw _e;
      }
    }

    return _arr;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance");
  }

  function _nonIterableRest() {
    throw new TypeError("Invalid attempt to destructure non-iterable instance");
  }

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

  var base = baseConfig;
  var extend = function extend() {
    for (var _len = arguments.length, ainsleys = new Array(_len), _key = 0; _key < _len; _key++) {
      ainsleys[_key] = arguments[_key];
    }

    return ainsleys.reduce(function (ainsley, next) {
      return _objectSpread2({}, ainsley || {}, {}, next || {}, {
        defs: [].concat(_toConsumableArray(ainsley.defs), _toConsumableArray(next.defs || [])),
        props: [].concat(_toConsumableArray(ainsley.props), _toConsumableArray(next.props || [])),
        raw: [].concat(_toConsumableArray(ainsley.raw), _toConsumableArray(next.raw || [])),
        mods: [].concat(_toConsumableArray(ainsley.mods), _toConsumableArray(next.mods || []))
      });
    }, {
      defs: [],
      props: [],
      raw: [],
      mods: []
    });
  };
  var check = function check(ainsley) {
    Object.entries(function (_ref) {
      var _ref2 = _slicedToArray(_ref, 2),
          k = _ref2[0],
          v = _ref2[1];

      console.log(k, v);
    });
  };

  exports.base = base;
  exports.check = check;
  exports.extend = extend;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=tools.js.map
