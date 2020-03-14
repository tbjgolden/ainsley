const iteratorRegex = /\{[a-z]+\}/gi;

// subrecursion utility
const recurse = (ainsley, fn, keys, results = []) => {
  if (keys.length === 0) return fn(results);

  Object.entries(ainsley[keys[0]]).forEach(pair => {
    recurse(ainsley, fn, keys.slice(1), [...results, [keys[0], ...pair]]);
  });
};

export const propFragMap = {
  flex: "fx",
  background: "bg",
  min: "n",
  max: "x",
  style: "st",
  overflow: "ov",
  cursor: "cu"
};

// recurse through ainsley.defs
export const expandDefs = (ainsley, ruleSet) => {
  let [selector, block] = ruleSet;

  const iterators = [[], []];
  for (let [property, value] of block) {
    const p = property.match(iteratorRegex);
    if (p) iterators[0].push(...p);
    const v = value.match(iteratorRegex);
    if (v) iterators[1].push(...v);
  }
  const list = [];
  recurse(ainsley, perm => {
    const ruleSet = [selector, block.map(d => [...d])];
    for (let i = 0; ruleSet[0].includes("&"); i++) {
      ruleSet[0] = ruleSet[0].replace("&", perm[i][1]);
    }
    for (let decl of ruleSet[1]) {
      while (perm.length > 0 && decl[0].includes(perm[0][0])) {
        const [before, , after] = perm.shift();
        decl[0] = decl[0].replace(before, after);
      }
    }
    for (let decl of ruleSet[1]) {
      while (perm.length > 0 && decl[1].includes(perm[0][0])) {
        const [before, , after] = perm.shift();
        decl[1] = decl[1].replace(before, after);
      }
    }
    list.push(ruleSet);
  }, iterators.flat());
  return list;
};

// expand ainsley.props
export const expandProps = ([prop, values]) => {
  const propAbbrev = prop
    .split("-")
    .map(w => (propFragMap[w] || w[0]))
    .join("");
  return values.map(value => [
    `${propAbbrev}${value
      .split(" ")
      .map(w => w[0].toUpperCase())
      .join("")}`,
    [[prop, value]]
  ]);
};

// compile ainsley to a simple stylesheet ast
export const ainsleyToAst = ainsley => {
  const ast = [];
  if (ainsley.defs) ast.push(...ainsley.defs.flatMap(def => expandDefs(ainsley, def)));
  if (ainsley.props) ast.push(...ainsley.props.flatMap(expandProps));
  if (ainsley.raw) ast.push(...ainsley.raw);
  return ast;
};

// generate css from simple stylesheet ast
export const astToCss = ast =>
  ast
    .map(
      ([selector, ruleSet]) =>
        `.${selector}{${ruleSet
          .map(([property, value]) => `${property}:${value}`)
          .join(";")}}`
    )
    .join("");

// generate css from ainsley
export const ainsleyToCss = ainsley => astToCss(ainsleyToAst(ainsley));
