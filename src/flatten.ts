import "isomorphic-fetch";
import copy from "fast-copy";
import { Ainsley, AinsleyChild, AinsleyChildren } from "./types";

const isObject = (x: any): boolean =>
  !!(x !== null && typeof x === "object" && !Array.isArray(x));

export const defaultGetConfig = async (ref: string): Promise<AinsleyChild> => {
  try {
    return require(`ainsley-config-${ref}`).config;
  } catch (err) {
    try {
      const url = new URL(ref);
      return await fetch(url.href).then(async (response) => {
        if ((response.headers.get("Content-Type") ?? "").endsWith("/json")) {
          return await response.json();
        } else {
          return await response.text();
        }
      });
    } catch (err) {
      return await Promise.resolve(`/* $${ref} */`);
    }
  }
};

export const getFlatConfig = async (
  ref: string,
  getConfig: (config: string) => Promise<AinsleyChild>
): Promise<AinsleyChild> => {
  try {
    const config = await getConfig(ref);

    if (isObject(config)) {
      return await flatten(config as Ainsley, getConfig);
    } else {
      return config;
    }
  } catch (e) {
    return `/* $${ref} */`;
  }
};

/*
[ config with plugins ]                 |
which is flattened into                 | flatten()
[ flat config (no plugins) ]            |
*/
export const flatten = async (
  configWithPlugins: Ainsley,
  getConfig = defaultGetConfig
): Promise<Ainsley> => {
  const flatAinsley = copy(configWithPlugins);

  // check for configs and inject them
  if (Array.isArray(flatAinsley.children)) {
    await Promise.all(
      flatAinsley.children.map(
        async (child: AinsleyChild, i: number): Promise<AinsleyChild> => {
          if (typeof child === "string") {
            if (child.startsWith("$")) {
              const flatConfig = await getFlatConfig(child.slice(1), getConfig);
              (flatAinsley.children as AinsleyChildren)[i] = flatConfig;
            }
          }
          return child;
        }
      )
    );
  }

  return flatAinsley;
};
