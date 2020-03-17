import baseConfig from "./base";

export const base = baseConfig;

export const extend = (...ainsleys) =>
  ainsleys.reduce(
    (ainsley, next) => ({
      ...(ainsley || {}),
      ...(next || {}),
      defs: [...ainsley.defs, ...(next.defs || [])],
      props: [...ainsley.props, ...(next.props || [])],
      raw: [...ainsley.raw, ...(next.raw || [])],
      mods: [...ainsley.mods, ...(next.mods || [])]
    }),
    {
      defs: [],
      props: [],
      raw: [],
      mods: []
    }
  );

export const check = ainsley => {
  Object.entries(([k, v]) => {
    console.log(k, v);
  });
};
