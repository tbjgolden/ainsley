import base from "./base.js";

const extend = (ainsley = base, ...ainsleys) =>
  ainsleys.reduce(
    (ainsley, next) => ({
      ...ainsley,
      ...next,
      defs: [...ainsley.defs, ...next.defs],
      props: [...ainsley.props, ...next.props],
      raw: [...ainsley.raw, ...next.raw]
    }),
    base
  );

export default extend;
