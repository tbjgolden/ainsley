var AC = (function (ACCB) {
  'use strict';

  ACCB = ACCB && Object.prototype.hasOwnProperty.call(ACCB, 'default') ? ACCB['default'] : ACCB;

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

  //#if _CB
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

  if (ACCB) ACCB(ainsleyToCss); //#endif

  return ainsleyToCss;

}(ACCB));
//# sourceMappingURL=compiler.lite.es5.js.map
