export const isObject = (x: any): boolean =>
  !!(x !== null && typeof x === "object" && !Array.isArray(x));

export const combinations = <T>(mods: T[][]) => {
  let list: T[][] = [[]];
  let index = 0;
  while (index < mods.length) {
    list = mods[index++].flatMap((option) =>
      list.map((prev) => prev.concat([option]))
    );
  }
  return list;
};

export const memoize = (func: (arg1: string, arg2?: string) => any): any => {
  const cache: Record<string, any> = {};
  return (arg1: string, arg2?: string) => {
    const cacheKey = arg1 + "{}" + (arg2 as string);
    if (!(cache[cacheKey] as boolean)) cache[cacheKey] = func(arg1, arg2);
    return cache[cacheKey];
  };
};
