import {
  Ainsley,
  AinsleyRule,
  AinsleyPropertyOrPlaceholder,
  AinsleyVariableMap,
  AinsleyChild,
  AinsleyChildren,
  AinsleyAST,
  AinsleyGenerateOptions
} from "./types";
import { isObject, assign, flat, map, combinations, memoize } from "./utils";

export const ITERATOR_REGEX = "\\{[a-zA-Z0-9_-]+\\}";
export const DEFAULT_OPTIONS: AinsleyGenerateOptions = {
  addVariationToSelector: (selector, variationAbbreviation) =>
    variationAbbreviation + "-" + selector,
  addPropertyToSelector: (selector, propertyAbbreviation) =>
    selector + propertyAbbreviation.toLowerCase(),
  addValueToSelector: (selector, valueAbbreviation) =>
    selector + valueAbbreviation.toUpperCase(),
  abbreviateProperty: (propertyName) => [
    propertyName
      .split("-")
      .map((word) => word.charAt(0))
      .join("")
      .toLowerCase(),
    propertyName.toLowerCase()
  ]
};

const ITERATOR_SEARCH = new RegExp(ITERATOR_REGEX, "g");

export const generate = (
  ainsley: Ainsley,
  options: Partial<AinsleyGenerateOptions> = {}
): string => {
  const mergedOptions = assign([
    DEFAULT_OPTIONS,
    options
  ]) as AinsleyGenerateOptions;
  const memoizedOptions: Partial<AinsleyGenerateOptions> = {};
  map(Object.keys(mergedOptions), (key) => {
    memoizedOptions[key as keyof AinsleyGenerateOptions] = memoize(
      mergedOptions[key as keyof AinsleyGenerateOptions] as (
        arg1: string,
        arg2?: string
      ) => any
    );
  });
  return generateFromAst(
    ainsleyToAst(ainsley, memoizedOptions as AinsleyGenerateOptions, {})
  );
};

export const generateFromAst = (ainsleyRules: AinsleyAST): string =>
  map(
    ainsleyRules,
    (ainsleyRule: string | AinsleyRule | [string, AinsleyAST]) => {
      if (typeof ainsleyRule === "string") {
        return ainsleyRule;
      } else {
        if (ainsleyRule[0].charAt(0) === "@") {
          return (
            ainsleyRule[0] +
            "{" +
            generateFromAst(ainsleyRule[1] as AinsleyAST) +
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
      }
    }
  ).join("");

const ainsleyToAst = (
  ainsley: Ainsley,
  options: AinsleyGenerateOptions,
  inheritedVariables: AinsleyVariableMap
): AinsleyAST => {
  // first, compute variables
  const newVariables = assign([inheritedVariables]);
  if (isObject(ainsley.variables)) {
    const variables = ainsley.variables as AinsleyVariableMap;
    map(Object.keys(variables), (variable: string) => {
      const modAndBase = parseVariable(variable);
      const mod = modAndBase[0];
      const base = modAndBase[1];
      if (mod === 0) {
        newVariables[base] = variables[variable];
      } else if (mod === 2) {
        newVariables[base] = assign([
          inheritedVariables[base],
          variables[variable]
        ]);
      }
    });
  }

  // then, flatten children into ast
  const rulesListWithoutVariants =
    ainsley.children === undefined
      ? []
      : ainsleyChildrenToAst(ainsley.children, options, newVariables);

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
                  map(prevAst, (rule: AinsleyRule) =>
                    typeof rule === "string"
                      ? rule
                      : [
                          options.addVariationToSelector(
                            rule[0],
                            variationAbbreviation
                          ),
                          rule[1]
                        ]
                  )
                ]
              ];
            } else {
              return map(prevAst, (rule: AinsleyRule) =>
                typeof rule === "string"
                  ? rule
                  : [
                      options.addVariationToSelector(
                        rule[0],
                        variationAbbreviation
                      ) + variationInstruction,
                      rule[1]
                    ]
              );
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
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST =>
  flat(
    map(ainsleyChildren, (child: AinsleyChild) => {
      if (typeof child === "string") {
        return [child];
      } else if (isObject(child)) {
        return [ainsleyToAst(child as Ainsley, options, variables)];
      } else {
        child = child as AinsleyRule | AinsleyPropertyOrPlaceholder;
        if (Array.isArray(child[1])) {
          return ainsleyRuleToAst(child as AinsleyRule, options, variables);
        } else {
          return ainsleyPropertyToAst(
            child as AinsleyPropertyOrPlaceholder,
            options
          );
        }
      }
    })
  );

const ainsleyRuleToAst = (
  ainsleyRule: AinsleyRule,
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST => {
  const selector = ainsleyRule[0];
  const declarations = ainsleyRule[1];
  const variablesFound: Array<[string, number]> = [];
  map(declarations, (declaration) => {
    const propertyMatches =
      ((declaration[0] as string) + "").match(ITERATOR_SEARCH) ?? [];
    const valueMatches =
      ((declaration[1] as string) + "").match(ITERATOR_SEARCH) ?? [];
    map(propertyMatches, (match) => variablesFound.push([match, 0]));
    map(valueMatches, (match) => variablesFound.push([match, 1]));
  });

  return map(
    combinations(
      map(variablesFound, (iteratorAndType: [string, number]) => {
        const iterator = iteratorAndType[0];
        const location = iteratorAndType[1];
        const variableName = iterator.slice(1, -1);
        return map(Object.keys(variables[variableName]), (abbreviation) => [
          iterator,
          abbreviation,
          variables[variableName][abbreviation],
          location
        ]);
      })
    ),
    (combination) => {
      let combinationIndex = 0;
      let current: [string, string, string | number, number] =
        combination[combinationIndex];

      return [
        combination.reduce(
          (
            selector: string,
            part: [string, string, string | number, number]
          ) => {
            if (part[3] === 0) {
              return options.addPropertyToSelector(selector, part[1]);
            } /* if (part[3] === 1) */ else {
              return options.addValueToSelector(selector, part[1]);
            }
          },
          selector
        ),
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
  ainsleyProperty: AinsleyPropertyOrPlaceholder,
  options: AinsleyGenerateOptions
): AinsleyAST => {
  const propertyInput = ainsleyProperty[0];
  const propertyValues = ainsleyProperty[1];

  const propertyData: [string, string] = options.abbreviateProperty(
    propertyInput
  );
  const propertyAbbreviation = propertyData[0];
  const propertyName = propertyData[1];

  return map(Object.keys(propertyValues), (valueAbbreviation: string) => [
    options.addValueToSelector(
      options.addPropertyToSelector("", propertyAbbreviation),
      valueAbbreviation
    ),
    [[propertyName, propertyValues[valueAbbreviation]]]
  ]);
};

const parseVariable = (variable: string): [number, string] => {
  const mod = "?+".indexOf(variable[0]) + 1;
  const base = mod > 0 ? variable.slice(1) : variable;
  return [mod, base];
};
