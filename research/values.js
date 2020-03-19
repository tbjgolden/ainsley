const fs = require("fs");
const path = require("path");

const { ainsleyToCSS } = require("../dist/compiler");
const { base } = require("../dist/tools");
const csstree = require("css-tree");

const equivCSS = ainsleyToCSS(base);

const valsToExclude = /^[a-z-]+$/;

const values = async () => {
  const set = new Set();
  csstree.walk(csstree.parse(equivCSS), {
    visit: "Value",
    enter: node => {
      const vals = csstree.generate(node).split(" ");
      vals.forEach(val => {
        if (!valsToExclude.test(val)) set.add(val);
      });
    }
  });
  return set;
};

if (require.main === module) {
  values().then(console.log);
}

module.exports = values;
