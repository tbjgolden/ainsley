import { fastClone, map, flat, combinations } from "./utils";

export const propFragMap = {
  flex: "fx",
  background: "bg",
  min: "n",
  max: "x",
  style: "st",
  overflow: "ov",
  cursor: "cu"
};

export const iteratorRegex = /\{[a-z]+\}/gi;

// private helpers
const _abbrev = w => propFragMap[w] || w[0];
const _expandDeclaration = subpair => `${subpair[0]}:${subpair[1]}`;
const _addEmptyMod = mod => [["", ""]].concat(mod);
const _abbrevWord = w => w[0].toUpperCase();

// expand ainsley.defs
export const expandDefs = (ainsley, ruleSet) => {
  const pair = ruleSet[1].reduce(
    (iters, pair) => [
      iters[0].concat(pair[0].match(iteratorRegex) || []),
      iters[1].concat(pair[1].match(iteratorRegex) || [])
    ],
    [[], []]
  );

  return map(
    combinations(
      map(pair[0].concat(pair[1]), iter =>
        map(Object.keys(ainsley[iter]), abbr => [
          iter,
          abbr,
          ainsley[iter][abbr]
        ])
      )
    ),
    perm => {
      const clone = fastClone(ruleSet);
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
    }
  );
};

// expand ainsley.props
export const expandProps = pair => {
  const propAbbrev = map(pair[0].split("-"), _abbrev).join("");
  return map(pair[1], value => {
    if (!Array.isArray(value))
      value = [value, map(value.split(" "), _abbrevWord).join("")];
    return [`${propAbbrev}${value[1]}`, [[pair[0], value[0]]]];
  });
};

// compile ainsley to a simple stylesheet ast
export const ainsleyToAST = ainsley => {
  const ast = [].concat(
    flat(map(ainsley.defs || [], def => expandDefs(ainsley, def))),
    flat(map(ainsley.props || [], expandProps)),
    ainsley.raw || []
  );
  return flat(
    map(combinations(map(ainsley.mods || [], _addEmptyMod)), comb =>
      comb.reduce((ast, pair) => {
        if (!pair[1]) {
          return ast;
        } else if (pair[1][0] === "@") {
          return [
            [
              pair[1],
              map(ast, subpair => [`${pair[0]}${subpair[0]}`, subpair[1]])
            ]
          ];
        } else {
          return map(ast, subpair => [
            `${pair[0]}${subpair[0]}${pair[1]}`,
            subpair[1]
          ]);
        }
      }, ast)
    )
  );
};

export const ruleToCSS = rule =>
  rule[0][0] === "@"
    ? `${rule[0]}{${astToCSS(rule[1])}}`
    : `.${rule[0]}{${map(rule[1], _expandDeclaration).join(";")}}`;

// generate css from simple stylesheet ast
export const astToCSS = ast => map(ast, ruleToCSS).join("");

// generate css from ainsley
export const ainsleyToCSS = ainsley => astToCSS(ainsleyToAST(ainsley));

// insert ainsley into a dom
export const ainsleyInsert = (ainsley, stylesheet) => {
  const ast = ainsleyToAST(ainsley);
  for (let i = ast.length - 1; i >= 0; i--) {
    stylesheet.insertRule(ruleToCSS(ast[i]), 0);
  }
};
