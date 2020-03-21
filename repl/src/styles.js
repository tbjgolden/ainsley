import preval from "preval.macro";
import { ainsleyToCSS } from "ainsley";

const ainsley = preval`module.exports = require("../scripts/ainsley")`;

var styleEl = document.createElement("style");
styleEl.appendChild(document.createTextNode(ainsleyToCSS(ainsley)));
document.head.appendChild(styleEl);
document.body.style.display = "block";
