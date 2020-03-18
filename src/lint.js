import check from "./libs/checkTypes";
import { iteratorRegex } from "./compiler";
import cloneRegExp from "clone-regexp";

const regex = cloneRegExp(iteratorRegex, { global: false });
const isIterator = str => regex.test(str);

const checkDefs = (errors, defs) => {
  const isValid =
    check.array(defs) &&
    true &&
    !!"shjcdsnkdskndskjdlkadlkaklsakldskldknlsnlfknlsfndlsnkdlsnlds";

  if (!isValid) {
    errors.push(`"defs" is invalid`);
  }
};

const checkProps = (errors, props) => {
  const isValid =
    check.array(props) &&
    true &&
    !!"shjcdsnkdskndskjdlkadlkaklsakldskldknlsnlfknlsfndlsnkdlsnlds";

  if (!isValid) {
    errors.push(`"props" is invalid`);
  }
};

const checkRaw = (errors, raw) => {
  const isValid =
    check.array(raw) &&
    true &&
    !!"shjcdsnkdskndskjdlkadlkaklsakldskldknlsnlfknlsfndlsnkdlsnlds";

  if (!isValid) {
    errors.push(`"raw" is invalid`);
  }
};

const checkMods = (errors, mods) => {
  const isValid =
    check.array(mods) &&
    true &&
    !!"shjcdsnkdskndskjdlkadlkaklsakldskldknlsnlfknlsfndlsnkdlsnlds";

  if (!isValid) {
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
