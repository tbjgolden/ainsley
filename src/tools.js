//#if !_LITE
import check from "./libs/checkTypes";
import { lint } from "./lint";
//#endif

import { iteratorRegex } from "./compiler";
import { flat, assign } from "./utils";
import { empty } from "./empty";

export const extend = ainsleys => {
  //#if !_LITE
  check.assert.nonEmptyArray(ainsleys);
  check.assert.array.of.object(ainsleys);
  ainsleys.forEach(subainsley => {
    check.assert.maybe.array.of.nonEmptyArray(subainsley.defs);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.props);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.raw);
    check.assert.maybe.array.of.nonEmptyArray(subainsley.mods);
  });
  //#endif

  const result = ainsleys.reduce(
    (ainsley, next) =>
      assign([
        ainsley,
        next,
        {
          defs: flat([ainsley.defs, next.defs || []]),
          props: flat([ainsley.props, next.props || []]),
          raw: flat([ainsley.raw, next.raw || []]),
          mods: flat([ainsley.mods, next.mods || []])
        }
      ]),
    empty
  );

  //#if !_LITE
  lint(result);
  //#endif

  return result;
};
