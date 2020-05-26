export const isObject = (val: unknown): boolean =>
  !!(val !== null && typeof val === 'object' && !Array.isArray(val))

export const combinations = <T>(mods: T[][]): T[][] => {
  let list: T[][] = [[]]
  let index = 0
  while (index < mods.length) {
    list = mods[index++].flatMap((option) =>
      list.map((prev) => prev.concat([option]))
    )
  }
  return list
}
