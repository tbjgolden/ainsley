/** @license Ainsley v0.0.1-beta.2 (Tom Golden <tom.bio> @tbjgolden) */
var AinsleyToCSS=function(){"use strict";function n(t){return(n="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(t)}var t={},r={},e=["array","arrayLike","iterable","object"],u=Object.prototype.hasOwnProperty,o=Object.prototype.toString,c=Object.keys,f=Array.prototype.slice,i=Array.isArray,a=Number.NEGATIVE_INFINITY,s=Number.POSITIVE_INFINITY,l="function"==typeof Symbol,b="function"==typeof Map,y="function"==typeof Set;[{n:"equal",f:function(n,t){return n===t},s:"equal {e}"},{n:"undefined",f:function(n){return void 0===n},s:"be undefined"},{n:"null",f:function(n){return null===n},s:"be null"},{n:"assigned",f:g,s:"be assigned"},{n:"primitive",f:function(t){var r;switch(t){case null:case void 0:case!1:case!0:return!0}return"string"===(r=n(t))||"number"===r||l&&"symbol"===r},s:"be primitive type"},{n:"contains",f:F,s:"contain {e}"},{n:"in",f:function(n,t){return F(t,n)},s:"be in {e}"},{n:"containsKey",f:L,s:"contain key {e}"},{n:"keyIn",f:function(n,t){return L(t,n)},s:"be key in {e}"},{n:"zero",f:function(n){return 0===n},s:"be 0"},{n:"one",f:function(n){return 1===n},s:"be 1"},{n:"infinity",f:function(n){return n===a||n===s},s:"be infinity"},{n:"number",f:d,s:"be Number"},{n:"integer",f:j,s:"be integer"},{n:"float",f:function(n){return d(n)&&n%1!=0},s:"be non-integer number"},{n:"even",f:function(n){return"number"==typeof n&&n%2==0},s:"be even number"},{n:"odd",f:function(n){return j(n)&&n%2!=0},s:"be odd number"},{n:"greater",f:S,s:"be greater than {e}"},{n:"less",f:E,s:"be less than {e}"},{n:"between",f:function(n,t,r){if(t<r)return S(n,t)&&n<r;return E(n,t)&&n>r},s:"be between {e} and {e2}"},{n:"greaterOrEqual",f:w,s:"be greater than or equal to {e}"},{n:"lessOrEqual",f:O,s:"be less than or equal to {e}"},{n:"inRange",f:function(n,t,r){if(t<r)return w(n,t)&&n<=r;return O(n,t)&&n>=r},s:"be in the range {e} to {e2}"},{n:"positive",f:function(n){return S(n,0)},s:"be positive number"},{n:"negative",f:function(n){return E(n,0)},s:"be negative number"},{n:"string",f:k,s:"be String"},{n:"emptyString",f:function(n){return""===n},s:"be empty string"},{n:"nonEmptyString",f:I,s:"be non-empty string"},{n:"match",f:function(n,t){return k(n)&&!!n.match(t)},s:"match {e}"},{n:"boolean",f:function(n){return!1===n||!0===n},s:"be Boolean"},{n:"object",f:A,s:"be Object"},{n:"emptyObject",f:function(n){return A(n)&&!x(n,(function(){return!0}))},s:"be empty object"},{n:"nonEmptyObject",f:function(n){return A(n)&&x(n,(function(){return!0}))},s:"be non-empty object"},{n:"instanceStrict",f:N,s:"be instanceof {t}"},{n:"thenable",f:function(n){return g(n)&&P(n.then)},s:"be promise-like"},{n:"instance",f:function(n,t){try{return N(n,t)||n.constructor.name===t.name||o.call(n)==="[object "+t.name+"]"}catch(n){return!1}},s:"be {t}"},{n:"like",f:function t(r,e){var o;for(o in e)if(u.call(e,o)){if(!1===u.call(r,o)||n(r[o])!==n(e[o]))return!1;if(A(r[o])&&!1===t(r[o],e[o]))return!1}return!0},s:"be like {e}"},{n:"array",f:function(n){return i(n)},s:"be Array"},{n:"emptyArray",f:function(n){return i(n)&&0===n.length},s:"be empty array"},{n:"nonEmptyArray",f:function(n){return i(n)&&n.length>0},s:"be non-empty array"},{n:"arrayLike",f:T,s:"be array-like"},{n:"iterable",f:q,s:"be iterable"},{n:"date",f:function(n){return N(n,Date)&&j(n.getTime())},s:"be valid Date"},{n:"function",f:P,s:"be Function"},{n:"hasLength",f:function(n,t){return g(n)&&n.length===t},s:"have length {e}"},{n:"throws",f:function(n){if(!P(n))return!1;try{n()}catch(n){return!0}return!1},s:"throw"}].forEach((function(n){var e=n.n,u=n.f,o=n.s;t[e]="assert failed: expected {a} to ".concat(o),r[e]=u}));var p=M({map:function n(t,r){var e;e=i(t)?[]:{};if(P(r))z(t,(function(n,t){e[n]=r(t)}));else{i(r)||m.object(r);var u=c(t||{});z(r,(function(r,o){u.some((function(n,t){return n===r&&(u.splice(t,1),!0)})),P(o)?h.assigned(t)?e[r]=!!o.m:e[r]=o(t[r]):e[r]=n(t[r],o)}))}return e},all:function(n){if(i(n))return C(n,!1);return m.object(n),D(n,!1)},any:function(n){if(i(n))return C(n,!0);return m.object(n),D(n,!0)}},r),m=U(R,Y),h=U(_,B),v=U((function(n){var t=function(){return!!h.assigned(arguments[0])||n.apply(null,arguments)};return t.l=n.length,t.m=!0,t}),(function(n){if(!1===g(n))return!0;return n}));function g(n){return null!=n}function d(n){return"number"==typeof n&&n>a&&n<s}function j(n){return"number"==typeof n&&n%1==0}function S(n,t){return d(n)&&n>t}function E(n,t){return d(n)&&n<t}function w(n,t){return d(n)&&n>=t}function O(n,t){return d(n)&&n<=t}function k(n){return"string"==typeof n}function I(n){return k(n)&&""!==n}function A(n){return"[object Object]"===o.call(n)}function x(n,t){for(var r in n)if(u.call(n,r)&&t(r,n[r]))return!0;return!1}function N(n,t){try{return n instanceof t}catch(n){return!1}}function T(n){return g(n)&&n.length>=0}function q(n){return l?g(n)&&P(n[Symbol.iterator]):T(n)}function F(n,t){var r,e;if(!g(n))return!1;if(y&&N(n,Set))return n.has(t);if(k(n))return-1!==n.indexOf(t);if(l&&n[Symbol.iterator]&&P(n.values)){r=n.values();do{if((e=r.next()).value===t)return!0}while(!e.done);return!1}return x(n,(function(n,r){return r===t}))}function L(n,t){return!!g(n)&&(b&&N(n,Map)?n.has(t):!(q(n)&&!d(+t))&&!!n[t])}function P(n){return"function"==typeof n}function z(n,t){for(var r in n)u.call(n,r)&&t(r,n[r])}function C(n,t){var r;for(r=0;r<n.length;r+=1)if(n[r]===t)return t;return!t}function D(n,t){var r,e;for(r in n)if(u.call(n,r)){if(A(e=n[r])&&D(e,t)===t)return t;if(e===t)return t}return!t}function M(n,t){return z(t,(function(t,r){n[t]=r})),n}function R(n,t){return function(){var r=arguments,e=n.l||n.length,u=r[e],o=r[e+1];return Y(n.apply(null,r),I(u)?u:t.replace("{a}",V(r[0])).replace("{e}",V(r[1])).replace("{e2}",V(r[2])).replace("{t}",(function(){var n=r[1];return n&&n.name?n.name:n})),P(o)?o:TypeError),r[0]}}function V(n){return function(){return k(n)?'"'+n.replace(/\\/g,"\\\\").replace(/"/g,'\\"')+'"':n&&!0!==n&&n.constructor&&!N(n,RegExp)&&"number"!=typeof n?n.constructor.name:n}}function Y(n,t,r){if(n)return n;throw new(r||Error)(t||"assert failed")}function _(n){var t=function(){return B(n.apply(null,arguments))};return t.l=n.length,t}function B(n){return!n}function G(n,t,r){var e=function(){var e,u;if(e=arguments[0],"maybe"===n&&h.assigned(e))return!0;if(!t(e))return!1;e=K(t,e),u=f.call(arguments,1);try{e.forEach((function(t){if(("maybe"!==n||g(t))&&!r.apply(null,[t].concat(u)))throw 0}))}catch(n){return!1}return!0};return e.l=r.length,e}function K(n,t){switch(n){case T:return f.call(t);case A:return c(t).map((function(n){return t[n]}));default:return t}}function U(n,t){return H([n,r,t,""])}function H(n){var r,e,u;return r=n.shift(),e=n.pop(),u=n.pop(),z(n.pop(),(function(o,c){var f=t[o];f&&e&&(f=f.replace("to",e+"to")),Object.defineProperty(u,o,{configurable:!1,enumerable:!0,writable:!1,value:r.apply(null,n.concat(c,f))})})),u}function J(n,t,r){return H([n,t,{},r])}function Q(n,t){e.forEach((function(e){n[e].of=J(t,r[e].of)}))}m.not=J(R,h,"not "),m.maybe=J(R,v,"maybe "),e.forEach((function(n){r[n].of=H([G.bind(null,null),r[n],r,{},""])})),Q(m,R),Q(h,_),e.forEach((function(n){v[n].of=H([G.bind(null,"maybe"),r[n],r,{},""]),m.maybe[n].of=J(R,v[n].of),m.not[n].of=J(R,h[n].of)}));var W=M(p,{assert:m,not:h,maybe:v}),X=function(n,t){W.assert.array(n),W.assert.function(t);for(var r=[],e=n.length,u=0;u<e;u++)r.push(t(n[u]));return r},Z=function(n){return W.assert.array.of.array(n),[].concat.apply([],n)},$=function(n){W.assert.array(n),W.assert.array.of.nonEmptyArray(n);for(var t=[[]];n.length;)t=Z(n.shift().map((function(n){return t.map((function(t){return t.concat([n])}))})));return t},nn={flex:"fx",background:"bg",min:"n",max:"x",style:"st",overflow:"ov",cursor:"cu"},tn=/\{[a-z]+\}/gi,rn=function(n){return nn[n]||n[0]},en=function(n){return"".concat(n[0],":").concat(n[1])},un=function(n){return[["",""]].concat(n)},on=function(n){return n[0].toUpperCase()},cn=function(t,r){var e=r[1].reduce((function(n,t){return[n[0].concat(t[0].match(tn)||[]),n[1].concat(t[1].match(tn)||[])]}),[[],[]]);return X($(X(e[0].concat(e[1]),(function(n){return X(Object.keys(t[n]),(function(r){return[n,r,t[n][r]]}))}))),(function(t){for(var e=function t(r){if(W.assert.not.function(r),"object"!==n(r))return r;W.assert.array(r);for(var e=[],u=r.length,o=0;o<u;o++)e.push(t(r[o]));return e}(r),u=0;e[0].includes("&");u++)e[0]=e[0].replace("&",t[u][1]);for(var o=0;o<e[1].length;o++)for(var c=e[1][o];t.length>0&&c[0].includes(t[0][0]);){var f=t.shift();c[0]=c[0].replace(f[0],f[2])}for(var i=0;i<e[1].length;i++)for(var a=e[1][i];t.length>0&&a[1].includes(t[0][0]);){var s=t.shift();a[1]=a[1].replace(s[0],s[2])}return e}))},fn=function(n){var t=X(n[0].split("-"),rn).join("");return X(n[1],(function(r){return["".concat(t).concat(X(r.split(" "),on).join("")),[[n[0],r]]]}))},an=function(n){return"@"===n[0][0]?"".concat(n[0],"{").concat(sn(n[1]),"}"):".".concat(n[0],"{").concat(X(n[1],en).join(";"),"}")},sn=function(n){return X(n,an).join("")};return function(n){return sn(function(n){var t=[].concat(Z(X(n.defs||[],(function(t){return cn(n,t)}))),Z(X(n.props||[],fn)),n.raw||[]);return Z(X($(X(n.mods||[],un)),(function(n){return n.reduce((function(n,t){return t[1]?"@"===t[1][0]?[[t[1],X(n,(function(n){return["".concat(t[0]).concat(n[0]),n[1]]}))]]:X(n,(function(n){return["".concat(t[0]).concat(n[0]).concat(t[1]),n[1]]})):n}),t)})))}(n))}}();
//# sourceMappingURL=compiler.lite.es5.js.map
