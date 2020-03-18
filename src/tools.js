import baseConfig from "./base";
import { iteratorRegex } from "./compiler";
import { flat, assign } from "./utils";

export const base = baseConfig;

export const extend = ainsleys => {
  //#if !_LITE
  if (!Array.isArray(ainsleys)) throw new Error("extend needs an array");
  //#endif
  return ainsleys.reduce(
    (ainsley, next) =>
      assign([
        ainsley || {},
        next || {},
        {
          defs: flat([ainsley.defs, next.defs || []]),
          props: flat([ainsley.props, next.props || []]),
          raw: flat([ainsley.raw, next.raw || []]),
          mods: flat([ainsley.mods, next.mods || []])
        }
      ]),
    {
      defs: [],
      props: [],
      raw: [],
      mods: []
    }
  );
};
