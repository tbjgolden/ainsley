import React, { useState, useMemo, useEffect } from "react";
import Editor from "react-simple-code-editor";
import { flatten, minify } from "../ainsley";

import "prismjs";
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

const Repl = () => {
  const [
    input,
    setInput
  ] = useState(`const reset = \`/* http://meyerweb.com/eric/tools/css/reset/ 
  v2.0 | 20110126
  License: none (public domain)
*/

html, body, div, span, applet, object, iframe,
h1, h2, h3, h4, h5, h6, p, blockquote, pre,
a, abbr, acronym, address, big, cite, code,
del, dfn, em, img, ins, kbd, q, s, samp,
small, strike, strong, sub, sup, tt, var,
b, u, i, center,
dl, dt, dd, ol, ul, li,
fieldset, form, label, legend,
table, caption, tbody, tfoot, thead, tr, th, td,
article, aside, canvas, details, embed, 
figure, figcaption, footer, header, hgroup, 
menu, nav, output, ruby, section, summary,
time, mark, audio, video {
  margin: 0;
  padding: 0;
  border: 0;
  font-size: 100%;
  font: inherit;
  vertical-align: baseline;
}
/* HTML5 display-role reset for older browsers */
article, aside, details, figcaption, figure, 
footer, header, hgroup, menu, nav, section {
  display: block;
}
body {
  line-height: 1;
}
ol, ul {
  list-style: none;
}
blockquote, q {
  quotes: none;
}
blockquote:before, blockquote:after,
q:before, q:after {
  content: '';
  content: none;
}
table {
  border-collapse: collapse;
  border-spacing: 0;
}\`;

const breakpoints = {
  s: 384,
  m: 768,
  l: 1024
};

return {
  variations: [
    Object.entries(breakpoints)
      .map(([prefix, pixels]) =>
        [prefix, \`@media(min-width:\${pixels}px)\`]
      )
  ],
  variables: {
    colors: {
      b: "black",
      w: "white"
    }
  },
  children: [
    reset,
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
    if (isObject(parsedInput)) {
      const obj = flatten(parsedInput);
      return [obj, JSON.stringify(obj, null, 2)];
    } else if (typeof parsedInput === "string") {
      return [null, `Error while parsing:\n\n${parsedInput}`];
    } else {
      return [null, "Error while parsing"];
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
