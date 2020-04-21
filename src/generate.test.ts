import { Ainsley } from "./types";
import { generate } from "./generate";

const basicInput: Ainsley = {
  variations: [[["s", "@media(min-width:384px)"]]],
  variables: {
    length: {
      0: 0,
      1: "1px"
    },
    colors: {
      b: "black",
      w: "white",
      p: "#313375",
      s: "#b4d455"
    }
  },
  children: [
    "*{box-sizing:border-box}",
    ["c", [["color", "{colors}"]]],
    "*{outline-offset:0}",
    ["b", [["border", "{length} solid {colors}"]]],
    ".h1{font-size:69px}body{margin:0}",
    [
      "Display",
      {
        n: "none",
        b: "block"
      }
    ]
  ]
};

describe("compiler", () => {
  test("compiles ainsley as expected", () => {
    expect(generate(basicInput)).toEqual(
      "*{box-sizing:border-box}.cB{color:black}.cW{color:white}.cP{color:#313375}.cS{color:#b4d455}*{outline-offset:0}.b0B{border:0 solid black}.b1B{border:1px solid black}.b0W{border:0 solid white}.b1W{border:1px solid white}.b0P{border:0 solid #313375}.b1P{border:1px solid #313375}.b0S{border:0 solid #b4d455}.b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.dN{display:none}.dB{display:block}@media(min-width:384px){*{box-sizing:border-box}.s-cB{color:black}.s-cW{color:white}.s-cP{color:#313375}.s-cS{color:#b4d455}*{outline-offset:0}.s-b0B{border:0 solid black}.s-b1B{border:1px solid black}.s-b0W{border:0 solid white}.s-b1W{border:1px solid white}.s-b0P{border:0 solid #313375}.s-b1P{border:1px solid #313375}.s-b0S{border:0 solid #b4d455}.s-b1S{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.s-dN{display:none}.s-dB{display:block}}"
    );
  });

  test("compiles ainsley with partial options (even index) as expected", () => {
    expect(
      generate(basicInput, {
        addVariationToSelector: (a, b) => a + "_" + b,
        addValueToSelector: (a, b) => a + "\\:" + b
      })
    ).toEqual(
      "*{box-sizing:border-box}.c\\:b{color:black}.c\\:w{color:white}.c\\:p{color:#313375}.c\\:s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b{border:0 solid black}.b\\:1\\:b{border:1px solid black}.b\\:0\\:w{border:0 solid white}.b\\:1\\:w{border:1px solid white}.b\\:0\\:p{border:0 solid #313375}.b\\:1\\:p{border:1px solid #313375}.b\\:0\\:s{border:0 solid #b4d455}.b\\:1\\:s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.d\\:n{display:none}.d\\:b{display:block}@media(min-width:384px){*{box-sizing:border-box}.c\\:b_s{color:black}.c\\:w_s{color:white}.c\\:p_s{color:#313375}.c\\:s_s{color:#b4d455}*{outline-offset:0}.b\\:0\\:b_s{border:0 solid black}.b\\:1\\:b_s{border:1px solid black}.b\\:0\\:w_s{border:0 solid white}.b\\:1\\:w_s{border:1px solid white}.b\\:0\\:p_s{border:0 solid #313375}.b\\:1\\:p_s{border:1px solid #313375}.b\\:0\\:s_s{border:0 solid #b4d455}.b\\:1\\:s_s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.d\\:n_s{display:none}.d\\:b_s{display:block}}"
    );
  });
});
