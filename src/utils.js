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

export const assign = objects => {
  //#if !_LITE
  if (!Array.isArray(objects)) throw new Error("assign needs an array");
  //#endif

  const out = {};
  const len = objects.length;
  for (let i = 1; i < len; i++) {
    var obj = objects[i];
    if (obj) for (let nextKey in obj) out[nextKey] = obj[nextKey];
  }
  return out;
};
