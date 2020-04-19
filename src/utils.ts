export const map = (arr: any[], fn: (value: any) => any): any[] => {
  const out = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) out.push(fn(arr[i]));
  return out;
};

export const flat = (arr: any[][]) =>
  // eslint-disable-next-line prefer-spread
  ([] as any[]).concat.apply([], arr);

export const combinations = (mods: any[][]) => {
  let list: any[][] = [[]];
  let index = 0;
  while (index < mods.length) {
    list = flat(
      map(mods[index++], (option) => list.map((prev) => prev.concat([option])))
    );
  }
  return list;
};

export const assign = (objects: Array<Record<string, any>>) => {
  const out: Record<string, any> = {};
  const len = objects.length;
  for (let i = 0; i < len; i++) {
    const obj = objects[i];
    for (const nextKey in obj) {
      out[nextKey] = obj[nextKey];
    }
  }
  return out;
};

export const toString = (value: any): string =>
  typeof value === "string" ? value : (value as string) + "";
