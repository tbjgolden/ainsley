import fetch from 'isomorphic-unfetch'
import copy from 'fast-copy'
import { Ainsley, AinsleyChild, AinsleyChildren } from '../types'
import { validate } from '../validate'
import { isObject } from '../utils'

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

  // check for configs and inject them
  if (Array.isArray(flatAinsley.children)) {
    await Promise.all(
      flatAinsley.children.map(
        async (child: AinsleyChild, i: number): Promise<AinsleyChild> => {
          if (typeof child === 'string') {
            if (child.startsWith('$')) {
              const flatConfig = await getFlatConfig(child.slice(1), getConfig)
              ;(flatAinsley.children as AinsleyChildren)[i] = flatConfig
            }
          }
          return child
        }
      )
    )
  }

  return flatAinsley
}

export const defaultGetConfig = async (ref: string): Promise<AinsleyChild> => {
  try {
    return require(`ainsley-config-${ref}`).config
  } catch (err) {
    try {
      const url = new URL(ref)
      const response = await fetch(url.href)
      if ((response.headers.get('Content-Type') ?? '').endsWith('/json')) {
        return await response.json()
      } else {
        return await response.text()
      }
    } catch (err) {
      return await Promise.resolve(`/* $${ref} */`)
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
    return `/* $${ref} */`
  }
}
