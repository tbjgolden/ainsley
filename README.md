# 👨🏾‍🍳 Ainsley

Ainsley is a better(maintainable, self documenting more efficient) way to define your stylesheet.

```js
// Define your stylesheet using JavaScript, or JSON
const breakpoints = Object.entries({
  s: 384,
  m: 768,
  l: 1024
}).map(([prefix, pixels]) => [prefix, `@media(min-width:\${pixels}px)`]);

// This tiny object contains all the instructions to assemble a stylesheet
const ainsley = {
  // `variations` allow you to add modifiers to children
  // e.g. breakpoints, or hover styles
  variations: [breakpoints],
  // `variables` allow you to reuse groups of properties and values
  variables: {
    color: { b: "black", w: "white" }
  },
  children: [
    // You may use `"$..."` syntax to import configs and remote urls;
    // it is able to import CSS and JSON.
    "$https://cdnjs.cloudflare.com/ajax/libs/meyer-reset/2.0/reset.css",
    // You may also use it to import configs installed by npm (or yarn);
    // this one would import the npm package "ainsley-config-example".
    "$example",
    // You may nest ainsley objects;
    // this allows you to scope variables, variations and configs.
    {
      variables: {
        // `variables` prefixed with a `+` will merge with any
        // definition higher up (otherwise, it behaves like normal).
        "+color": {
          lg: "#eee",
          g: "#888",
          dg: "#222"
        },
        // `variables` prefixed with a `?` will only be defined
        // if they have not been already been defined higher up.
        "?length": {
          0: 0,
          1: "1px",
          2: "2px"
        }
      },
      children: [
        // This is a "utility rule" - it looks like a typical CSS rule.
        // It uses a variable, which will output every possible permutation!
        ["bg", [["background-color", "{color}"]]],
        // This string is the prefix of the "utility class".
        // ↙ Abbreviations of `variable` values will be appended to it.
        [
          "b",
          [
            // "Utility rules" support multiple declarations.
            // "Utility declarations" may use any number of variables.
            ["border", "{length} {color}"],
            ["border-style", "solid"]
          ]
        ]
      ]
    }
  ]
};

// flatten replaces external dependencies with their contents
// (i.e. CSS/JSON urls, configs)
// 💞 ➡ ❤️
const configWithoutDependencies = flatten(ainsley);
// minify generates a config which is designed to use less bytes
// after it has been compressed; this is how it should be sent to the client
// ❤️ ➡ 💌
const minifiedConfig = minify(configWithoutDependencies);

// (ON THE CLIENT) to generate CSS, and embed it into the page
// 💌 ➡ ❤️🧡💛💚💙💜
embed(generate(minifiedConfig));
```

maybe a validate() function which at least checks for valid types
and duplicate variables on same object :/

source

===

- [ ] all except compiler
- [ ] documentation.js, JSDoc, Runtime typechecking
- [ ] compiler inversion of control
- [ ] compiler

===

### Use cases

- Write it, translate it using repl, use it as css - easy
- Webpack config - validate + flatten + minify + embed
- CRA/SSG (locked Webpack config) - use babel macros
- Babel macros - // @preval file comment
- Using a framework without babel macros - use embed directly
- CSS and wants to migrate - embed as string, and gradually migrate
- SASS and wants to migrate - compile to CSS and gradually migrate
- Explain why no webpack plugin / autoprefixer
