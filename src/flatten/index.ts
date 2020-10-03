import fetch from 'isomorphic-unfetch'
import copy from 'fast-copy'
import { Ainsley, AinsleyChild, AinsleyChildren } from '../types'
import { validate } from '../validate'
import { isObject } from '../utils'

type CfgLoc = [AinsleyChildren, number]
const findConfigs = (ainsley: Ainsley): CfgLoc[] => {
  const cfgLocs: CfgLoc[] = []
  if (ainsley.children) {
    const children = ainsley.children
    for (let i = 0; i < children.length; i++) {
      const child = children[i]
      if (typeof child === 'string') {
        if (child[0] === '$') {
          cfgLocs.push([children, i])
        }
      } else if (!Array.isArray(child)) {
        cfgLocs.push(...findConfigs(child))
      }
    }
  }
  return cfgLocs
}

/* config with external dependencies => flat config */
export const flatten = async (
  configWithPlugins: Ainsley,
  getConfig = defaultGetConfig
): Promise<Ainsley> => {
  // validate
  const errors = validate(configWithPlugins)
  if (errors.length > 0) {
    throw new Error(`Invalid input Ainsley:\n${errors.join('\n')}`)
  }

  // deep clone as we'll be mutating
  const flatAinsley = copy(configWithPlugins)
  const allConfigs = findConfigs(flatAinsley)

  await Promise.all(
    allConfigs.map(async ([children, index]) => {
      const child = children[index] as string
      children[index] = await getFlatConfig(child.slice(1), getConfig)
    })
  )

  return flatAinsley
}

export const defaultGetConfig = async (ref: string): Promise<AinsleyChild> => {
  try {
    return (await import(`ainsley-config-${ref}`)).config
  } catch (err) {
    try {
      const url = new URL(ref)
      const response = await fetch(url.href)
      let body = await response.text()
      try {
        body = JSON.parse(body)
      } catch (err) {}
      return body
    } catch (err) {
      return `/* ${ref.trim()} */`
    }
  }
}

export const getFlatConfig = async (
  ref: string,
  getConfig: (config: string) => Promise<AinsleyChild>
): Promise<AinsleyChild> => {
  try {
    const config = await getConfig(ref)
    if (isObject(config)) {
      return await flatten(config as Ainsley, getConfig)
    } else {
      return config
    }
  } catch (e) {
    return `/* ${ref.trim()} */`
  }
}
