const props = [
  "color",
  "background-color",
  "font-size",
  "text-decoration",
  "font-style",
  "font-weight",
  "text-transform",
  "line-height",
  "white-space",
  "hyphens",
  "overflow-wrap",
  "height",
  "padding-bottom",
  "background-repeat",
  "background-position",
  "background-size",
  "border-style",
  "border-top-style",
  "border-right-style",
  "border-bottom-style",
  "border-left-style",
  "border-color",
  "border-top-color",
  "border-right-color",
  "border-bottom-color",
  "border-left-color",
  "border-radius",
  "border-top-left-radius",
  "border-bottom-left-radius",
  "border-top-right-radius",
  "border-width",
  "border-top-width",
  "border-right-width",
  "border-bottom-width",
  "border-left-width",
  "flex",
  "flex-direction",
  "flex-wrap",
  "align-items",
  "align-self",
  "justify-content",
  "align-content",
  "order",
  "min-height",
  "width",
  "min-width",
  "max-width",
  "overflow",
  "position",
  "opacity",
  "transform-origin",
  "transform",
  "padding",
  "margin",
  "padding-left",
  "margin-left",
  "padding-top",
  "margin-top",
  "padding-right",
  "margin-right",
  "margin-bottom",
  "top",
  "left",
  "bottom",
  "right",
  "text-align",
  "vertical-align",
  "float",
  "content",
  "clear",
  "visibility",
  "cursor",
  "z-index",
  "display",
  "transition-property",
  "transition-duration",
  "transition-timing-function",
  "transition-delay",
  "pointer-events",
  "user-select"
];

const map = {};
props.forEach(propName => {
  const abbrev = propName
    .split("-")
    .map(w => w[0])
    .join("");
  map[abbrev] = [...(map[abbrev] || []), propName];
});

console.log(map);
