const chalk = require("chalk");
const coverageSummary = require("../coverage/coverage-summary.json");

const getPart = (obj, part) => {
  let pc = obj[part].pct.toFixed(2);
  pc = pc === "100.00" ? chalk.green.bold(pc) : chalk.red.bold(pc);
  return `  ${chalk.gray.bold(part)} ${pc}`;
};

const print = (name, obj) => {
  console.log(
    name === "total" ? chalk.white.bold("Coverage") : chalk.cyan.bold(name)
  );
  let str = "";
  str += getPart(obj, "lines");
  str += getPart(obj, "statements");
  str += getPart(obj, "functions");
  str += getPart(obj, "branches");
  console.log(str);
};

if (coverageSummary.total.lines.pct === 100) {
  Object.entries(coverageSummary).forEach(([k, v]) => {
    if (
      v.lines.pct + v.statements.pct + v.functions.pct + v.branches.pct !==
      400
    ) {
      print(k, v);
    }
  });
}
