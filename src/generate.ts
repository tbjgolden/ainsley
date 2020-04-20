import {
  Ainsley,
  AinsleyRule,
  AinsleyPropertyOrPlaceholder,
  AinsleyVariableMap,
  AinsleyChild,
  AinsleyChildren,
  AinsleyAST
} from "./types";
import { isObject, assign, flat, map, combinations } from "./utils";

const iteratorRegex = "\\{[a-zA-Z0-9_-]+\\}";
const iteratorSearch = new RegExp(iteratorRegex, "g");
export const ITERATOR_REGEX = iteratorRegex;

/*
TODO:
replace OPINION sections with options
*/

export const generate = (ainsley: Ainsley): string =>
  generateFromAst(ainsleyToAst(ainsley, {}));

export const generateFromAst = (ainsleyRules: AinsleyAST): string =>
  ainsleyRules
    .map((ainsleyRule) => {
      if (typeof ainsleyRule === "string") {
        return ainsleyRule;
      } else if (ainsleyRule[0].charAt(0) === "@") {
        return (
          ainsleyRule[0] +
          "{" +
          generateFromAst(ainsleyRule as AinsleyAST) +
          "}"
        );
      } else {
        return (
          "." +
          ainsleyRule[0] +
          "{" +
          map(
            ainsleyRule[1],
            (declaration: [string, string]) =>
              declaration[0] + ":" + declaration[1]
          ).join(";") +
          "}"
        );
      }
    })
    .join("");

const ainsleyToAst = (
  ainsley: Ainsley,
  inheritedVariables: AinsleyVariableMap
): AinsleyAST => {
  // first, compute variables
  // WAIT! need to fix for modifiers
  const newVariables = assign([inheritedVariables, ainsley.variables ?? {}]);

  // then, flatten children into ast
  const rulesListWithoutVariants = ainsleyChildrenToAst(
    ainsley.children ?? [],
    newVariables
  );

  // lastly, multiply ast with variations
  const rulesList: AinsleyAST = flat(
    map(
      combinations(
        map(ainsley.variations ?? [], (variationSet) =>
          [["", ""]].concat(variationSet)
        )
      ),
      (combination) =>
        combination.reduce(
          (prevAst: AinsleyAST, variation: [string, string]) => {
            const variationAbbreviation = variation[0];
            const variationInstruction = variation[1];

            if (variationInstruction === "") {
              return prevAst;
            } else if (variationInstruction.charAt(0) === "@") {
              return [
                [
                  variationInstruction,
                  map(prevAst, (rule: AinsleyRule) => [
                    // OPINION
                    `${variationAbbreviation}${rule[0]}`,
                    rule[1]
                  ])
                ]
              ];
            } else {
              return map(prevAst, (rule: AinsleyRule) => [
                // OPINION
                `${variationAbbreviation}${rule[0]}${variationInstruction}`,
                rule[1]
              ]);
            }
          },
          rulesListWithoutVariants
        )
    )
  );

  return rulesList;
};

const ainsleyChildrenToAst = (
  ainsleyChildren: AinsleyChildren,
  variables: AinsleyVariableMap
): AinsleyAST =>
  flat(
    map(ainsleyChildren, (child: AinsleyChild) => {
      if (typeof child === "string") {
        return [child];
      } else if (isObject(child)) {
        return [ainsleyToAst(child as Ainsley, variables)];
      } else {
        child = child as AinsleyRule | AinsleyPropertyOrPlaceholder;
        if (Array.isArray(child[1])) {
          return ainsleyRuleToAst(child as AinsleyRule, variables);
        } else {
          return ainsleyPropertyToAst(child as AinsleyPropertyOrPlaceholder);
        }
      }
    })
  );

const ainsleyRuleToAst = (
  ainsleyRule: AinsleyRule,
  variables: AinsleyVariableMap
): AinsleyAST => {
  const selector = ainsleyRule[0];
  const declarations = ainsleyRule[1];
  const variablesFound: string[] = [];
  map(declarations, (declaration) => {
    const propertyMatches =
      ((declaration[0] as string) + "").match(iteratorSearch) ?? [];
    const valueMatches =
      ((declaration[1] as string) + "").match(iteratorSearch) ?? [];
    map(propertyMatches, (match) => variablesFound.push(match));
    map(valueMatches, (match) => variablesFound.push(match));
  });

  return map(
    combinations(
      map(variablesFound, (variable) => {
        const trimmedVariable = variable.slice(1, -1);
        return map(Object.keys(variables[trimmedVariable]), (key) => [
          variable,
          key,
          variables[trimmedVariable][key]
        ]);
      })
    ),
    (combination) => {
      let combinationIndex = 0;
      let current: [string, string, string | number] =
        combination[combinationIndex];

      return [
        // OPINION
        selector + map(combination, (part) => part[1]).join(""),
        map(declarations, (declaration) =>
          map(declaration, (declarationPart) => {
            while (
              current !== undefined &&
              declarationPart.indexOf(current[0]) !== -1
            ) {
              declarationPart = declarationPart.replace(current[0], current[2]);
              current = combination[++combinationIndex];
            }
            return declarationPart;
          })
        )
      ];
    }
  );
};

const ainsleyPropertyToAst = (
  ainsleyProperty: AinsleyPropertyOrPlaceholder
): AinsleyAST => {
  // OPINION
  const propertyAbbreviation = ainsleyProperty[0]
    .replace(/[^A-Z]+/g, "")
    .toLowerCase();
  // OPINION
  const propertyName = ainsleyProperty[0].toLowerCase();
  return map(Object.keys(ainsleyProperty[1]), (valueAbbreviation: string) => [
    // OPINION
    propertyAbbreviation + valueAbbreviation,
    [[propertyName, ainsleyProperty[1][valueAbbreviation]]]
  ]);
};
