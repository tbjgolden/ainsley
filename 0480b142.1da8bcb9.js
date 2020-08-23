(window.webpackJsonp=window.webpackJsonp||[]).push([[3],{121:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return m}));var r=n(0),o=n.n(r);function i(e,t,n){return t in e?Object.defineProperty(e,t,{value:n,enumerable:!0,configurable:!0,writable:!0}):e[t]=n,e}function a(e,t){var n=Object.keys(e);if(Object.getOwnPropertySymbols){var r=Object.getOwnPropertySymbols(e);t&&(r=r.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),n.push.apply(n,r)}return n}function s(e){for(var t=1;t<arguments.length;t++){var n=null!=arguments[t]?arguments[t]:{};t%2?a(Object(n),!0).forEach((function(t){i(e,t,n[t])})):Object.getOwnPropertyDescriptors?Object.defineProperties(e,Object.getOwnPropertyDescriptors(n)):a(Object(n)).forEach((function(t){Object.defineProperty(e,t,Object.getOwnPropertyDescriptor(n,t))}))}return e}function c(e,t){if(null==e)return{};var n,r,o=function(e,t){if(null==e)return{};var n,r,o={},i=Object.keys(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||(o[n]=e[n]);return o}(e,t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(e);for(r=0;r<i.length;r++)n=i[r],t.indexOf(n)>=0||Object.prototype.propertyIsEnumerable.call(e,n)&&(o[n]=e[n])}return o}var l=o.a.createContext({}),b=function(e){var t=o.a.useContext(l),n=t;return e&&(n="function"==typeof e?e(t):s({},t,{},e)),n},p=function(e){var t=b(e.components);return o.a.createElement(l.Provider,{value:t},e.children)},d={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},u=Object(r.forwardRef)((function(e,t){var n=e.components,r=e.mdxType,i=e.originalType,a=e.parentName,l=c(e,["components","mdxType","originalType","parentName"]),p=b(n),u=r,m=p["".concat(a,".").concat(u)]||p[u]||d[u]||i;return n?o.a.createElement(m,s({ref:t},l,{components:n})):o.a.createElement(m,s({ref:t},l))}));function m(e,t){var n=arguments,r=t&&t.mdxType;if("string"==typeof e||r){var i=n.length,a=new Array(i);a[0]=u;var s={};for(var c in t)hasOwnProperty.call(t,c)&&(s[c]=t[c]);s.originalType=e,s.mdxType="string"==typeof e?e:r,a[1]=s;for(var l=2;l<i;l++)a[l]=n[l];return o.a.createElement.apply(null,a)}return o.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"},97:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"metadata",(function(){return a})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return l}));var r=n(2),o=(n(0),n(121));const i={id:"faq",title:"FAQs"},a={id:"faq",title:"FAQs",description:"### Hasn't this already been done?",source:"@site/docs/faq.md",permalink:"/ainsley/docs/faq",editUrl:"https://github.com/tbjgolden/ainsley/edit/master/website/docs/faq.md",sidebar:"sidebar",previous:{title:"Syntax",permalink:"/ainsley/docs/syntax"},next:{title:"ainsley",permalink:"/ainsley/docs/api/index"}},s=[{value:"Hasn&#39;t this already been done?",id:"hasnt-this-already-been-done",children:[]},{value:"How to avoid Flash of Unstyled Content? (FOUC)",id:"how-to-avoid-flash-of-unstyled-content-fouc",children:[]},{value:"How is the compiler so small?",id:"how-is-the-compiler-so-small",children:[]},{value:"How do I get this working with Autoprefixer/PostCSS?",id:"how-do-i-get-this-working-with-autoprefixerpostcss",children:[]}],c={rightToc:s};function l({components:e,...t}){return Object(o.b)("wrapper",Object(r.a)({},c,t,{components:e,mdxType:"MDXLayout"}),Object(o.b)("h3",{id:"hasnt-this-already-been-done"},"Hasn't this already been done?"),Object(o.b)("p",null,"The most popular implementation of something like this is ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"http://lesscss.org/usage/#using-less-in-the-browser"}),"Less.js"),", which includes a client-side implementation of their Less to CSS compiler; which offers a similar feature set, except at 40kB (the ainsley compiler is 1kB)."),Object(o.b)("p",null,"Less.js is bigger than its output CSS in typical use, making it an inefficient option if speed or bytes are your objective."),Object(o.b)("h3",{id:"how-to-avoid-flash-of-unstyled-content-fouc"},"How to avoid Flash of Unstyled Content? (FOUC)"),Object(o.b)("p",null,"When using this library, some users will get a Flash of Unstyled Content."),Object(o.b)("p",null,"This library doesn't prescribe a specific pattern, but a common method is to add ",Object(o.b)("inlineCode",{parentName:"p"},'style="visibility: hidden;"')," to your body tag, and then remove it after generating and embedding your CSS:"),Object(o.b)("pre",null,Object(o.b)("code",Object(r.a)({parentName:"pre"},{className:"language-js"}),"Ainsley.embed(Ainsley.generate({ /* ... */ }))\ndocument.body.style.visibility = ''\n")),Object(o.b)("div",{className:"admonition admonition-note alert alert--secondary"},Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-heading"}),Object(o.b)("h5",{parentName:"div"},Object(o.b)("span",Object(r.a)({parentName:"h5"},{className:"admonition-icon"}),Object(o.b)("svg",Object(r.a)({parentName:"span"},{xmlns:"http://www.w3.org/2000/svg",width:"14",height:"16",viewBox:"0 0 14 16"}),Object(o.b)("path",Object(r.a)({parentName:"svg"},{fillRule:"evenodd",d:"M6.3 5.69a.942.942 0 0 1-.28-.7c0-.28.09-.52.28-.7.19-.18.42-.28.7-.28.28 0 .52.09.7.28.18.19.28.42.28.7 0 .28-.09.52-.28.7a1 1 0 0 1-.7.3c-.28 0-.52-.11-.7-.3zM8 7.99c-.02-.25-.11-.48-.31-.69-.2-.19-.42-.3-.69-.31H6c-.27.02-.48.13-.69.31-.2.2-.3.44-.31.69h1v3c.02.27.11.5.31.69.2.2.42.31.69.31h1c.27 0 .48-.11.69-.31.2-.19.3-.42.31-.69H8V7.98v.01zM7 2.3c-3.14 0-5.7 2.54-5.7 5.68 0 3.14 2.56 5.7 5.7 5.7s5.7-2.55 5.7-5.7c0-3.15-2.56-5.69-5.7-5.69v.01zM7 .98c3.86 0 7 3.14 7 7s-3.14 7-7 7-7-3.12-7-7 3.14-7 7-7z"})))),"note")),Object(o.b)("div",Object(r.a)({parentName:"div"},{className:"admonition-content"}),Object(o.b)("p",{parentName:"div"},"The Webkit team wrote an interesting blog post on why it's hard for browsers to determine when to show the page's content: ",Object(o.b)("a",Object(r.a)({parentName:"p"},{href:"https://webkit.org/blog/66/the-fouc-problem/"}),"https://webkit.org/blog/66/the-fouc-problem/")),Object(o.b)("p",{parentName:"div"},"Browsers' algorithms for this don't factor in JavaScript; so we need to tell it when to show it."))),Object(o.b)("h3",{id:"how-is-the-compiler-so-small"},"How is the compiler so small?"),Object(o.b)("p",null,"Wow, I'm glad you asked...."),Object(o.b)("p",null,"A bunch of factors combine:"),Object(o.b)("ul",null,Object(o.b)("li",{parentName:"ul"},"JavaScript minifies well"),Object(o.b)("li",{parentName:"ul"},"It doesn't check your input at runtime (build time steps, do this instead)"),Object(o.b)("li",{parentName:"ul"},'It doesn\'t try to fully "solve" CSS by checking property names and values'),Object(o.b)("li",{parentName:"ul"},"It uses some newer, shorter, ES6+ syntax"),Object(o.b)("li",{parentName:"ul"},"The variables and options were named using words from the brotli dictionary")),Object(o.b)("h3",{id:"how-do-i-get-this-working-with-autoprefixerpostcss"},"How do I get this working with Autoprefixer/PostCSS?"),Object(o.b)("p",null,"Unfortunately, you can't... ",Object(o.b)("em",{parentName:"p"},"yet"),"."),Object(o.b)("p",null,"Watch this space."))}l.isMDXComponent=!0}}]);