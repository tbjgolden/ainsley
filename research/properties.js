const map = require('./propertyValueMap.json');
const fs = require("fs");
const path = require("path");

const missingProps = `
border-top-width
border-right-width
border-bottom-width
border-left-width
border-top-color
border-right-color
border-bottom-color
border-left-color
overflow-wrap
`.split("\n").filter(Boolean);

const svgProps = new Set(`
alignment-baseline
baseline-shift
dominant-baseline
glyph-orientation-horizontal
glyph-orientation-vertical
kerning
text-anchor
clip
clip-path
clip-rule
mask
enable-background
flood-color
flood-opacity
lighting-color
stop-color
stop-opacity
color-profile
color-interpolation
color-interpolation-filters
color-rendering
fill
fill-rule
fill-opacity
image-rendering
marker
marker-start
marker-mid
marker-end
shape-rendering
stroke
stroke-dasharray
stroke-dashoffset
stroke-linecap
stroke-linejoin
stroke-miterlimit
stroke-opacity
stroke-width
`.split("\n").filter(Boolean));

const shorthandProps = new Set(`
background
font
padding
margin
border
border-width
border-style
border-color
border-top
border-right
border-bottom
border-left
`.split("\n").filter(Boolean));

const longhandProps = new Set(`
flex-grow
flex-shrink
flex-basis
overflow-x
overflow-y
`.split("\n").filter(Boolean));

const resetProps = new Set(`
appearance
box-sizing
outline
text-rendering
content
list-style
border-collapse
`.split("\n").filter(Boolean));

const overspecificProps = new Set(`
animation
animation-play-state
animation-timing-function
animation-name
animation-duration
animation-timing-function
animation-delay
animation-iteration-count
animation-direction
animation-fill-mode
background-image
border-top-left-radius
border-top-right-radius
border-bottom-left-radius
border-bottom-right-radius
filter
order
float
clear
transform
transition
zoom
grid-column
grid-row
list-style-type
transition-duration
src
`.split("\n").filter(Boolean));

const abbrWord = word => {
  // only things left are _, empty string and digits
  const abbrev = ({
    "flex": "fx",
    "background": "bg",
    "min": "n",
    "max": "x",
    "style": "st",
    "overflow": "ov",
    "cursor": "cu"
  })[word];
  return abbrev === undefined ? word[0] : abbrev;
};

const sortedAttrs = [
  ...map
    .filter(([prop, vals]) => {
      if (resetProps.has(prop)) return false;
      if (svgProps.has(prop)) return false;
      if (shorthandProps.has(prop)) return false;
      if (longhandProps.has(prop)) return false;
      if (overspecificProps.has(prop)) return false;
      if (vals.length < 2) return false;
      return true;
    })
    .map(([prop, vals]) => [
      prop,
      vals[0][1] / Math.pow(vals.length, 0.5)
    ])
    .filter(([, score]) => score > 100)
    .sort(([, a], [, b]) => b - a)
    .map(([prop]) => prop),
  ...missingProps
];

const abbrevMap = {}
// "abcdefghijklmnopqrstuvwxyz".split("")
//   .reduce((o, c) => ({
//     ...o,
//     [c]: undefined
//   }), {});

sortedAttrs.forEach((prop) => {
  const abbrev = prop.split("-").map(abbrWord).join("");
  if (abbrevMap[abbrev] !== undefined) {
    console.log("!", abbrev, abbrevMap[abbrev], prop);
  }
  abbrevMap[abbrev] = prop;
})

let str = "";

Object.entries(abbrevMap)
  .sort(([a], [b]) => (a > b ? 1 : -1))
  .map(([a, b]) => {
    str += `${a.padEnd(4, " ")} ${b}\n`;
  });

fs.writeFileSync(path.join(__dirname, "propMap.txt"), str);
