import { Ainsley, AinsleyChild } from "./types";
import { baseConfig } from "./examples";


export const defaultGetConfig = (name: string): Ainsley => require(`ainsley-config-${name}`).config;

export const getFlatConfig = (name: string, getConfig: (name: string) => Ainsley): AinsleyChild => {
  try {
    return flatten(getConfig(name), getConfig);
  } catch (e) {/**/}
  return `/* $${name} */`;
};

const isConfigRegex = /^\$([a-z0-9-]+)$/;

/*
[ config with plugins ]                 |
which is flattened into                 | flatten()
[ flat config (no plugins) ]            |
*/
export const flatten = (
  configWithPlugins: Ainsley,
  getConfig = defaultGetConfig
): Ainsley => {
  // deep clone
  const flatAinsley = JSON.parse(JSON.stringify(configWithPlugins));

  // check for configs and inject them
  if (Array.isArray(flatAinsley.children)) {
    flatAinsley.children = flatAinsley.children.map(
      (child: AinsleyChild): AinsleyChild => {
        if (typeof child === "string") {
          const match = child.match(isConfigRegex);
          if (Array.isArray(match)) {
            return getFlatConfig(match[1], getConfig);
          }
        }
        return child;
      }
    );
  }

  return flatAinsley;
};
