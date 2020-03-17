export const fastClone = val => {
  if (typeof val !== "object") return val;
  const arr = [];
  const len = val.length;
  for (let i = 0; i < len; i++) arr.push(fastClone(val[i]));
  return arr;
};

export const map = (arr, fn) => {
  const out = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) out.push(fn(arr[i]));
  return out;
};

export const flat = arr => [].concat.apply([], arr);

export const combinations = mods => {
  let list = [[]];
  while (mods.length)
    list = flat(mods.shift().map(opt => list.map(prev => prev.concat([opt]))));
  return list;
};
