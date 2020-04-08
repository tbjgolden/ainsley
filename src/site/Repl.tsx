import React, { useState, useMemo } from "react";
import { flatten, minify } from "../ainsley";
import { configWithPlugins } from "../examples";
import { Ainsley } from "../types";

const parse = (str: string) => {
  let result;
  try {
    // eslint-disable-next-line no-eval
    result = eval(`result = ${str}`);
  } catch (e) {
    result = e.message;
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
    {
      variables: {
        "+colors": {
          lg: "#eee",
          g: "#888",
          dg: "#222"
        }
      },
      children: [
        ["bgc", [["background-color", "bgc"]]]
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
    const obj = minify(flattened as Ainsley);
    return [obj, JSON.stringify(obj, null, 2)];
  }, [flattened]);

  return (
    <div>
      <style>
        {`
        @import url('https://fonts.googleapis.com/css2?family=Fira+Code');
        * {
          font-family: 'Fira Code', monospace;
          font-size: 16px;
        }
        textarea, pre {
          border: 1px solid #000;
          resize: vertical;
          overflow: auto;
          width: 100%;
          height: 200px;
        }
        pre {
          background-color: #ddd;
        }
        button {
          padding: 0;
          margin: 0;
          border: 0;
          background: none;
        }
        `}
      </style>
      <label>
        <h2>Input</h2>
        <textarea value={input} onChange={ev => setInput(ev.target.value)} />
      </label>
      <label>
        <h2>
          <ShowHideButton shown={flattenedShown} setShown={setFlattenedShown} />
          {" Flattened"}
        </h2>
        {flattenedShown ? <pre><code>{flattenedStr}</code></pre> : null}
      </label>
      <label>
        <h2>
          <ShowHideButton shown={minifiedShown} setShown={setMinifiedShown} />
          {" Minified"}
        </h2>
        {minifiedShown ? <pre><code>{minifiedStr}</code></pre> : null}
      </label>
    </div>
  );
};

const ShowHideButton = ({
  shown,
  setShown
}) => <button onClick={() => setShown(!shown)}>[{shown ? "-" : "+"}]</button>;

export default Repl;
