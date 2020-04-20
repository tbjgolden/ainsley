import { Ainsley } from "./types";
import { generate } from "./generate";

describe("compiler", () => {
  test("compiles ainsley as expected", () => {
    const basicInput: Ainsley = {
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

    expect(generate(basicInput)).toEqual(
      "*{box-sizing:border-box}.cb{color:black}.cw{color:white}.cp{color:#313375}.cs{color:#b4d455}*{outline-offset:0}.b0b{border:0 solid black}.b1b{border:1px solid black}.b0w{border:0 solid white}.b1w{border:1px solid white}.b0p{border:0 solid #313375}.b1p{border:1px solid #313375}.b0s{border:0 solid #b4d455}.b1s{border:1px solid #b4d455}.h1{font-size:69px}body{margin:0}.dn{display:none}.db{display:block}"
    );
  });
});
