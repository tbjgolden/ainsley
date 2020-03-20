import preval from "preval.macro";
import x from "ainsley";

const ainsley = preval`module.exports = require("../scripts/ainsley")`;

console.log(ainsley, x);
