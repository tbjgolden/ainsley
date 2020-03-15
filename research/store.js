const fs = require("fs-extra");
const { URL } = require("whatwg-url");
const { join } = require("path");
const prettier = require("prettier");

const stylesRegex = /<style([^>]*)>([\s\S]*?)(?:<\/style>)/gi;
const linksRegex = /<link (rel=["']stylesheet["'] href=["'][^"']*["']|href=["'][^"']*["'] rel=["']stylesheet["'])/gi;
const relStylesheetRegex = / rel=["']stylesheet["']/gi;

let stylesheetsAdded = 0;

const storeCss = css => {
  const cssToAdd = css.trim().length;

  if (cssToAdd) {
    fs.appendFileSync(
      join(__dirname, "allStyles.css"),
      (stylesheetsAdded++ ? "\n" : "") +
        prettier.format(css, { parser: "css", printWidth: 9999 })
    );
  }
};

const storeCssFromHtml = (html, url) => {
  const css = html
    .match(stylesRegex)
    .map(styleTag =>
      styleTag.substring(styleTag.indexOf(">") + 1, styleTag.length - 8).trim()
    )
    .join("");

  const links =
    html
      .match(linksRegex)
      .map(html => html.replace(relStylesheetRegex, ""))
      .map(html => html.substring(12, html.length - 1))
      .map(path => new URL(path, url).toString())
      .join("\n") + "\n";

  storeCss(css);
  fs.appendFileSync(join(__dirname, "stylesheetUrls.txt"), links);
};

module.exports = {
  storeCss,
  storeCssFromHtml
};
