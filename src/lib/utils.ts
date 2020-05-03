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
