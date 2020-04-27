import {
  Ainsley,
  AinsleyRule,
  AinsleyPropertyOrPlaceholder,
  AinsleyVariableMap,
  AinsleyChild,
  AinsleyChildren,
  AinsleyGenerateOptions
} from "../types";
import { isObject, combinations } from "./utils";

type AinsleyAST = Array<string | AinsleyRule | [string, AinsleyAST]>;

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
): string =>
  generateFromAst(
    ainsleyToAst(ainsley, { ...DEFAULT_OPTIONS, ...options }, {})
  );

export const generateFromAst = (ainsleyRules: AinsleyAST): string =>
  ainsleyRules
    .map((ainsleyRule) => {
      if (typeof ainsleyRule === "string") {
        return ainsleyRule;
      } else if (ainsleyRule[0].charAt(0) === "@") {
        const rule = ainsleyRule as [string, AinsleyAST];
        return `${rule[0]}{${generateFromAst(rule[1])}}`;
      } else {
        const rule = ainsleyRule as AinsleyRule;
        return `.${rule[0]}{${rule[1]
          .map((declaration) => `${declaration[0]}:${declaration[1]}`)
          .join(";")}}`;
      }
    })
    .join("");

const ainsleyToAst = (
  ainsley: Ainsley,
  options: AinsleyGenerateOptions,
  inheritedVariables: AinsleyVariableMap
): AinsleyAST => {
  // first, compute variables
  const newVariables = { ...inheritedVariables };
  if (isObject(ainsley.variables)) {
    const variables = ainsley.variables as AinsleyVariableMap;
    Object.keys(variables).map((variable: string) => {
      const modAndBase = parseVariable(variable);
      const mod = modAndBase[0];
      const base = modAndBase[1];
      if (mod === 0) {
        newVariables[base] = variables[variable];
      } else if (mod === 2) {
        newVariables[base] = {
          ...inheritedVariables[base],
          ...variables[variable]
        };
      }
    });
  }

  // then, flatten children into ast
  const rulesListWithoutVariants =
    ainsley.children === undefined
      ? []
      : ainsleyChildrenToAst(ainsley.children, options, newVariables);

  // lastly, multiply ast with variations
  const rulesList: AinsleyAST = combinations(
    (ainsley.variations ?? []).map((variationSet) =>
      [["", ""]].concat(variationSet)
    )
  ).flatMap((combination) =>
    combination.reduce((prevAst, variation) => {
      const variationAbbreviation = variation[0];
      const variationInstruction = variation[1];

      if (variationInstruction === "") {
        return prevAst;
      } else if (variationInstruction.charAt(0) === "@") {
        return [
          [
            variationInstruction,
            prevAst.map((rule: AinsleyRule) =>
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
        return prevAst.map((rule: AinsleyRule) =>
          typeof rule === "string"
            ? rule
            : [
                options.addVariationToSelector(rule[0], variationAbbreviation) +
                  variationInstruction,
                rule[1]
              ]
        );
      }
    }, rulesListWithoutVariants)
  );

  return rulesList;
};

const ainsleyChildrenToAst = (
  ainsleyChildren: AinsleyChildren,
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST =>
  ainsleyChildren.flatMap((child: AinsleyChild) => {
    if (typeof child === "string") {
      return [child];
    } else if (isObject(child)) {
      return ainsleyToAst(child as Ainsley, options, variables);
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
  });

type AinsleyGenerateIteratorContext = [string, string, string | number, number];

const ainsleyRuleToAst = (
  ainsleyRule: AinsleyRule,
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST => {
  const selector = ainsleyRule[0];
  const declarations = ainsleyRule[1];
  const variablesFound: Array<[string, number]> = [];
  declarations.map((declaration) => {
    const propertyMatches = declaration[0].match(ITERATOR_SEARCH) ?? [];
    const valueMatches = `${declaration[1]}`.match(ITERATOR_SEARCH) ?? [];
    propertyMatches.map((match) => variablesFound.push([match, 0]));
    valueMatches.map((match) => variablesFound.push([match, 1]));
  });

  return combinations(
    variablesFound.map((iteratorAndType: [string, number]) => {
      const iterator = iteratorAndType[0];
      const location = iteratorAndType[1];
      const variableName = iterator.slice(1, -1);
      return Object.keys(variables[variableName]).map(
        (abbreviation: string): AinsleyGenerateIteratorContext => [
          iterator,
          abbreviation,
          variables[variableName][abbreviation],
          location
        ]
      );
    })
  ).map((combination) => {
    let combinationIndex = 0;
    let current: AinsleyGenerateIteratorContext = combination[combinationIndex];

    return [
      combination.reduce(
        (selector: string, part: AinsleyGenerateIteratorContext) => {
          if (part[3] === 0) {
            return options.addPropertyToSelector(selector, part[1]);
          } /* if (part[3] === 1) */ else {
            return options.addValueToSelector(selector, part[1]);
          }
        },
        selector
      ),
      declarations.map((declaration) => {
        const replacePart = (declarationPart: string): string => {
          while (
            combinationIndex < combination.length &&
            declarationPart.includes(current[0])
          ) {
            declarationPart = declarationPart.replace(
              current[0],
              `${current[2]}`
            );
            current = combination[++combinationIndex];
          }
          return declarationPart;
        };
        return [replacePart(declaration[0]), replacePart(`${declaration[1]}`)];
      })
    ];
  });
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

  return Object.keys(propertyValues).map((valueAbbreviation: string) => [
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
