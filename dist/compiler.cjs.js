"use strict";Object.defineProperty(exports,"__esModule",{value:!0});const e=/\{[a-z]+\}/gi,t=e=>[].concat.apply([],e),o=e=>{let o=[[]];for(;e.length;)o=t(e.shift().map(e=>o.map(t=>t.concat([e]))));return o},s={flex:"fx",background:"bg",min:"n",max:"x",style:"st",overflow:"ov",cursor:"cu"},a=(t,s)=>{let a=[],r=[];return s[1].forEach(t=>{a=a.concat(t[0].match(e)||[]),r=r.concat(t[1].match(e)||[])}),o(a.concat(r).map(e=>Object.keys(t[e]).map(o=>[e,o,t[e][o]]))).map(e=>{const t=JSON.parse(JSON.stringify(s));for(let o=0;t[0].includes("&");o++)t[0]=t[0].replace("&",e[o][1]);for(let o=0;o<t[1].length;o++){const s=t[1][o];for(;e.length>0&&s[0].includes(e[0][0]);){const t=e.shift();s[0]=s[0].replace(t[0],t[2])}}for(let o=0;o<t[1].length;o++){const s=t[1][o];for(;e.length>0&&s[1].includes(e[0][0]);){const t=e.shift();s[1]=s[1].replace(t[0],t[2])}}return t})},r=e=>{const t=e[0].split("-").map(e=>s[e]||e[0]).join("");return e[1].map(o=>[`${t}${o.split(" ").map(e=>e[0].toUpperCase()).join("")}`,[[e[0],o]]])},n=e=>{const s=[].concat(t((e.defs||[]).map(t=>a(e,t))),t((e.props||[]).map(r)),e.raw||[]);return t(o((e.mods||[]).map(e=>[["",""]].concat(e))).map(e=>e.reduce((e,t)=>t[1]?"@"===t[1][0]?[[t[1],e.map(e=>[`${t[0]}${e[0]}`,e[1]])]]:e.map(e=>[`${t[0]}${e[0]}${t[1]}`,e[1]]):e,s)))},p=e=>e.map(e=>"@"===e[0][0]?`${e[0]}{${p(e[1])}}`:`.${e[0]}{${e[1].map(e=>e.join(":")).join(";")}}`).join("");exports.ainsleyToAst=n,exports.ainsleyToCss=e=>p(n(e)),exports.astToCss=p,exports.expandDefs=a,exports.expandProps=r,exports.propFragMap=s;
