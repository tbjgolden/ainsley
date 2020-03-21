// this is only run at build time; only the compiler will be added to the bundle
const { base, extend } = require("ainsley");

module.exports = extend([
  base,
  {
    defs: [["fof&", [["font-family", "{fontFamily}"]]]],
    props: [["Resize", ["None", "Both", "Horizontal", "Vertical"]]],
    "{fontFamily}": {
      SANS:
        "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Oxygen-Sans,Ubuntu,Cantarell,'Helvetica Neue',sans-serif",
      SERIF:
        "Constantia,'Lucida Bright',Lucidabright,'Lucida Serif',Lucida,'DejaVu Serif','Bitstream Vera Serif','Liberation Serif',Georgia,serif",
      MONO:
        "Consolas,'Andale Mono WT','Andale Mono','Lucida Console','Lucida Sans Typewriter','DejaVu Sans Mono','Bitstream Vera Sans Mono','Liberation Mono','Nimbus Mono L',Monaco,'Courier New',Courier,monospace"
    }
  }
]);
