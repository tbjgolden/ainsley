/*!
ainsley MIT @tbjgolden
*/
var Ainsley=(t=>{const o=t=>{let o=[[]],r=0;for(;r<t.length;)o=t[r++].flatMap(t=>o.map(o=>o.concat([t])));return o},r={addVariationToSelector:(t,o)=>o+"_"+t,addPropertyToSelector:(t,o)=>t+"-"+o,addValueToSelector:(t,o)=>t+"-"+o,abbreviateProperty:t=>[t.split("-").map(t=>t[0]).join(""),t]},e=/\{[a-zA-Z0-9_-]+\}/g,n=(t,r,e)=>{var n;const l={...e};if(void 0!==t.variables){const o=t.variables;Object.keys(o).map(t=>{var r;const n=u(t),c=n[0],s=n[1];0===c||1===c&&void 0===l[s]?l[s]=o[t]:2===c&&(l[s]={...null!==(r=e[s])&&void 0!==r?r:{},...o[t]})})}const s=void 0===t.children?[]:c(t.children,r,l);return o((null!==(n=t.variations)&&void 0!==n?n:[]).map(t=>[["",""]].concat(t))).flatMap(t=>s.map(o=>({t:[...t,...o.t],o:o.o})))},c=(t,o,r)=>t.flatMap(t=>"string"==typeof t?[{t:[],o:t}]:Array.isArray(t)?Array.isArray(t[1])?l(t,o,r):s(t,o):n(t,o,r)),l=(t,r,n)=>{const c=t[0],l=t[1],s=[];return l.map(t=>{var o,r;const n=null!==(o=t[0].match(e))&&void 0!==o?o:[],c=null!==(r=(""+t[1]).match(e))&&void 0!==r?r:[];n.map(t=>s.push([t,0])),c.map(t=>s.push([t,1]))}),o(s.map(t=>{const o=t[0],r=t[1],e=o.slice(1,-1);return Object.keys(n[e]).map(t=>[o,t,n[e][t],r])})).map(t=>{let o=0,e=t[o];return{t:[],o:[t.reduce((t,o)=>0===o[3]?r.addPropertyToSelector(t,o[1]):r.addValueToSelector(t,o[1]),c),l.map(r=>{const n=r=>{for(;o<t.length&&r.includes(e[0]);)r=r.replace(e[0],""+e[2]),e=t[++o];return r};return[n(r[0]),n(""+r[1])]})]}})},s=(t,o)=>{const r=t[1],e=o.abbreviateProperty(t[0]),n=e[0],c=e[1];return Object.keys(r).map(t=>({t:[],o:[o.addValueToSelector(o.addPropertyToSelector("",n),t),[[c,r[t]]]]}))},u=t=>{const o="?+".indexOf(t[0])+1;return[o,o>0?t.slice(1):t]};return t.DEFAULT_OPTIONS=r,t.ITERATOR_REGEX="\\{[a-zA-Z0-9_-]+\\}",t.embed=(t,o)=>{let r=null;void 0!==o&&(r=document.querySelector("style#"+o)),null===r&&(r=document.createElement("style"),r.type="text/css",void 0!==o&&r.setAttribute("id",o),document.head.appendChild(r)),r.innerHTML=t},t.generate=(t,o={})=>{const e={...r,...o};return((t,o)=>{let r="",e=[];for(let n=0;n<t.length;n++){const c=t[n];let l=0;for(;l<e.length&&e[l]===c.t[l];)l+=1;const s=e.slice(l);for(const t of s)t[1].startsWith("@")&&(r+="}");const u=c.t.slice(l);for(const t of u){const o=t[1];o.startsWith("@")&&(r+=o+"{")}if("string"==typeof c.o)r+=c.o;else{let t=c.o[0],e="";for(let r=0;r<c.t.length;r++){const n=c.t[r][0],l=c.t[r][1];""!==l&&(l.startsWith("@")||(e+=""+l),t=o.addVariationToSelector(t,n))}r+=`.${t}${e}{${c.o[1].map(t=>`${t[0]}:${t[1]}`).join(";")}}`}e=c.t}for(const t of e)t[1].startsWith("@")&&(r+="}");return r})(n(t,e,{}),e)},t})({});
//# sourceMappingURL=ac.js.map