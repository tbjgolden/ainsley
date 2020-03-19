import check from "./libs/checkTypes";
import { iteratorRegex } from "./compiler";
import cloneRegExp from "clone-regexp";

const propFragMap = {
  flex: "fx",
  background: "bg",
  min: "n",
  max: "x",
  style: "st",
  overflow: "ov",
  cursor: "cu"
};

const regex = cloneRegExp(iteratorRegex, { global: false });
const isIterator = str => regex.test(str);

const checkDefs = (errors, defs) => {
  try {
    check.assert.array(defs);
  } catch (err) {
    errors.push(`"defs" is invalid`);
  }
};

const checkProps = (errors, props) => {
  try {
    check.assert.array(props);
  } catch (err) {
    errors.push(`"props" is invalid`);
  }
};

const checkRaw = (errors, raw) => {
  try {
    check.assert.array(raw);
  } catch (err) {
    errors.push(`"raw" is invalid`);
  }
};

const checkMods = (errors, mods) => {
  try {
    check.assert.array(mods);
  } catch (err) {
    errors.push(`"mods" is invalid`);
  }
};

const lint = ainsley => {
  const errors = [];

  try {
    const defsJson = JSON.stringify(ainsley.defs);
    for (let k in ainsley) {
      if (isIterator(k)) {
        if (!defsJson.includes(k)) {
          errors.push(`iterator ${k} defined but not used in "defs"`);
        }
      } else if (k === "defs") {
        checkDefs(errors, ainsley.defs);
        const match = defsJson.match(iteratorRegex);
        if (match) {
          for (let i = 0; i < match.length; i++) {
            if (!ainsley[match[i]]) {
              errors.push(
                `iterator ${match[i]} referenced in "defs" but not defined`
              );
            }
          }
        }
      } else if (k === "props") {
        checkProps(errors, ainsley.props);
      } else if (k === "raw") {
        checkRaw(errors, ainsley.raw);
      } else if (k === "mods") {
        checkMods(errors, ainsley.mods);
      } else {
        errors.push(`invalid property "${k}" found`);
      }
    }
  } catch (err) {
    errors.push(`Error during lint: ${err.message}`);
  }

  return errors.length ? errors : null;
};

export default lint;
