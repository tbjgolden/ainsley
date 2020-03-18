(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports, require('check-types')) :
  typeof define === 'function' && define.amd ? define(['exports', 'check-types'], factory) :
  (global = global || self, factory(global.auto = {}, global.checkTypes));
}(this, (function (exports, checkTypes) { 'use strict';

  checkTypes = checkTypes && Object.prototype.hasOwnProperty.call(checkTypes, 'default') ? checkTypes['default'] : checkTypes;

  var lint = function lint(ainsley) {
    var defsJson = JSON.stringify(ainsley.defs);

    for (var k in ainsley) {
      if (iteratorRegex.test(k)) {
        if (!defsJson.includes(k)) {
          console.log("iterator defined but not used in defs", k);
        }
      } else if (k === "defs") {
        var match = defsJson.match(k);

        if (match) {
          for (var i = 0; i < match.length; i++) {
            if (!ainsley[match[i]]) {
              console.log("iterator referenced in defs but not defined", match[i]);
            }
          }
        }
      } else if (k === "props") ; else if (k === "raw") ; else if (k === "mods") ; else {
        console.log("invalid property", k);
      }
    }
  };

  exports.lint = lint;

  Object.defineProperty(exports, '__esModule', { value: true });

})));
//# sourceMappingURL=lint.js.map
