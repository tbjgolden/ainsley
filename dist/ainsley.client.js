!function(e,t){"object"==typeof exports&&"object"==typeof module?module.exports=t():"function"==typeof define&&define.amd?define([],t):"object"==typeof exports?exports.Ainsley=t():e.Ainsley=t()}(window,(function(){return function(e){var t={};function n(r){if(t[r])return t[r].exports;var o=t[r]={i:r,l:!1,exports:{}};return e[r].call(o.exports,o,o.exports,n),o.l=!0,o.exports}return n.m=e,n.c=t,n.d=function(e,t,r){n.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:r})},n.r=function(e){"undefined"!=typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},n.t=function(e,t){if(1&t&&(e=n(e)),8&t)return e;if(4&t&&"object"==typeof e&&e&&e.__esModule)return e;var r=Object.create(null);if(n.r(r),Object.defineProperty(r,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var o in e)n.d(r,o,function(t){return e[t]}.bind(null,o));return r},n.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e};return n.d(t,"a",t),t},n.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},n.p="",n(n.s=11)}({1:function(e,t,n){"use strict";n.d(t,"d",(function(){return r})),n.d(t,"e",(function(){return o})),n.d(t,"c",(function(){return u})),n.d(t,"b",(function(){return c})),n.d(t,"a",(function(){return i})),n.d(t,"f",(function(){return f}));var r=function(e){return!(null===e||"object"!=typeof e||Array.isArray(e))},o=function(e,t){for(var n=[],r=e.length,o=0;o<r;o++)n.push(t(e[o]));return n},u=function(e){return[].concat.apply([],e)},c=function(e){for(var t=[[]],n=0;n<e.length;)t=u(o(e[n++],(function(e){return t.map((function(t){return t.concat([e])}))})));return t},i=function(e){for(var t={},n=e.length,r=function(n){var r=e[n];o(Object.keys(r),(function(e){t[e]=r[e]}))},u=0;u<n;u++)r(u);return t},f=function(e){var t={};return function(n,r){var o=n+"{}"+r;return t[o]||(t[o]=e(n,r)),t[o]}}},11:function(e,t,n){"use strict";n.r(t),n.d(t,"ITERATOR_REGEX",(function(){return o})),n.d(t,"DEFAULT_OPTIONS",(function(){return u})),n.d(t,"generate",(function(){return i})),n.d(t,"generateFromAst",(function(){return f})),n.d(t,"embed",(function(){return p}));var r=n(1),o="\\{[a-zA-Z0-9_-]+\\}",u={addVariationToSelector:function(e,t){return t+"-"+e},addPropertyToSelector:function(e,t){return e+t.toLowerCase()},addValueToSelector:function(e,t){return e+t.toUpperCase()},abbreviateProperty:function(e){return[e.split("-").map((function(e){return e.charAt(0)})).join("").toLowerCase(),e.toLowerCase()]}},c=new RegExp(o,"g"),i=function(e,t){void 0===t&&(t={});var n=Object(r.a)([u,t]),o={};return Object(r.e)(Object.keys(n),(function(e){o[e]=Object(r.f)(n[e])})),f(a(e,o,{}))},f=function(e){return Object(r.e)(e,(function(e){return"string"==typeof e?e:"@"===e[0].charAt(0)?e[0]+"{"+f(e[1])+"}":"."+e[0]+"{"+Object(r.e)(e[1],(function(e){return e[0]+":"+e[1]})).join(";")+"}"})).join("")},a=function(e,t,n){var o,u=Object(r.a)([n]);if(Object(r.d)(e.variables)){var c=e.variables;Object(r.e)(Object.keys(c),(function(e){var t=s(e),o=t[0],i=t[1];0===o?u[i]=c[e]:2===o&&(u[i]=Object(r.a)([n[i],c[e]]))}))}var i=void 0===e.children?[]:d(e.children,t,u);return Object(r.c)(Object(r.e)(Object(r.b)(Object(r.e)(null!==(o=e.variations)&&void 0!==o?o:[],(function(e){return[["",""]].concat(e)}))),(function(e){return e.reduce((function(e,n){var o=n[0],u=n[1];return""===u?e:"@"===u.charAt(0)?[[u,Object(r.e)(e,(function(e){return"string"==typeof e?e:[t.addVariationToSelector(e[0],o),e[1]]}))]]:Object(r.e)(e,(function(e){return"string"==typeof e?e:[t.addVariationToSelector(e[0],o)+u,e[1]]}))}),i)})))},d=function(e,t,n){return Object(r.c)(Object(r.e)(e,(function(e){return"string"==typeof e?[e]:Object(r.d)(e)?a(e,t,n):(e=e,Array.isArray(e[1])?l(e,t,n):b(e,t))})))},l=function(e,t,n){var o=e[0],u=e[1],i=[];return Object(r.e)(u,(function(e){var t,n,o=null!==(t=(e[0]+"").match(c))&&void 0!==t?t:[],u=null!==(n=(e[1]+"").match(c))&&void 0!==n?n:[];Object(r.e)(o,(function(e){return i.push([e,0])})),Object(r.e)(u,(function(e){return i.push([e,1])}))})),Object(r.e)(Object(r.b)(Object(r.e)(i,(function(e){var t=e[0],o=e[1],u=t.slice(1,-1);return Object(r.e)(Object.keys(n[u]),(function(e){return[t,e,n[u][e],o]}))}))),(function(e){var n=0,c=e[n];return[e.reduce((function(e,n){return 0===n[3]?t.addPropertyToSelector(e,n[1]):t.addValueToSelector(e,n[1])}),o),Object(r.e)(u,(function(t){return Object(r.e)(t,(function(t){for(;void 0!==c&&-1!==t.indexOf(c[0]);)t=t.replace(c[0],c[2]),c=e[++n];return t}))}))]}))},b=function(e,t){var n=e[0],o=e[1],u=t.abbreviateProperty(n),c=u[0],i=u[1];return Object(r.e)(Object.keys(o),(function(e){return[t.addValueToSelector(t.addPropertyToSelector("",c),e),[[i,o[e]]]]}))},s=function(e){var t="?+".indexOf(e[0])+1;return[t,t>0?e.slice(1):e]},p=function(e,t){var n=null;void 0!==t&&(n=document.querySelector("style#"+t)),null===n&&((n=document.createElement("style")).type="text/css",void 0!==t&&n.setAttribute("id",t),document.head.appendChild(n)),n.innerHTML=e}}})}));
//# sourceMappingURL=ainsley.client.js.map