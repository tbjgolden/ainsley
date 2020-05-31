import React, { useState, useMemo, useEffect, useRef } from "react";
import Layout from '@theme/Layout'
import useDocusaurusContext from '@docusaurus/useDocusaurusContext'
import Editor from "react-simple-code-editor";
import stringify from "json-stringify-pretty-compact";
import gzip from "gzip-js";
import {
  flatten,
  minify,
  generate,
  DEFAULT_OPTIONS
} from "ainsley";

import "prismjs";
const { highlight, languages } = globalThis.Prism;

export const isObject = (val) =>
  !!(val !== null && typeof val === 'object' && !Array.isArray(val))

const parse = (str) => {
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

const formatBytes = (bytes) => {
  if (bytes < 1e3) return `${bytes}B`;
  else if (bytes < 1e4) return `${(bytes / 1e3).toFixed(1)}kB`;
  else return `${Math.round(bytes / 1e3)}kB`;
};

const Repl = () => {
  const context = useDocusaurusContext()
  const { siteConfig = {} } = context

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
    // You may nest Ainsley objects;
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

  const [optionsShown, setOptionsShown] = useState(false);
  const [options, setOptions] = useState(`{
  ${Object.entries(DEFAULT_OPTIONS)
    .map(
      ([key, value]) =>
        `${key}: ${
          typeof value === "function" ? value.toString() : JSON.stringify(value)
        }`
    )
    .join(",\n  ")}
}`);

  const generateDuration = useRef(0);

  const [flattenedShown, setFlattenedShown] = useState(false);
  const [[flattened, flattenedStr], setFlattened] = useState([
    null,
    ""
  ]);

  useEffect(() => {
    const parsedInput = parse(input);
    if (isObject(parsedInput)) {
      flatten(parsedInput)
        .then((flatAinsley) => {
          setFlattened([flatAinsley, stringify(flatAinsley)]);
        })
        .catch((error) => {
          setFlattened([null, `Error while parsing:\n\n${error.message}`]);
        });
    } else if (typeof parsedInput === "string") {
      setFlattened([null, `Error while parsing input:\n\n${parsedInput}`]);
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
  }, [flattenedStr]);

  const [compressedBytes, setCompressedBytes] = useState(0);

  useEffect(() => {
    setCompressedBytes(0);
    if (minified !== null) {
      const result = gzip.zip(minifiedStr);
      console.log(result);
      setCompressedBytes(Buffer.from(result).byteLength);
    }
  }, [minifiedStr]);

  const [generatedShown, setGeneratedShown] = useState(true);
  const [generated, generatedStr] = useMemo(() => {
    if (minified !== null) {
      const parsedOptions = parse(options);
      if (typeof parsedOptions === "string") {
        return [null, `Error while parsing options:\n\n${parsedOptions}`];
      } else {
        const startTime = performance.now();
        const obj = generate(minified, parsedOptions);
        generateDuration.current = performance.now() - startTime;
        return [obj, obj];
      }
    } else {
      return [null, minifiedStr];
    }
  }, [flattenedStr, options]);

  const [compressedCSSBytes, setCompressedCSSBytes] = useState(0);

  useEffect(() => {
    setCompressedCSSBytes(0);
    if (generated !== null) {
      const result = gzip.zip(generatedStr);
      setCompressedCSSBytes(Buffer.from(result).byteLength);
    }
  }, [generatedStr]);

  useEffect(() => {
    document.body.style.display = "block";
  }, []);

  return (
    <Layout
      title={`Try ${siteConfig.title}`}
      description="Try out the Ainsley compiler in your browser"
    >
      <main className="padding-vert--lg row repl-outer">
        <div className="col repl-inner">
          <section className="section">
            <label htmlFor="input">
              <h2 className="section-header">Input</h2>
            </label>
            <div id="editor">
              <Editor
                id="input"
                value={input}
                onValueChange={setInput}
                highlight={(code) => highlight(code, languages.js, "js")}
              />
            </div>
          </section>

          <section className="section">
            <h2 className="section-header">
              Options
              <ShowHideButton shown={optionsShown} setShown={setOptionsShown} />
            </h2>
            {optionsShown ? (
              <div id="editor">
                <Editor
                  id="options"
                  value={options}
                  onValueChange={setOptions}
                  highlight={(code) => highlight(code, languages.js, "js")}
                />
              </div>
            ) : null}
          </section>

          <section className="section">
            <h2 className="section-header">
              Flattened
              {flattened && ` (${formatBytes(Buffer.from(flattenedStr).byteLength)})`}
              <ShowHideButton shown={flattenedShown} setShown={setFlattenedShown} />
            </h2>
            {flattenedShown ? (
              <pre className="output">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlight(flattenedStr, languages.js, "json")
                  }}
                />
              </pre>
            ) : null}
          </section>

          <section className="section">
            <h2 className="section-header">
              Minified
              {minified && ` (${formatBytes(Buffer.from(minifiedStr).byteLength)})`}
              {compressedBytes > 0 && ` (gzip: ${formatBytes(compressedBytes)})`}
              <ShowHideButton shown={minifiedShown} setShown={setMinifiedShown} />
            </h2>
            {minifiedShown ? (
              <pre className="output">
                <code
                  dangerouslySetInnerHTML={{
                    __html: highlight(minifiedStr, languages.js, "json")
                  }}
                />
              </pre>
            ) : null}
          </section>

          <section className="section">
            <h2 className="section-header">
              Generated CSS
              {generated && ` (${formatBytes(Buffer.from(generatedStr).byteLength)})`}
              {compressedBytes && ` (gzip: ${formatBytes(compressedCSSBytes)})`}
              {generated && ` (${Math.round(generateDuration.current)}ms)`}
              <ShowHideButton shown={generatedShown} setShown={setGeneratedShown} />
            </h2>
            {generatedShown ? (
              <pre className="output">
                <code>{generatedStr}</code>
              </pre>
            ) : null}
          </section>
        </div>
      </main>
    </Layout>
    
  );
};

const ShowHideButton = ({
  shown,
  setShown
}) => (
  <div className="section-button">
    <button className="button button--secondary button--sm" onClick={() => setShown(!shown)}>
      {shown ? "Hide" : "Show"}
    </button>
  </div>
);

export default Repl;
