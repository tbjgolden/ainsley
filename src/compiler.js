const iteratorRegex = /\{[a-z]+\}/gi;

const combinations = mods => {
  let list = [[]];
  while (mods.length)
    list = mods.shift().flatMap(opt => list.map(prev => [...prev, opt]));
  return list;
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

// expand ainsley.defs
export const expandDefs = (ainsley, ruleSet) => {
  let [selector, block] = ruleSet;

  const iterators = [[], []];
  for (let [property, value] of block) {
    const p = property.match(iteratorRegex);
    if (p) iterators[0].push(...p);
    const v = value.match(iteratorRegex);
    if (v) iterators[1].push(...v);
  }

  return combinations(
    iterators
      .flat()
      .map(i => Object.entries(ainsley[i]).map(([k, v]) => [i, k, v]))
  ).map(perm => {
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
    return ruleSet;
  });
};

// expand ainsley.props
export const expandProps = ([prop, values]) => {
  const propAbbrev = prop
    .split("-")
    .map(w => propFragMap[w] || w[0])
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
  const ast = [
    ...(ainsley.defs || []).flatMap(def => expandDefs(ainsley, def)),
    ...(ainsley.props || []).flatMap(expandProps),
    ...(ainsley.raw || [])
  ];
  return combinations(
    (ainsley.mods || []).map(mod => [["", ""], ...mod])
  ).flatMap(comb =>
    comb.reduce((ast, [prefix, mod]) => {
      if (!mod) {
        return ast;
      } else if (mod[0] === "@") {
        return [[mod, ast.map(([sel, block]) => [`${prefix}${sel}`, block])]];
      } else {
        return ast.map(([sel, block]) => [`${prefix}${sel}${mod}`, block]);
      }
    }, ast)
  );
};

// generate css from simple stylesheet ast
export const astToCss = ast =>
  ast
    .map(([selector, ruleSet]) =>
      selector[0] === "@"
        ? `${selector}{${astToCss(ruleSet)}}`
        : `.${selector}{${ruleSet
            .map(([property, value]) => `${property}:${value}`)
            .join(";")}}`
    )
    .join("");

// generate css from ainsley
export const ainsleyToCss = ainsley => astToCss(ainsleyToAst(ainsley));
