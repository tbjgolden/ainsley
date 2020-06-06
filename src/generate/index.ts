import {
  Ainsley,
  AinsleyRule,
  AinsleyPropertyOrPlaceholder,
  AinsleyVariableMap,
  AinsleyChild,
  AinsleyChildren,
  AinsleyGenerateOptions
} from '../types'
import { combinations } from '../utils'

interface AinsleyASTNode {
  $variations: Array<[string, string]>
  $content: string | AinsleyRule
}
type AinsleyAST = AinsleyASTNode[]

export const ITERATOR_REGEX = '\\{[a-zA-Z0-9_-]+\\}'
export const DEFAULT_OPTIONS: AinsleyGenerateOptions = {
  addVariationToSelector: (selector, variationAbbreviation) =>
    variationAbbreviation + '-' + selector,
  addPropertyToSelector: (selector, propertyAbbreviation) =>
    selector + propertyAbbreviation.toLowerCase(),
  addValueToSelector: (selector, valueAbbreviation) =>
    selector + valueAbbreviation.toUpperCase(),
  abbreviateProperty: (propertyName) => [
    propertyName
      .split('-')
      .map((word) => word.charAt(0))
      .join('')
      .toLowerCase(),
    propertyName.toLowerCase()
  ]
}

const ITERATOR_SEARCH = new RegExp(ITERATOR_REGEX, 'g')

export const generate = (
  ainsley: Ainsley,
  options: Partial<AinsleyGenerateOptions> = {}
): string => {
  const mergedOptions = { ...DEFAULT_OPTIONS, ...options }
  return generateFromAst(
    ainsleyToAst(ainsley, mergedOptions, {}),
    mergedOptions
  )
}

// next step:
// get variations to append to nested variations by passing them down;
// kinda like variables. this allows us to merge nested variations in the output
// which is kinda fun. but mostly because I don't know another way to do it

// next next step:
// get combinations to return a read only array - avoiding the need to
// recursively clone and concat - also means comparisons for this flattening
// business is made much simpler

const generateFromAst = (
  ainsleyRules: AinsleyAST,
  options: AinsleyGenerateOptions
): string => {
  let css = ''
  let lastVariations: Array<[string, string]> = []
  for (let i = 0; i < ainsleyRules.length; i++) {
    const ainsleyRule = ainsleyRules[i]

    let firstChange = 0
    while (
      firstChange < lastVariations.length &&
      lastVariations[firstChange] === ainsleyRule.$variations[firstChange]
    ) {
      firstChange += 1
    }

    const variationsToClose = lastVariations.slice(firstChange)
    for (const variationToClose of variationsToClose) {
      const variationInstruction = variationToClose[1]
      if (variationInstruction.startsWith('@')) css += '}'
    }
    const variationsToOpen = ainsleyRule.$variations.slice(firstChange)
    for (const variationToOpen of variationsToOpen) {
      const variationInstruction = variationToOpen[1]
      if (variationInstruction.startsWith('@'))
        css += `${variationInstruction}{`
    }

    if (typeof ainsleyRule.$content === 'string') {
      css += ainsleyRule.$content
    } else {
      let selector = ainsleyRule.$content[0]
      let selectorSuffix = ''

      for (let i = 0; i < ainsleyRule.$variations.length; i++) {
        const variationAbbreviation = ainsleyRule.$variations[i][0]
        const variationInstruction = ainsleyRule.$variations[i][1]
        if (variationInstruction === '') continue
        if (!variationInstruction.startsWith('@')) {
          selectorSuffix += `${variationInstruction}`
        }
        selector = options.addVariationToSelector(
          selector,
          variationAbbreviation
        )
      }
      css += `.${selector}${selectorSuffix}{${ainsleyRule.$content[1]
        .map((declaration) => `${declaration[0]}:${declaration[1]}`)
        .join(';')}}`
    }
    lastVariations = ainsleyRule.$variations
  }
  for (const variationToClose of lastVariations) {
    const variationInstruction = variationToClose[1]
    if (variationInstruction.startsWith('@')) css += '}'
  }
  return css
}

const ainsleyToAst = (
  ainsley: Ainsley,
  options: AinsleyGenerateOptions,
  inheritedVariables: AinsleyVariableMap
): AinsleyAST => {
  // first, compute variables
  const newVariables = { ...inheritedVariables }
  if (ainsley.variables !== undefined) {
    const variables = ainsley.variables
    Object.keys(variables).map((variable: string) => {
      const modAndBase = parseVariable(variable)
      const mod = modAndBase[0]
      const base = modAndBase[1]
      if (mod === 0 || (mod === 1 && newVariables[base] === undefined)) {
        newVariables[base] = variables[variable]
      } else if (mod === 2) {
        newVariables[base] = {
          ...(inheritedVariables[base] ?? {}),
          ...variables[variable]
        }
      }
    })
  }

  // then, flatten children into ast
  const rulesListWithoutVariations =
    ainsley.children === undefined
      ? []
      : ainsleyChildrenToAst(ainsley.children, options, newVariables)

  // lastly, multiply ast with variations
  const rulesList = combinations(
    (ainsley.variations ?? []).map((variationSet) =>
      [['', ''] as [string, string]].concat(variationSet)
    )
  ).flatMap((variations) =>
    rulesListWithoutVariations.map((ainsleyASTNode) => ({
      $variations: [...variations, ...ainsleyASTNode.$variations],
      $content: ainsleyASTNode.$content
    }))
  )

  return rulesList
}

const ainsleyChildrenToAst = (
  ainsleyChildren: AinsleyChildren,
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST =>
  ainsleyChildren.flatMap((child: AinsleyChild) => {
    if (typeof child === 'string') {
      return [
        {
          $variations: [],
          $content: child
        }
      ]
    } else if (Array.isArray(child)) {
      if (Array.isArray(child[1])) {
        return ainsleyRuleToAst(child as AinsleyRule, options, variables)
      } else {
        return ainsleyPropertyToAst(
          child as AinsleyPropertyOrPlaceholder,
          options
        )
      }
    } else {
      return ainsleyToAst(child, options, variables)
    }
  })

type AinsleyGenerateIteratorContext = [string, string, string | number, number]

const ainsleyRuleToAst = (
  ainsleyRule: AinsleyRule,
  options: AinsleyGenerateOptions,
  variables: AinsleyVariableMap
): AinsleyAST => {
  const selector = ainsleyRule[0]
  const declarations = ainsleyRule[1]
  const variablesFound: Array<[string, number]> = []
  declarations.map((declaration) => {
    const propertyMatches = declaration[0].match(ITERATOR_SEARCH) ?? []
    const valueMatches = `${declaration[1]}`.match(ITERATOR_SEARCH) ?? []
    propertyMatches.map((match) => variablesFound.push([match, 0]))
    valueMatches.map((match) => variablesFound.push([match, 1]))
  })

  return combinations(
    variablesFound.map((iteratorAndType: [string, number]) => {
      const iterator = iteratorAndType[0]
      const location = iteratorAndType[1]
      const variableName = iterator.slice(1, -1)

      if (!(variableName in variables)) {
        console.log(variables, variableName)
      }

      return Object.keys(variables[variableName]).map(
        (abbreviation: string): AinsleyGenerateIteratorContext => [
          iterator,
          abbreviation,
          variables[variableName][abbreviation],
          location
        ]
      )
    })
  ).map((combination) => {
    let combinationIndex = 0
    let current: AinsleyGenerateIteratorContext = combination[combinationIndex]

    return {
      $variations: [],
      $content: [
        combination.reduce(
          (selector: string, part: AinsleyGenerateIteratorContext) => {
            if (part[3] === 0) {
              return options.addPropertyToSelector(selector, part[1])
            } /* if (part[3] === 1) */ else {
              return options.addValueToSelector(selector, part[1])
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
              )
              current = combination[++combinationIndex]
            }
            return declarationPart
          }
          return [replacePart(declaration[0]), replacePart(`${declaration[1]}`)]
        })
      ]
    }
  })
}

const ainsleyPropertyToAst = (
  ainsleyProperty: AinsleyPropertyOrPlaceholder,
  options: AinsleyGenerateOptions
): AinsleyAST => {
  const propertyInput = ainsleyProperty[0]
  const propertyValues = ainsleyProperty[1]

  const propertyData: [string, string] = options.abbreviateProperty(
    propertyInput
  )
  const propertyAbbreviation = propertyData[0]
  const propertyName = propertyData[1]

  return Object.keys(propertyValues).map((valueAbbreviation: string) => ({
    $variations: [],
    $content: [
      options.addValueToSelector(
        options.addPropertyToSelector('', propertyAbbreviation),
        valueAbbreviation
      ),
      [[propertyName, propertyValues[valueAbbreviation]]]
    ]
  }))
}

const parseVariable = (variable: string): [number, string] => {
  const mod = '?+'.indexOf(variable[0]) + 1
  const base = mod > 0 ? variable.slice(1) : variable
  return [mod, base]
}
