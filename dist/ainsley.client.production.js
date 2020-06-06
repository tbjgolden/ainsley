/*! ainsley MIT @tbjgolden */
var Ainsley=function(t){"use strict";const o=t=>{let o=[[]],n=0;for(;n<t.length;)o=t[n++].flatMap(t=>o.map(o=>o.concat([t])));return o},n={addVariationToSelector:(t,o)=>o+"-"+t,addPropertyToSelector:(t,o)=>t+o.toLowerCase(),addValueToSelector:(t,o)=>t+o.toUpperCase(),abbreviateProperty:t=>[t.split("-").map(t=>t.charAt(0)).join("").toLowerCase(),t.toLowerCase()]},r=/\{[a-zA-Z0-9_-]+\}/g,e=(t,o)=>{let n="",r=[];for(let e=0;e<t.length;e++){const c=t[e];let s=0;for(;s<r.length&&r[s]===c.t[s];)s+=1;const i=r.slice(s);for(const t of i){t[1].startsWith("@")&&(n+="}")}const l=c.t.slice(s);for(const t of l){const o=t[1];o.startsWith("@")&&(n+=o+"{")}if("string"==typeof c.o)n+=c.o;else{let t=c.o[0],r="";for(let n=0;n<c.t.length;n++){const e=c.t[n][0],s=c.t[n][1];""!==s&&(s.startsWith("@")||(r+=""+s),t=o.addVariationToSelector(t,e))}n+=`.${t}${r}{${c.o[1].map(t=>`${t[0]}:${t[1]}`).join(";")}}`}r=c.t}for(const t of r){t[1].startsWith("@")&&(n+="}")}return n},c=(t,n,r)=>{var e;const c={...r};if(void 0!==t.variables){const o=t.variables;Object.keys(o).map(t=>{var n;const e=a(t),s=e[0],i=e[1];0===s||1===s&&void 0===c[i]?c[i]=o[t]:2===s&&(c[i]={...null!==(n=r[i])&&void 0!==n?n:{},...o[t]})})}const i=void 0===t.children?[]:s(t.children,n,c);return o((null!==(e=t.variations)&&void 0!==e?e:[]).map(t=>[["",""]].concat(t))).flatMap(t=>i.map(o=>({t:[...t,...o.t],o:o.o})))},s=(t,o,n)=>t.flatMap(t=>"string"==typeof t?[{t:[],o:t}]:Array.isArray(t)?Array.isArray(t[1])?i(t,o,n):l(t,o):c(t,o,n)),i=(t,n,e)=>{const c=t[0],s=t[1],i=[];return s.map(t=>{var o,n;const e=null!==(o=t[0].match(r))&&void 0!==o?o:[],c=null!==(n=(""+t[1]).match(r))&&void 0!==n?n:[];e.map(t=>i.push([t,0])),c.map(t=>i.push([t,1]))}),o(i.map(t=>{const o=t[0],n=t[1],r=o.slice(1,-1);return r in e||console.log(e,r),Object.keys(e[r]).map(t=>[o,t,e[r][t],n])})).map(t=>{let o=0,r=t[o];return{t:[],o:[t.reduce((t,o)=>0===o[3]?n.addPropertyToSelector(t,o[1]):n.addValueToSelector(t,o[1]),c),s.map(n=>{const e=n=>{for(;o<t.length&&n.includes(r[0]);)n=n.replace(r[0],""+r[2]),r=t[++o];return n};return[e(n[0]),e(""+n[1])]})]}})},l=(t,o)=>{const n=t[1],r=o.abbreviateProperty(t[0]),e=r[0],c=r[1];return Object.keys(n).map(t=>({t:[],o:[o.addValueToSelector(o.addPropertyToSelector("",e),t),[[c,n[t]]]]}))},a=t=>{const o="?+".indexOf(t[0])+1;return[o,o>0?t.slice(1):t]};return t.DEFAULT_OPTIONS=n,t.ITERATOR_REGEX="\\{[a-zA-Z0-9_-]+\\}",t.embed=(t,o)=>{let n=null;void 0!==o&&(n=document.querySelector("style#"+o)),null===n&&(n=document.createElement("style"),n.type="text/css",void 0!==o&&n.setAttribute("id",o),document.head.appendChild(n)),n.innerHTML=t},t.generate=(t,o={})=>{const r={...n,...o};return e(c(t,r,{}),r)},t}({});
//# sourceMappingURL=ainsley.client.production.js.map
