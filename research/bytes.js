const brotli = require("brotli");
const { gzip } = require("node-gzip");
const fs = require("fs");
const path = require("path");
const csstree = require("css-tree");
require("isomorphic-fetch");

const checkUrl = async (name, url) => {
  const css = await (await fetch(url)).text();
  return checkCSS(name, css);
};

const checkCSS = async (name, css) => {
  let count = 0;
  csstree.walk(csstree.parse(css), {
    visit: "Rule",
    enter: () => count++
  });

  return {
    min: Buffer.from(css).byteLength,
    gz: (await gzip(css)).byteLength,
    br: brotli.compress(css, { mode: 1 }).byteLength,
    count
  };
};

(async () => {
  const results = await Promise.all(
    Object.entries({
      bootstrap:
        "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.4.1/css/bootstrap.min.css",
      bulma:
        "https://cdnjs.cloudflare.com/ajax/libs/bulma/0.8.0/css/bulma.min.css",
      materialize:
        "https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css",
      spectre:
        "https://cdnjs.cloudflare.com/ajax/libs/spectre.css/0.5.8/spectre.min.css",
      foundation:
        "https://cdnjs.cloudflare.com/ajax/libs/foundation/6.6.1/css/foundation.min.css",
      milligram:
        "https://cdnjs.cloudflare.com/ajax/libs/milligram/1.3.0/milligram.min.css",
      skeleton:
        "https://cdnjs.cloudflare.com/ajax/libs/skeleton/2.0.4/skeleton.min.css"
      // tailwindcss: "https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css",
      // tachyons:
      //   "https://raw.githubusercontent.com/tachyons-css/tachyons/master/css/tachyons.min.css",
      // "sane-tachyons":
      //   "https://raw.githubusercontent.com/hatchedlabs/sane-tachyons/master/sane-tachyons.min.css",
      // turret:
      //   "https://raw.githubusercontent.com/turretcss/turretcss/master/dist/turretcss.min.css",
      // solid: "https://www.buzzfeed.com/static-assets/solid/solid.2.11.1.min.css",
      // basscss:
      //   "https://cdnjs.cloudflare.com/ajax/libs/basscss/8.1.0/css/basscss.min.css"
    }).map(([name, url]) => checkUrl(name, url).then(res => [name, res]))
  );

  results.forEach(pair =>
    console.log(pair, (pair[1].count / pair[1].br).toFixed(2))
  );
})();
