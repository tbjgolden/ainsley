import check from "./checkTypes";

export const lint = ainsley => {
  const errors = [];

  const defsJson = JSON.stringify(ainsley.defs);
  for (let k in ainsley) {
    if (iteratorRegex.test(k)) {
      if (!defsJson.includes(k)) {
        errors.push("iterator defined but not used in defs", k);
      }
    } else if (k === "defs") {
      const match = defsJson.match(k);
      if (match) {
        for (let i = 0; i < match.length; i++) {
          if (!ainsley[match[i]]) {
            errors.push(
              "iterator referenced in defs but not defined",
              match[i]
            );
          }
        }
      }
    } else if (k === "props") {
      errors.push("is props array?", check.array(ainsley.props));
    } else if (k === "raw") {
    } else if (k === "mods") {
    } else {
      errors.push("invalid property", k);
    }
  }

  return errors.length ? errors : null;
};
