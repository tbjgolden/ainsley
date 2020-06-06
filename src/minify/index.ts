import copy from 'fast-copy'
import { Ainsley, AinsleyChildren, AinsleyVariableMap } from '../types'
import { validate } from '../validate'
import { isObject } from '../utils'

// Using any as csso doesn't expose its types
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let csso: any = (globalThis as { csso?: any })?.csso
if (csso === undefined) {
  import('csso')
    .then(({ default: _csso }) => {
      csso = _csso
    })
    .catch(() => {
      //
    })
}

/*
TODOs:
- mangle variable names
- check if strings can be turnt into numbers
*/

/* flat config => minified (and still flat) config */
export const minify = (ainsley: Ainsley): Ainsley => {
  // validate input
  const errors = validate(ainsley)
  if (errors.length > 0) {
    throw new Error(`Invalid input Ainsley:\n${errors.join('\n')}`)
  }

  // clone and build ast list (mutates input)
  const list = toAST(copy(ainsley), new Set())

  // collapse ast from bottom up
  for (let i = list.length - 1; i >= 0; i--) {
    const node = list[i]

    // if no children
    if (
      node.ainsley.children === undefined ||
      node.ainsley.children.length === 0
    ) {
      // remove it from its parent
      if (node.parent !== undefined) {
        const parentChildren = node.parent.ainsley.children ?? []
        parentChildren.splice(
          parentChildren.findIndex((child) => child === node.ainsley),
          1
        )
      }
      // skip rest of the checks
      continue
    }

    // merge strings, and delete any empty ones
    for (let i = 0; i < node.ainsley.children.length; i++) {
      const child = node.ainsley.children[i]
      if (typeof child === 'string') {
        if (child.length === 0) {
          // remove empty string
          node.ainsley.children.splice(i--, 1)
        } else if (i > 0) {
          const prevSibling = node.ainsley.children[i - 1]
          if (typeof prevSibling === 'string') {
            // merge non-empty strings
            node.ainsley.children.splice(--i, 2, `${prevSibling}${child}`)
          }
        }
      }
    }

    // lift variables up if possible
    const thisVars = node.ainsley.variables ?? {}
    Object.keys(thisVars).forEach((variable) => {
      const [mod, base] = parseVariable(variable)

      if (node.usageCounts.has(base)) {
        // used, see if we can lift it

        if (node.parent !== undefined) {
          // remove default variables that are already defined
          if (mod === 1 && node.parent.definedVariables.has(base)) {
            delete thisVars[variable]
            return
          }

          // check how many siblings use this variable
          // 1 implies that this is the only child that uses it
          // so it can be lifted
          if ((node.parent.usageCounts.get(base) ?? 0) < 2) {
            if (!('variables' in node.parent.ainsley)) {
              node.parent.ainsley.variables = {}
            }

            const parentVars = node.parent.ainsley
              .variables as AinsleyVariableMap
            const parentVariable =
              Object.keys(parentVars).find((variable) =>
                variable.endsWith(base)
              ) ?? buildVariable(mod, '')
            const [parentMod] = parseVariable(parentVariable)
            const parentValue = parentVars[parentVariable] ?? {}
            const childValue = thisVars[variable]

            // remove old parent variable
            if (parentVars[parentVariable] !== undefined) {
              delete parentVars[parentVariable]
            }

            // remove old child variable
            delete thisVars[variable]

            // add new variable to parent
            parentVars[buildVariable(mod === 2 ? parentMod : 0, base)] = {
              ...(mod === 2 ? parentValue : {}),
              ...childValue
            }
          }
        }
      } else {
        // Remove unused variable
        delete thisVars[variable]
      }
    })

    // delete variables object if empty
    if (Object.keys(thisVars).length === 0) {
      delete node.ainsley.variables
    }

    // delete any empty variation
    if (Array.isArray(node.ainsley.variations)) {
      node.ainsley.variations = node.ainsley.variations.filter(
        (variation) => variation.length !== 0
      )
    }

    // delete variations array if empty
    if (Array.isArray(node.ainsley.variations)) {
      if (node.ainsley.variations.length === 0) delete node.ainsley.variations
    }

    // if node does nothing, merge it into its parent
    // (this only works with variables because by now each variable is at its
    // highest scope)
    if (!('variations' in node.ainsley || 'variables' in node.ainsley)) {
      if (node.parent !== undefined) {
        const parentChildren = node.parent.ainsley.children as AinsleyChildren
        const indexInParent = parentChildren.findIndex(
          (child) => child === node.ainsley
        )

        if (indexInParent !== -1) {
          parentChildren.splice(indexInParent, 1, ...node.ainsley.children)
        }
      }
    }
  }

  return list[0].ainsley
}

const MODIFIERS = '?+'

const parseVariable = (variable: string): [number, string] => {
  const mod = MODIFIERS.indexOf(variable[0]) + 1
  const base = mod > 0 ? variable.slice(1) : variable
  return [mod, base]
}

const buildVariable = (mod: number, base: string): string =>
  `${['', '?', '+'][mod]}${base}`

const minifyRaw = (rawCSS: string) => {
  try {
    return csso.minify(rawCSS).css
  } catch (error) {
    if (csso?.minify) {
      console.error(error)
    } else {
      console.warn(
        '`csso` - an optional dependency - is not installed; inline CSS will not be minified'
      )
    }
    return rawCSS
  }
}

const iteratorRegex = /\{[a-z]+\}/gi
const searchForUsages = (
  arr: Array<unknown | string | Record<string, unknown>>,
  set: Set<string> = new Set()
): Set<string> => {
  arr.forEach((val) => {
    if (Array.isArray(val)) {
      searchForUsages(val, set)
    } else if (typeof val === 'string') {
      const match = val.match(iteratorRegex)
      for (let i = 0; i < (match ?? []).length; i++) {
        set.add((match as string[])[i].slice(1, -1))
      }
    }
  })
  return set
}

interface ASTNode {
  parent: ASTNode | undefined
  ainsley: Ainsley
  usageCounts: Map<string, number>
  definedVariables: Set<string>
}

const toAST = (
  ainsley: Ainsley,
  definedVariables: Set<string>,
  parent?: ASTNode
): ASTNode[] => {
  const children = ainsley.children ?? []
  const usageCounts: Map<string, number> = new Map()
  const node = { ainsley, parent, usageCounts, definedVariables }

  const topologicalList = [node]

  for (let i = 0; i < children.length; i++) {
    const next = children[i]
    if (isObject(next)) {
      const ainsley = next as Ainsley
      const variables = ainsley.variables ?? {}

      const childNodes = toAST(
        ainsley,
        new Set([
          ...definedVariables,
          ...Object.keys(variables).map(
            (variable: string) => parseVariable(variable)[1]
          )
        ]),
        node
      )

      new Set(
        childNodes
          .map((node) => [...node.usageCounts.keys()])
          .reduce((arr, keys) => [...arr, ...keys], [])
      ).forEach((variable) => {
        usageCounts.set(variable, (usageCounts.get(variable) ?? 0) + 1)
      })

      topologicalList.push(...childNodes)
    } else if (Array.isArray(next)) {
      const usages = searchForUsages(next)
      usages.forEach((variable) => {
        usageCounts.set(variable, (usageCounts.get(variable) ?? 0) + 1)
      })
    } else {
      children.splice(i, 1, minifyRaw(next as string))
    }
  }

  return topologicalList as ASTNode[]
}
