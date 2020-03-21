import check from "./libs/checkTypes";
import { ainsleyToAST, iteratorRegex, parseSmartMap } from "./compiler";
import cloneRegExp from "clone-regexp";

const selectorRegex = /^((?:[a-z]+-)*)([a-z]+)([A-Z0-9]+)(?:\:|$)/;
const regex = cloneRegExp(iteratorRegex, { global: false });
const isIterator = str => regex.test(str);

const checkAbbrev = (errors, abbrev, prop) => {
  const expectedAbbrev = prop
    .split("-")
    .map(w => {
      const abbr = propertyWordMap[w];
      if (typeof abbr === "string") return abbr;
      return w[0];
    })
    .join("");

  if (expectedAbbrev !== abbrev) {
    errors.push(
      `Incorrect abbreviation for "${prop}", expected "${expectedAbbrev}" but got "${abbrev}"`
    );
  }
};

const checkDefs = (errors, defs) => {
  try {
    check.assert.array(defs);
    check.assert.array.of.nonEmptyArray(defs);
    defs.forEach(([sel, decls]) => {
      check.assert.nonEmptyString(sel);
      check.assert.nonEmptyArray(decls);
      check.assert.array.of.nonEmptyArray(decls);

      decls.forEach(decl => {
        check.assert.hasLength(decl, 2);
        const [prop, val] = decl;
        check.assert.nonEmptyString(prop);
        check.assert(check.nonEmptyString(val) || check.number(val));
      });
    });
  } catch (err) {
    errors.push(`"defs" is invalid: ${err.message}`);
  }
};

const checkProps = (errors, props) => {
  try {
    check.assert.array(props);
    check.assert.array.of.nonEmptyArray(props);
    props.forEach(([prop, valsExpr]) => {
      check.assert.nonEmptyString(prop);
      checkIterator(errors, valsExpr, "props");
    });
  } catch (err) {
    errors.push(`"props" is invalid: ${err.message}`);
  }
};

const checkRaw = (errors, raw) => {
  try {
    check.assert.array(raw);
    check.assert.array.of.nonEmptyArray(raw);
    raw.forEach(([sel, vals]) => {
      check.assert.nonEmptyString(sel);
      check.assert.nonEmptyArray(vals);
      check.assert.array.of.nonEmptyArray(vals);
      vals.forEach(decl => {
        check.assert.hasLength(decl, 2);
        const [prop, val] = decl;
        check.assert.nonEmptyString(prop);
        check.assert(check.nonEmptyString(val) || check.number(val));
      });
    });
  } catch (err) {
    errors.push(`"raw" is invalid: ${err.message}`);
  }
};

const checkMods = (errors, mods) => {
  try {
    check.assert.array(mods);
    check.assert.array.of.nonEmptyArray(mods);
    mods.forEach(group => {
      check.assert.nonEmptyArray(group);
      check.assert.array.of.nonEmptyArray(group);
      group.forEach(pair => {
        check.assert.hasLength(pair, 2);
        const [prefix, mod] = pair;
        check.assert.nonEmptyString(prefix);
        check.assert.nonEmptyString(mod);
      });
    });
  } catch (err) {
    errors.push(`"mods" is invalid: ${err.message}`);
  }
};

const checkReset = (errors, reset) => {
  try {
    check.assert.maybe.string(reset);
  } catch (err) {
    errors.push(`"reset" is invalid: ${err.message}`);
  }
};

const checkIterator = (errors, iterator, name) => {
  try {
    check.assert(
      (check.nonEmptyObject(iterator) &&
        Object.values(iterator).every(
          val => check.nonEmptyString(val) || check.number(val)
        )) ||
        (check.nonEmptyArray(iterator) &&
          iterator.every(val => check.nonEmptyString(val) || check.number(val)))
    );
  } catch (err) {
    errors.push(`"${name}" is invalid: ${err.message}`);
  }
};

const checkAST = (errors, ast) => {
  const blocks = ast.filter(block => Array.isArray(block));
  blocks.forEach(block => {
    const isAtRule = block[0][0] === "@";
    if (isAtRule) {
      checkAST(errors, block[1]);
    } else {
      const [sel, decls] = block;
      const match = sel.match(selectorRegex);
      if (match) {
        if (decls.length === 1) {
          const [, m, p, v] = match;
          const [prop, val] = decls[0];
          checkAbbrev(errors, p, prop);
        }
      } else {
        errors.push(
          `Invalid ainsley class "${sel}", should match ${selectorRegex.toString()}`
        );
      }
    }
  });
};

export const lint = ainsley => {
  const errors = [];

  try {
    const defsJson = JSON.stringify(ainsley.defs);
    for (let k in ainsley) {
      if (isIterator(k)) {
        checkIterator(errors, ainsley[k], k);
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
      } else if (k === "reset") {
        checkReset(errors, ainsley.reset);
      } else {
        errors.push(`invalid property "${k}" found`);
      }
    }

    if (!errors.length) {
      checkAST(errors, ainsleyToAST(ainsley));
    }
  } catch (err) {
    errors.push(`Error during lint: ${err.message}`);
  }

  return errors.length ? [...new Set(errors)] : null;
};

export const propertyWordMap = {
  // short hand properties use first 2 letters
  animation: "an",
  background: "ba",
  border: "bo",
  columns: "co",
  flex: "fl", // float
  font: "fo",
  grid: "gr",
  margin: "ma",
  offset: "of", // object fit
  outline: "ou",
  overflow: "ov",
  padding: "pa",
  transition: "tr",

  // prevents object-fit clashing with offset
  object: "ob",

  // size and sizing
  size: "sz",
  sizing: "sz",

  // min and max
  min: "n",
  max: "x",

  // sort out the 4 'c's situation - color is "c"
  cursor: "cu",
  clear: "cl",
  clip: "cp",

  // style fixes two collisions
  style: "st",

  // border-collapse collides with border-color
  collapse: "co",

  // remaining single word collisions
  hyphens: "hy", //  height
  order: "or", // opacity
  fill: "fi", // float
  resize: "re", // right
  transform: "tf" // top, transition
};
