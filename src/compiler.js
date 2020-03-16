const iteratorRegex = /\{[a-z]+\}/gi;

const flat = arr => [].concat.apply([], arr);

const combinations = mods => {
  let list = [[]];
  while (mods.length)
    list = flat(mods.shift().map(opt => list.map(prev => prev.concat([opt]))));
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
  let propIterators = [];
  let valIterators = [];

  ruleSet[1].forEach(pair => {
    propIterators = propIterators.concat(pair[0].match(iteratorRegex) || []);
    valIterators = valIterators.concat(pair[1].match(iteratorRegex) || []);
  });

  return combinations(
    propIterators
      .concat(valIterators)
      .map(i => Object.keys(ainsley[i]).map(k => [i, k, ainsley[i][k]]))
  ).map(perm => {
    const clone = JSON.parse(JSON.stringify(ruleSet));
    for (let i = 0; clone[0].includes("&"); i++) {
      clone[0] = clone[0].replace("&", perm[i][1]);
    }
    for (let i = 0; i < clone[1].length; i++) {
      const decl = clone[1][i];
      while (perm.length > 0 && decl[0].includes(perm[0][0])) {
        const first = perm.shift();
        decl[0] = decl[0].replace(first[0], first[2]);
      }
    }
    for (let i = 0; i < clone[1].length; i++) {
      const decl = clone[1][i];
      while (perm.length > 0 && decl[1].includes(perm[0][0])) {
        const first = perm.shift();
        decl[1] = decl[1].replace(first[0], first[2]);
      }
    }
    return clone;
  });
};

// expand ainsley.props
export const expandProps = pair => {
  const propAbbrev = pair[0]
    .split("-")
    .map(w => propFragMap[w] || w[0])
    .join("");
  return pair[1].map(value => [
    `${propAbbrev}${value
      .split(" ")
      .map(w => w[0].toUpperCase())
      .join("")}`,
    [[pair[0], value]]
  ]);
};

// compile ainsley to a simple stylesheet ast
export const ainsleyToAst = ainsley => {
  const ast = [].concat(
    flat((ainsley.defs || []).map(def => expandDefs(ainsley, def))),
    flat((ainsley.props || []).map(expandProps)),
    ainsley.raw || []
  );
  return flat(
    combinations((ainsley.mods || []).map(mod => [["", ""]].concat(mod))).map(
      comb =>
        comb.reduce((ast, pair) => {
          if (!pair[1]) {
            return ast;
          } else if (pair[1][0] === "@") {
            return [
              [
                pair[1],
                ast.map(subpair => [`${pair[0]}${subpair[0]}`, subpair[1]])
              ]
            ];
          } else {
            return ast.map(subpair => [
              `${pair[0]}${subpair[0]}${pair[1]}`,
              subpair[1]
            ]);
          }
        }, ast)
    )
  );
};

// generate css from simple stylesheet ast
export const astToCss = ast =>
  ast
    .map(pair =>
      pair[0][0] === "@"
        ? `${pair[0]}{${astToCss(pair[1])}}`
        : `.${pair[0]}{${pair[1].map(subpair => subpair.join(":")).join(";")}}`
    )
    .join("");

// generate css from ainsley
export const ainsleyToCss = ainsley => astToCss(ainsleyToAst(ainsley));
