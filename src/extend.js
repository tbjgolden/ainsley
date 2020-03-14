import base from "./base.js";

export const extend = (ainsley = base, ...ainsleys) =>
  ainsleys.reduce(
    (ainsley, next) => ({
      ...(ainsley || {}),
      ...(next || {}),
      defs: [...(ainsley.defs || []), ...(next.defs || [])],
      props: [...(ainsley.props || []), ...(next.props || [])],
      raw: [...(ainsley.raw || []), ...(next.raw || [])],
      mods: [...(ainsley.mods || []), ...(next.mods || [])]
    }),
    base
  );
