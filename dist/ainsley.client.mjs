/*! ainsley | MIT License | @tbjgolden | tom.bio */
const combinations = mods => {
  let list = [[]];
  let index = 0;

  while (index < mods.length) {
    list = mods[index++].flatMap(option => list.map(prev => prev.concat([option])));
  }

  return list;
};

const ITERATOR_REGEX = '\\{[a-zA-Z0-9_-]+\\}';
const DEFAULT_OPTIONS = {
  addVariationToSelector: (selector, variationAbbreviation) => variationAbbreviation + '-' + selector,
  addPropertyToSelector: (selector, propertyAbbreviation) => selector + propertyAbbreviation.toLowerCase(),
  addValueToSelector: (selector, valueAbbreviation) => selector + valueAbbreviation.toUpperCase(),
  abbreviateProperty: propertyName => [propertyName.split('-').map(word => word.charAt(0)).join('').toLowerCase(), propertyName.toLowerCase()]
};
const ITERATOR_SEARCH = new RegExp(ITERATOR_REGEX, 'g');
const generate = (ainsley, options = {}) => {
  const mergedOptions = { ...DEFAULT_OPTIONS,
    ...options
  };
  return generateFromAst(ainsleyToAst(ainsley, mergedOptions, {}), mergedOptions);
}; // next step:
// get variations to append to nested variations by passing them down;
// kinda like variables. this allows us to merge nested variations in the output
// which is kinda fun. but mostly because I don't know another way to do it
// next next step:
// get combinations to return a read only array - avoiding the need to
// recursively clone and concat - also means comparisons for this flattening
// business is made much simpler

const generateFromAst = (ainsleyRules, options) => {
  let css = '';
  let lastVariations = [];

  for (let i = 0; i < ainsleyRules.length; i++) {
    const ainsleyRule = ainsleyRules[i];
    let firstChange = 0;

    while (firstChange < lastVariations.length && lastVariations[firstChange] === ainsleyRule.$variations[firstChange]) {
      firstChange += 1;
    }

    const variationsToClose = lastVariations.slice(firstChange);

    for (const variationToClose of variationsToClose) {
      const variationInstruction = variationToClose[1];
      if (variationInstruction.startsWith('@')) css += '}';
    }

    const variationsToOpen = ainsleyRule.$variations.slice(firstChange);

    for (const variationToOpen of variationsToOpen) {
      const variationInstruction = variationToOpen[1];
      if (variationInstruction.startsWith('@')) css += `${variationInstruction}{`;
    }

    if (typeof ainsleyRule.$content === 'string') {
      css += ainsleyRule.$content;
    } else {
      let selector = ainsleyRule.$content[0];
      let selectorSuffix = '';

      for (let i = 0; i < ainsleyRule.$variations.length; i++) {
        const variationAbbreviation = ainsleyRule.$variations[i][0];
        const variationInstruction = ainsleyRule.$variations[i][1];
        if (variationInstruction === '') continue;

        if (!variationInstruction.startsWith('@')) {
          selectorSuffix += `${variationInstruction}`;
        }

        selector = options.addVariationToSelector(selector, variationAbbreviation);
      }

      css += `.${selector}${selectorSuffix}{${ainsleyRule.$content[1].map(declaration => `${declaration[0]}:${declaration[1]}`).join(';')}}`;
    }

    lastVariations = ainsleyRule.$variations;
  }

  for (const variationToClose of lastVariations) {
    const variationInstruction = variationToClose[1];
    if (variationInstruction.startsWith('@')) css += '}';
  }

  return css;
};

const ainsleyToAst = (ainsley, options, inheritedVariables) => {
  var _a; // first, compute variables


  const newVariables = { ...inheritedVariables
  };

  if (ainsley.variables !== undefined) {
    const variables = ainsley.variables;
    Object.keys(variables).map(variable => {
      var _a;

      const modAndBase = parseVariable(variable);
      const mod = modAndBase[0];
      const base = modAndBase[1];

      if (mod === 0 || mod === 1 && newVariables[base] === undefined) {
        newVariables[base] = variables[variable];
      } else if (mod === 2) {
        newVariables[base] = { ...((_a = inheritedVariables[base]) !== null && _a !== void 0 ? _a : {}),
          ...variables[variable]
        };
      }
    });
  } // then, flatten children into ast


  const rulesListWithoutVariations = ainsley.children === undefined ? [] : ainsleyChildrenToAst(ainsley.children, options, newVariables); // lastly, multiply ast with variations

  const rulesList = combinations(((_a = ainsley.variations) !== null && _a !== void 0 ? _a : []).map(variationSet => [['', '']].concat(variationSet))).flatMap(variations => rulesListWithoutVariations.map(ainsleyASTNode => ({
    $variations: [...variations, ...ainsleyASTNode.$variations],
    $content: ainsleyASTNode.$content
  })));
  return rulesList;
};

const ainsleyChildrenToAst = (ainsleyChildren, options, variables) => ainsleyChildren.flatMap(child => {
  if (typeof child === 'string') {
    return [{
      $variations: [],
      $content: child
    }];
  } else if (Array.isArray(child)) {
    if (Array.isArray(child[1])) {
      return ainsleyRuleToAst(child, options, variables);
    } else {
      return ainsleyPropertyToAst(child, options);
    }
  } else {
    return ainsleyToAst(child, options, variables);
  }
});

const ainsleyRuleToAst = (ainsleyRule, options, variables) => {
  const selector = ainsleyRule[0];
  const declarations = ainsleyRule[1];
  const variablesFound = [];
  declarations.map(declaration => {
    var _a, _b;

    const propertyMatches = (_a = declaration[0].match(ITERATOR_SEARCH)) !== null && _a !== void 0 ? _a : [];
    const valueMatches = (_b = `${declaration[1]}`.match(ITERATOR_SEARCH)) !== null && _b !== void 0 ? _b : [];
    propertyMatches.map(match => variablesFound.push([match, 0]));
    valueMatches.map(match => variablesFound.push([match, 1]));
  });
  return combinations(variablesFound.map(iteratorAndType => {
    const iterator = iteratorAndType[0];
    const location = iteratorAndType[1];
    const variableName = iterator.slice(1, -1);

    if (!(variableName in variables)) {
      console.log(variables, variableName);
    }

    return Object.keys(variables[variableName]).map(abbreviation => [iterator, abbreviation, variables[variableName][abbreviation], location]);
  })).map(combination => {
    let combinationIndex = 0;
    let current = combination[combinationIndex];
    return {
      $variations: [],
      $content: [combination.reduce((selector, part) => {
        if (part[3] === 0) {
          return options.addPropertyToSelector(selector, part[1]);
        }
        /* if (part[3] === 1) */
        else {
            return options.addValueToSelector(selector, part[1]);
          }
      }, selector), declarations.map(declaration => {
        const replacePart = declarationPart => {
          while (combinationIndex < combination.length && declarationPart.includes(current[0])) {
            declarationPart = declarationPart.replace(current[0], `${current[2]}`);
            current = combination[++combinationIndex];
          }

          return declarationPart;
        };

        return [replacePart(declaration[0]), replacePart(`${declaration[1]}`)];
      })]
    };
  });
};

const ainsleyPropertyToAst = (ainsleyProperty, options) => {
  const propertyInput = ainsleyProperty[0];
  const propertyValues = ainsleyProperty[1];
  const propertyData = options.abbreviateProperty(propertyInput);
  const propertyAbbreviation = propertyData[0];
  const propertyName = propertyData[1];
  return Object.keys(propertyValues).map(valueAbbreviation => ({
    $variations: [],
    $content: [options.addValueToSelector(options.addPropertyToSelector('', propertyAbbreviation), valueAbbreviation), [[propertyName, propertyValues[valueAbbreviation]]]]
  }));
};

const parseVariable = variable => {
  const mod = '?+'.indexOf(variable[0]) + 1;
  const base = mod > 0 ? variable.slice(1) : variable;
  return [mod, base];
};

// singleton embed pattern, using id as the unique identifier
const embed = (css, id) => {
  let styleEl = null;
  if (id !== undefined) styleEl = document.querySelector(`style#${id}`);

  if (styleEl === null) {
    styleEl = document.createElement('style');
    styleEl.type = 'text/css';
    if (id !== undefined) styleEl.setAttribute('id', id);
    document.head.appendChild(styleEl);
  }

  styleEl.innerHTML = css;
};

export { DEFAULT_OPTIONS, ITERATOR_REGEX, embed, generate };
//# sourceMappingURL=ainsley.client.mjs.map
