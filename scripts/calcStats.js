const fs = require("fs");
const path = require("path");

const { ainsleyToCss } = require("../dist/compiler");
const { base } = require("../dist/tools");
const { gzip } = require("node-gzip");
const brotli = require("brotli");
const csstree = require("css-tree");

const equivCSS = ainsleyToCss(base);

const equivBuffer = Buffer.from(equivCSS);
const baseConfigBuffer = Buffer.from(JSON.stringify(base));
const compilerBuffer = fs.readFileSync(
  path.join(__dirname, "../dist/compiler.lite.js")
);

const calcStats = async () => {
  const [baseConfigGzip, compilerGzip, equivGzip] = await Promise.all([
    gzip(baseConfigBuffer),
    gzip(compilerBuffer),
    gzip(equivBuffer)
  ]);

  let ruleCount = 0;
  csstree.walk(csstree.parse(equivCSS), {
    visit: "Rule",
    enter: node => {
      ruleCount++;
    }
  });

  return {
    ruleCount,
    baseConfig: {
      bytes: {
        min: baseConfigBuffer.byteLength,
        gz: baseConfigGzip.byteLength,
        br1: brotli.compress(baseConfigBuffer, { quality: 1, mode: 1 })
          .byteLength,
        br11: brotli.compress(baseConfigBuffer, { quality: 11, mode: 1 })
          .byteLength
      }
    },
    compiler: {
      bytes: {
        min: compilerBuffer.byteLength,
        gz: compilerGzip.byteLength,
        br1: brotli.compress(compilerBuffer, { quality: 1, mode: 1 })
          .byteLength,
        br11: brotli.compress(compilerBuffer, { quality: 11, mode: 1 })
          .byteLength
      }
    },
    equiv: {
      bytes: {
        min: equivBuffer.byteLength,
        gz: equivGzip.byteLength,
        br1: brotli.compress(equivBuffer, { quality: 1, mode: 1 }).byteLength,
        br11: brotli.compress(equivBuffer, { quality: 11, mode: 1 }).byteLength
      }
    }
  };
};

if (require.main === module) {
  calcStats().then(console.log);
}

module.exports = calcStats;
