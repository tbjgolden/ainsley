var ac=function(n,t){"use strict";function r(n){return(r="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(n){return typeof n}:function(n){return n&&"function"==typeof Symbol&&n.constructor===Symbol&&n!==Symbol.prototype?"symbol":typeof n})(n)}t=t&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t;var o=function(n,t){for(var r=[],o=n.length,c=0;c<o;c++)r.push(t(n[c]));return r},c=function(n){return[].concat.apply([],n)},e=function(n){var t=[[]];for(console.log(n.length,n);n.length;)t=c(n.shift().map((function(n){return t.map((function(t){return t.concat([n])}))})));return t},u={flex:"fx",background:"bg",min:"n",max:"x",style:"st",overflow:"ov",cursor:"cu"},a=/\{[a-z]+\}/gi,f=function(n){return u[n]||n[0]},i=function(n){return"".concat(n[0],":").concat(n[1])},l=function(n){return[["",""]].concat(n)},s=function(n,t){var c=t[1].reduce((function(n,t){return[n[0].concat(t[0].match(a)||[]),n[1].concat(t[1].match(a)||[])]}),[[],[]]);return o(e(o(c[0].concat(c[1]),(function(t){return o(Object.keys(n[t]),(function(r){return[t,r,n[t][r]]}))}))),(function(n){for(var o=function n(t){if("object"!==r(t))return t;for(var o=[],c=t.length,e=0;e<c;e++)o.push(n(t[e]));return o}(t),c=0;o[0].includes("&");c++)o[0]=o[0].replace("&",n[c][1]);for(var e=0;e<o[1].length;e++)for(var u=o[1][e];n.length>0&&u[0].includes(n[0][0]);){var a=n.shift();u[0]=u[0].replace(a[0],a[2])}for(var f=0;f<o[1].length;f++)for(var i=o[1][f];n.length>0&&i[1].includes(n[0][0]);){var l=n.shift();i[1]=i[1].replace(l[0],l[2])}return o}))},p=function(n){var t=o(n[0].split("-"),f).join("");return o(n[1],(function(r){return["".concat(t).concat(o(r.split(" "),(function(n){return n[0].toUpperCase()})).join("")),[[n[0],r]]]}))},y=function(n){var t=[].concat(c(o(n.defs||[],(function(t){return s(n,t)}))),c(o(n.props||[],p)),n.raw||[]);return c(o(e(o(n.mods||[],l)),(function(n){return n.reduce((function(n,t){return t[1]?"@"===t[1][0]?[[t[1],o(n,(function(n){return["".concat(t[0]).concat(n[0]),n[1]]}))]]:o(n,(function(n){return["".concat(t[0]).concat(n[0]).concat(t[1]),n[1]]})):n}),t)})))},v=function(n){return"@"===n[0][0]?"".concat(n[0],"{").concat(h(n[1]),"}"):".".concat(n[0],"{").concat(o(n[1],i).join(";"),"}")},h=function(n){return o(n,v).join("")},g=function(n){return h(y(n))};return t&&t(g),n.ainsleyInsert=function(n,t){for(var r=y(n),o=r.length-1;o>=0;o--)t.insertRule(v(r[o]),0)},n.ainsleyToAst=y,n.ainsleyToCss=g,n.astToCss=h,n.expandDefs=s,n.expandProps=p,n.iteratorRegex=a,n.propFragMap=u,n.ruleToCSS=v,n}({},accb);
//# sourceMappingURL=compiler.es5.web.js.map
