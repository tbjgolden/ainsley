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
    check.assert.array.of.nonEmptyArray(defs);
    defs.forEach(([sel, vals]) => {
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

const lint = ainsley => {
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
  } catch (err) {
    errors.push(`Error during lint: ${err.message}`);
  }

  return errors.length ? errors : null;
};

export default lint;
