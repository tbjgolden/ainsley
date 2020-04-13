import React, { useState, useMemo, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { flatten, minify } from "../ainsley";
import "prismjs/themes/prism.css";
import "prismjs";
const { highlight, languages } = window.Prism;

const brotli = import("wasm-brotli");

const parse = (str: string) => {
  let result;
  try {
    // eslint-disable-next-line no-eval
    result = eval(str);
  } catch (e) {
    try {
      // eslint-disable-next-line no-eval
      result = eval(`result = ${str}`);
    } catch (e) {
      result = e.message;
    }
  }
  return result;
};

const Repl = () => {
  const [input, setInput] = useState(`{
  variations: [[
    ["s", "@media(min-width:384px)"],
    ["m", "@media(min-width:768px)"],
    ["l", "@media(min-width:1024px)"]
  ]],
  variables: {
    colors: {
      b: "black",
      w: "white"
    }
  },
  children: [
    "$base",
    {
      variables: {
        "+colors": {
          lg: "#eee",
          g: "#888",
          dg: "#222"
        }
      },
      children: [
        ["bgc", [["background-color", "{colors}"]]]
      ]
    }
  ]
}`);

  const [flattenedShown, setFlattenedShown] = useState(false);
  const [flattened, flattenedStr] = useMemo(() => {
    const parsedInput = parse(input);
    if (typeof parsedInput !== "string") {
      const obj = flatten(parsedInput);
      return [obj, JSON.stringify(obj, null, 2)];
    } else {
      return [null, `Error while parsing:\n\n${parsedInput}`];
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

  const [compressedBytes, setCompressedBytes] = useState("");

  useEffect(() => {
    setCompressedBytes("");
    if (minified !== null) {
      brotli
        .then(({ compress }) => {
          const result = compress(new TextEncoder().encode(minifiedStr));
          setCompressedBytes(result.byteLength.toString());
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
        <h2>Input ({Buffer.from(input).byteLength}B)</h2>
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
      </h2>
      {flattenedShown ? (
        <pre className="output">
          <code>{flattenedStr}</code>
        </pre>
      ) : null}

      <h2>
        <ShowHideButton shown={minifiedShown} setShown={setMinifiedShown} />
        {" Minified "}
        {minified === null ? null : `(${Buffer.from(minifiedStr).byteLength}B)`}
        {compressedBytes === "" ? null : ` (Brotli: ${compressedBytes}B)`}
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
