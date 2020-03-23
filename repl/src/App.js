import React, { useState, useRef, useEffect, useMemo } from "react";
import { ainsleyToCSS, extend, base, lint } from "ainsley";

const empty = extend([{ reset: "" }]);

function App() {
  const [ainsley, setAinsley] = useState(toJSON(base));
  const css = useMemo(() => {
    try {
      const json = JSON.parse(ainsley);
      const lintResults = lint(json);
      return lintResults ? lintResults.join("\n\n") : ainsleyToCSS(json);
    } catch (err) {
      return err.message;
    }
  }, [ainsley]);

  return (
    <div className="hH pa40 dFX fldC aiC">
      <div className="xw95 xhP wP fl110 dFX">
        <Half>
          <div className="pa25 nw55">
            <h2 className="fwM">Input</h2>
            <button
              className="dB mat25 foszXS tdU"
              onClick={() => setAinsley(toJSON(empty))}
            >
              Empty config
            </button>
            <button
              className="dB mat15 foszXS tdU"
              onClick={() => setAinsley(toJSON(base))}
            >
              Base config
            </button>
          </div>
          <TextArea value={ainsley} onChange={setAinsley} readOnly />
        </Half>
        <Half r>
          <div className="pa25 nw55">
            <h2 className="fwM">Output</h2>
          </div>
          <Output>{css}</Output>
        </Half>
      </div>
    </div>
  );
}

function Half({ className, r, ...props }) {
  return (
    <div
      className={`xwP50 fl110 dFX ${r ? "pal25" : "par25"} ${className || ""}`}
      {...props}
    >
      <div className="bacG10 hP wP dFX" {...props} />
    </div>
  );
}

function TextArea({ className, onChange: onChangeProp, value, ...props }) {
  const cm = useRef(null);
  const el = useRef(null);
  const debounce = useRef(null);

  useEffect(() => {
    const onChange = () => {
      clearTimeout(debounce.current);
      debounce.current = setTimeout(() => {
        if (cm.current) {
          const newValue = cm.current.getValue();
          onChangeProp(newValue);
        }
      }, 500);
    };

    if (el.current && !cm.current) {
      cm.current = window.CodeMirror.fromTextArea(el.current, {
        tabMode: "indent",
        matchBrackets: true,
        theme: "monokai",
        lineNumbers: true,
        lineWrapping: true,
        indentUnit: 2,
        mode: "application/json"
      });
      cm.current.setSize("100%", "100%");
      cm.current.on("change", onChange);
    }
    return () => {
      if (cm.current) {
        cm.current.on("change", onChange);
        cm.current = null;
      }
    };
  }, []);

  useEffect(() => {
    if (cm.current && value !== cm.current.getValue()) {
      cm.current.setValue(value);
    }
  }, [value]);

  return (
    <>
      <textarea
        key="0"
        ref={el}
        className={`fl110 pa25 fofMONO bacG20 foszXS cW rN ${className || ""}`}
        value={value}
        {...props}
      />
      <style>{`.CodeMirror{font-family:'Fira Code',monospace;font-size:12px}`}</style>
    </>
  );
}

function Output({ className, ...props }) {
  return (
    <pre
      className={`fl110 xHP xwP pa25 ovAA foszXS fofMONO bacG20 cW rN ${className ||
        ""}`}
    >
      <code className="wsPW owBW xwP" {...props} />
    </pre>
  );
}

function toJSON(obj, currIndent = 0, levelsToIndent = 2) {
  if (!obj || typeof obj !== "object") return JSON.stringify(obj);

  const kvjoin = ": ";
  let apre = "[";
  let opre = "{";
  let join = ", ";
  let apost = "]";
  let opost = "}";

  if (levelsToIndent > 0) {
    const spaces = new Array(currIndent).fill(" ").join("");
    apre = `${apre}\n  ${spaces}`;
    opre = `${opre}\n  ${spaces}`;
    join = `,\n  ${spaces}`;
    apost = `\n${spaces}${apost}`;
    opost = `\n${spaces}${opost}`;
  }

  return Array.isArray(obj)
    ? `${apre}${obj
        .map(x => {
          const xJSON = toJSON(x, currIndent + 2, 0);
          return xJSON.length < 60
            ? xJSON
            : toJSON(x, currIndent + 2, levelsToIndent - 1);
        })
        .join(join)}${apost}`
    : `${opre}${Object.entries(obj)
        .map(([k, v]) => {
          let vJSON = toJSON(v, currIndent + 2, 0);
          vJSON =
            vJSON.length < 60
              ? vJSON
              : toJSON(v, currIndent + 2, levelsToIndent - 1);
          return `${toJSON(k)}${kvjoin}${vJSON}`;
        })
        .join(join)}${opost}`;
}

export default App;
