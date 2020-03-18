//#if !_LITE
import check from "./libs/checkTypes";
//#endif

export const fastClone = val => {
  //#if !_LITE
  check.assert.not.function(val);
  //#endif

  if (typeof val !== "object") return val;

  //#if !_LITE
  check.assert.array(val);
  //#endif

  const arr = [];
  const len = val.length;
  for (let i = 0; i < len; i++) {
    arr.push(fastClone(val[i]));
  }

  return arr;
};

export const map = (arr, fn) => {
  //#if !_LITE
  check.assert.array(arr);
  check.assert.function(fn);
  //#endif

  const out = [];
  const len = arr.length;
  for (let i = 0; i < len; i++) out.push(fn(arr[i]));
  return out;
};

export const flat = arr => {
  //#if !_LITE
  check.assert.array.of.array(arr);
  //#endif

  return [].concat.apply([], arr);
};

export const combinations = mods => {
  //#if !_LITE
  check.assert.array(mods);
  check.assert.array.of.nonEmptyArray(mods);
  //#endif

  let list = [[]];
  while (mods.length)
    list = flat(mods.shift().map(opt => list.map(prev => prev.concat([opt]))));
  return list;
};

export const assign = objects => {
  //#if !_LITE
  check.assert.nonEmptyArray(objects);
  check.assert.array.of.nonEmptyObject(objects);
  //#endif

  const out = {};
  const len = objects.length;
  for (let i = 0; i < len; i++) {
    var obj = objects[i];
    for (let nextKey in obj) out[nextKey] = obj[nextKey];
  }
  return out;
};
