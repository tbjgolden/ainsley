import React from "react";
import { flatten } from "../ainsley";
import { configWithPlugins } from "../examples";

const Site = () => {
  flatten(configWithPlugins);

  return <div>Hello World</div>;
};

export default Site;
