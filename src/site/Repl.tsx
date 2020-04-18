import React, { useState, useMemo, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { flatten, minify } from "../ainsley";

import "prismjs";
import { Ainsley } from "../types";
const { highlight, languages } = window.Prism;

const brotli = import("wasm-brotli");

const isObject = (x: any) =>
  typeof x === "object" &&
  x !== null &&
  !Array.isArray(x) &&
  x instanceof Object;

const parse = (str: string) => {
  let result;
  try {
    // eslint-disable-next-line no-eval
    result = eval(`(${str})`);
  } catch (e) {
    try {
      // eslint-disable-next-line no-new-func, @typescript-eslint/no-implied-eval
      result = new Function(str)();
    } catch (e) {
      result = e.message;
    }
  }
  return result;
};

const formatBytes = (bytes: number) => {
  if (bytes < 1e3) return `${bytes}B`;
  else if (bytes < 1e4) return `${(bytes / 1e3).toFixed(1)}kB`;
  else return `${Math.round(bytes / 1e3)}kB`;
};

const Repl = () => {
  const [
    input,
    setInput
  ] = useState(`// Define your stylesheet using JavaScript, or JSON
  const breakpoints = Object.entries({ s: 384, m: 768, l: 1024 })
    .map(([prefix, pixels]) => [prefix, \`@media(min-width:\${pixels}px)\`]);
  
  // This tiny object contains all the instructions to assemble a stylesheet
  const ainsley = {
    // \`variations\` allow you to add modifiers to children
    // e.g. breakpoints, or hover styles
    variations: [breakpoints],
    // \`variables\` allow you to reuse groups of properties and values
    variables: {
      color: { b: "black", w: "white" }
    },
    children: [
      // You may use \`"$..."\` syntax to import configs and remote urls;
      // it is able to import CSS and JSON.
      "$https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css",
      // You may also use it to import configs installed by npm (or yarn);
      // this one would import the npm package "ainsley-config-example".
      "$example",
      // You may nest ainsley objects;
      // this allows you to scope variables, variations and configs.
      {
        variables: {
          // \`variables\` prefixed with a \`+\` will merge with any
          // definition higher up (otherwise, it behaves like normal).
          "+color": {
            lg: "#eee",
            g: "#888",
            dg: "#222"
          },
          // \`variables\` prefixed with a \`?\` will only be defined
          // if they have not been already been defined higher up.
          "?length": {
            0: 0,
            1: "1px",
            2: "2px"
          }
        },
        children: [
          // This is a "utility rule" - it looks like a typical CSS rule.
          // It uses a variable, which will output every possible permutation!
          ["bg", [
            ["background-color", "{color}"]
          ]],
          // This string is the prefix of the "utility class".
          // ↙ Abbreviations of \`variable\` values will be appended to it.
          ["b", [
            // "Utility rules" support multiple declarations.
            // "Utility declarations" may use any number of variables.
            ["border", "{length} {color}"],
            ["border-style", "solid"]
          ]]
        ]
      }
    ]
  }
  
  // in this REPL, use \`return\`
  return ainsley;
  
`);

  const [flattenedShown, setFlattenedShown] = useState(false);
  const [[flattened, flattenedStr], setFlattened] = useState([
    null as Ainsley | null,
    ""
  ]);

  useEffect(() => {
    const parsedInput = parse(input);
    if (isObject(parsedInput)) {
      flatten(parsedInput)
        .then((flatAinsley) => {
          setFlattened([flatAinsley, JSON.stringify(flatAinsley, null, 2)]);
        })
        .catch((error: Error) => {
          setFlattened([null, `Error while parsing:\n\n${error.message}`]);
        });
    } else if (typeof parsedInput === "string") {
      setFlattened([null, `Error while parsing:\n\n${parsedInput}`]);
    } else {
      setFlattened([null, "Error while parsing"]);
    }
  }, [input]);

  const [minifiedShown, setMinifiedShown] = useState(false);
  const [minified, minifiedStr] = useMemo(() => {
    if (flattened !== null) {
      const obj = minify(flattened);
      return [obj, JSON.stringify(obj)];
    } else {
      return [null, flattenedStr];
    }
  }, [flattened]);

  const [compressedBytes, setCompressedBytes] = useState(0);

  useEffect(() => {
    setCompressedBytes(0);
    if (minified !== null) {
      brotli
        .then(({ compress }) => {
          const result = compress(new TextEncoder().encode(minifiedStr));
          setCompressedBytes(result.byteLength);
        })
        .catch(console.error);
    }
  }, [minifiedStr]);

  useEffect(() => {
    document.body.style.display = "block";
  }, []);

  return (
    <div>
      <label htmlFor="input">
        <h2>Input</h2>
      </label>
      <div id="editor">
        <Editor
          id="input"
          value={input}
          onValueChange={setInput}
          highlight={(code) => highlight(code, languages.js, "json")}
        />
      </div>

      <h2>
        <ShowHideButton shown={flattenedShown} setShown={setFlattenedShown} />
        {" Flattened"}
        {flattened === null
          ? null
          : ` (${formatBytes(Buffer.from(flattenedStr).byteLength)})`}
      </h2>
      {flattenedShown ? (
        <pre className="output">
          <code>{flattenedStr}</code>
        </pre>
      ) : null}

      <h2>
        <ShowHideButton shown={minifiedShown} setShown={setMinifiedShown} />
        {" Minified"}
        {minified === null
          ? null
          : ` (${formatBytes(Buffer.from(minifiedStr).byteLength)})`}
        {compressedBytes === 0
          ? null
          : ` (Brotli: ${formatBytes(compressedBytes)})`}
      </h2>
      {minifiedShown ? (
        <pre className="output one-line">
          <code>{minifiedStr}</code>
        </pre>
      ) : null}
    </div>
  );
};

const ShowHideButton = ({
  shown,
  setShown
}: {
  shown: boolean;
  setShown: (shown: boolean) => void;
}) => <button onClick={() => setShown(!shown)}>[{shown ? "-" : "+"}]</button>;

export default Repl;
