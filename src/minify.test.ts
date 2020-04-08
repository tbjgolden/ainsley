import { Ainsley, AinsleyChild } from "./types";
import { minify } from "./minify";

describe("minify tests", () => {
  test("example one", () => {
    const start: Ainsley = {
      children: [
        {
          variables: {
            colors: {
              b: "black",
              w: "white"
            }
          },
          children: [
            {
              variables: {
                "+colors": {
                  p: "#313375",
                  s: "#b4d455"
                }
              },
              children: [
                "*{box-sizing:border-box}",
                ["&", [["color", "{colors}"]]],
                {
                  variables: {
                    "?colors": {
                      gray: "#333"
                    },
                    unused: {
                      magic: "val"
                    }
                  },
                  children: [
                    "*{outline-offset:0}",
                    ["b&", [["border-color", "{colors}"]]]
                  ]
                }
              ]
            },
            ".h1{font-size:69px}"
          ]
        },
        "body{margin:0}"
      ]
    };

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: "black",
          w: "white",
          p: "#313375",
          s: "#b4d455"
        }
      },
      children: [
        "*{box-sizing:border-box}",
        ["&", [["color", "{colors}"]]],
        "*{outline-offset:0}",
        ["b&", [["border-color", "{colors}"]]],
        ".h1{font-size:69px}",
        "body{margin:0}"
      ]
    });
  });

  test("example two", () => {
    const start: Ainsley = {
      children: [
        {
          variables: {
            colors: {
              b: "black",
              w: "white"
            }
          },
          children: [
            {
              variables: {
                "+colors": {
                  p: "#313375",
                  s: "#b4d455"
                }
              },
              children: [
                "*{box-sizing:border-box}",
                ["&", [["color", "{colors}"]]],
                {
                  variables: {
                    "?colors": {
                      gray: "#333"
                    },
                    unused: {
                      magic: "val"
                    }
                  },
                  children: [
                    "*{outline-offset:0}",
                    ["b&", [["border-color", "{colors}"]]]
                  ]
                }
              ]
            },
            ".h1{font-size:69px}",
            ["bg&", [["background-color", "{colors}"]]]
          ]
        },
        "body{margin:0}"
      ]
    };

    expect(minify(start)).toEqual({
      variables: {
        colors: {
          b: "black",
          w: "white"
        }
      },
      children: [
        {
          variables: {
            "+colors": {
              p: "#313375",
              s: "#b4d455"
            }
          },
          children: [
            "*{box-sizing:border-box}",
            ["&", [["color", "{colors}"]]],
            "*{outline-offset:0}",
            ["b&", [["border-color", "{colors}"]]]
          ]
        },
        ".h1{font-size:69px}",
        ["bg&", [["background-color", "{colors}"]]],
        "body{margin:0}"
      ]
    });
  });

  test.skip("example three", () => {
    // investigate how variations messes with things
    // investigate how variables at top level are different
    const start: Ainsley = {
      variables: {
        colors: {
          b: "black"
        }
      },
      variations: [[["h-", ":hover"]]],
      children: [
        {
          variations: [[["f-", ":focus"]]],
          children: [
            {
              variables: {
                "+colors": { p: "#313375" }
              },
              children: [["&", [["color", "{colors}"]]]]
            }
          ]
        },
        "body{margin:0}"
      ]
    };

    expect(minify(start)).not.toEqual(start);
  });

  test.skip("example four", () => {
    // investigate why this doesn't work
    const start: Ainsley = {
      variations: [
        [
          ["s", "@media(min-width:384px)"],
          ["m", "@media(min-width:768px)"],
          ["l", "@media(min-width:1024px)"]
        ]
      ],
      variables: {
        colors: {
          b: "black",
          w: "white"
        }
      },
      children: [
        {
          variables: {
            "+colors": {
              lg: "#eee",
              g: "#888",
              dg: "#222"
            }
          },
          children: [["bgc", [["background-color", "bgc"]]]]
        }
      ]
    };

    expect(minify(start)).toEqual({
      variations: [
        [
          ["s", "@media(min-width:384px)"],
          ["m", "@media(min-width:768px)"],
          ["l", "@media(min-width:1024px)"]
        ]
      ],
      variables: {
        colors: {
          b: "black",
          w: "white",
          lg: "#eee",
          g: "#888",
          dg: "#222"
        }
      },
      children: [["bgc", [["background-color", "bgc"]]]]
    });
  });
});
