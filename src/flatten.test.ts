import { Ainsley, AinsleyChild } from "./types";
import { flatten, defaultGetConfig } from "./flatten";

test("basic example", () => {
  const start: Ainsley = {
    children: [
      "$not-a-real-config",
      "body{margin:0}"
    ]
  };

  const mockGetConfig = jest.fn(name => {
    if (name === "not-a-real-config") {
      return {
        children: [
          "$also-not-a-real-config",
          ".h1{font-size:69px}"
        ]
      };
    } else if (name === "also-not-a-real-config") {
      return {
        children: [
          "*{box-sizing:border-box}"
        ]
      }
    }
    return `/* $${name} */`;
  }) as (name: string) => Ainsley;


  expect(flatten(start)).toEqual(flatten(start, defaultGetConfig));
  expect(flatten(start)).toEqual({"children": ["/* $not-a-real-config */", "body{margin:0}"]});
  expect(flatten(start, mockGetConfig)).toEqual({"children": [{"children": [{"children": ["*{box-sizing:border-box}"]}, ".h1{font-size:69px}"]}, "body{margin:0}"]});
});
