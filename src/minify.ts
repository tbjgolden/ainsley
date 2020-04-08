import { Ainsley, AinsleyMeta, AinsleyVariableMap, AinsleyChildren } from "./types";
import { Children } from "react";

const isObj = (x: any): boolean => !!(x && typeof x === "object" && !Array.isArray(x));

const iteratorRegex = /\{[a-z]+\}/gi;
const searchForUsages = (arr: any[], set: Set<string> = new Set()): Set<string> => {
  arr.forEach(val => {
    if (Array.isArray(val)) {
      searchForUsages(val, set);
    } else if (typeof val === "string") {
      const match = val.match(iteratorRegex);
      for (let i = 0; i < (match || []).length; i++) {
        set.add((match as string[])[i].slice(1, -1));
      }
    }
  });
  return set;
};

const addMetadata = (ainsley: Ainsley): AinsleyMeta => {
  const ainsleyMeta = ainsley as AinsleyMeta
  if (!ainsleyMeta._) ainsleyMeta._ = {};
  return _addMetadata(ainsleyMeta);
};

const _addMetadata = (ainsleyMeta: AinsleyMeta): AinsleyMeta => {
  const usages: Map<string, number> = new Map();
  if (ainsleyMeta.children) {
    ainsleyMeta.children.forEach(child => {
      if (isObj(child)) {
        child = addMetadata(child as Ainsley);
        Array.from((child as AinsleyMeta)._.usages.keys()).forEach(childUsage => {
          usages.set(childUsage as string, (usages.get(childUsage as string) || 0) + 1);
        });
      } else if (Array.isArray(child)) {
        searchForUsages(child).forEach(childUsage => {
          usages.set(childUsage, (usages.get(childUsage) || 0) + 1);
        });
      }
    });
  }
  ainsleyMeta._.usages = usages;
  return ainsleyMeta;
};

const fix = (ainsley: AinsleyMeta) => {
  const computedVariables = {} as AinsleyVariableMap;
  if (ainsley.variables) {
    Object.entries(ainsley.variables).forEach(([variable, value]) => {
      if (variable !== "") {
        const modifier = "?+".indexOf(variable[0]) + 1;
        if (modifier) variable = variable.slice(1);
        (computedVariables as AinsleyVariableMap)[variable] = value;
      }
    });
  };
  return _fix(ainsley, computedVariables);
};

const _fix = (ainsley: AinsleyMeta, computedVariables: AinsleyVariableMap) => {
  if (!computedVariables) {
    // initialize computedVariables
    computedVariables = {} as AinsleyVariableMap;
    if (ainsley.variables) {
      Object.entries(ainsley.variables).forEach(([variable, value]) => {
        if (variable !== "") {
          const modifier = "?+".indexOf(variable[0]) + 1;
          if (modifier) variable = variable.slice(1);
          (computedVariables as AinsleyVariableMap)[variable] = value;
        }
      });
    }
  }

  // traverse ainsley's children
  const parentAinsley = ainsley as AinsleyMeta;
  const children = parentAinsley.children || [];
  for (let i = 0; i < children.length; i++) {
    const child = children[i];
    if (isObj(child)) {
      const childAinsley = child as AinsleyMeta;
      // compute these variables here

      if (childAinsley.children) {
        if (childAinsley.variables) {
          computedVariables = Object.entries(childAinsley.variables as object)
            .reduce((cvs, [variable, value]) => {
              if (variable === "") {
                delete (childAinsley.variables as any)[""];
              } else {
                const modifier = "?+".indexOf(variable[0]) + 1;
                if (modifier) variable = variable.slice(1);
                cvs[variable] = ([
                  value,
                  cvs[variable],
                  { ...cvs[variable], ...value }
                ])[modifier];
              }

              return cvs;
            }, JSON.parse(JSON.stringify(computedVariables)));

          _fix(childAinsley, computedVariables);

          const parentVarMap: Map<string, [number, any]> = new Map();
          Object.entries(parentAinsley.variables || {})
            .forEach(([variable, value]) => {
              let rootVariable = variable;
              const modifier = "?+".indexOf(variable[0]) + 1;
              if (modifier) rootVariable = variable.slice(1);
              // could check here for clashes
              parentVarMap.set(rootVariable, [modifier, value]);
            });

          Object.entries(childAinsley.variables as object)
            .forEach(([variable, value]) => {
              let rootVariable = variable;
              const modifier = "?+".indexOf(variable[0]) + 1;
              if (modifier) rootVariable = variable.slice(1);

              const childVars = childAinsley.variables as AinsleyVariableMap;
              const compVars = computedVariables as AinsleyVariableMap;

              // if it has 0 usages, or it's a ? is inside an already declared variable, remove it
              const timesUsedInChildren = childAinsley._.usages.get(rootVariable) || 0;
              const isUnnecessaryDefault = modifier === 1 && compVars[rootVariable];
              if ((timesUsedInChildren === 0) || isUnnecessaryDefault) {
                delete childVars[variable];
              } else if ((parentAinsley._.usages.get(rootVariable) || 1) < 2) {
                // else check if it can be lifted up
                // if it can, replace/merge the child value into the parent
                const [parentVarMod, parentVarValue] = parentVarMap.get(rootVariable) || [0, {}];
                const toLift = modifier === 2
                  ? [`${(["", "?", "+"])[parentVarMod]}${rootVariable}`, { ...parentVarValue, ...value }]
                  : [rootVariable, value];

                delete childVars[variable];
                if (parentVarMap.size === 0) parentAinsley.variables = {};
                parentVarMap.set(rootVariable, [3, toLift[1]]);

                const parentVars = parentAinsley.variables as AinsleyVariableMap;
                parentVars[toLift[0]] = toLift[1];
              }

              // remove empty variables objects
              if (Object.keys(childVars).length === 0) {
                delete childAinsley.variables;
              }

              // remove empty variations objects
              if (childAinsley.variations && Object.keys(childAinsley.variations).length === 0) {
                delete childAinsley.variations;
              }

              if (!childAinsley.variables && !childAinsley.variations) {
                children.splice(i, 1, ...(childAinsley.children as AinsleyChildren));
              }
            });
        }
      } else {
        // if no child has no children, remove it
        children.splice(i--, 1);
      }
    }
  }

  return ainsley;
};

const removeMetadata = (metaAinsley: AinsleyMeta): Ainsley => {
  if (metaAinsley.children) {
    metaAinsley.children.forEach(child => {
      if (isObj(child)) removeMetadata(child as AinsleyMeta);
    });
  }
  delete metaAinsley._;
  return metaAinsley;
};

/*
[ flat config (no plugins) ]            |
which is minified into a                | minify()
[ minified config ]                     |
*/
export const minify = (
  flatConfig: Ainsley
): Ainsley => removeMetadata(fix(addMetadata(JSON.parse(JSON.stringify(flatConfig)))));
