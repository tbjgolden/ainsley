# Ainsley

Ainsley is a functional CSS framework and library with no compromises.

It is the spiritual successor of Tachyons and Tailwind.

It is comprised of multiple sub-libraries that together make it possible to:
  * have an unmatched developer experience
  * use your existing CSS knowledge
  * use the least possible bytes
  * have total flexibility
  * serialize your framework as tiny JSON

## How do I use

Instead of writing a stylesheet in CSS, you write it in a small JavaScript
object, which can be optionally serialized as JSON.

The browser receives this small object and compiles it into CSS.

This compresses it a lot. These numbers are in bytes and include gzip.

Input JS | Compiler | Output CSS
--------:|---------:|----------:
`1487`   | `568`    | `6406`

When added together the number of bytes sent over the wire is less than one
third `(1487+568)/6406 = 32%` of the original number.

## What's the magic sauce?

The reason this is so much more efficient than sending CSS because:

1. JS can perform combinatorial recursion
2. CSS frameworks often contain predictable patterns, as they are often created
   by preprocessors
3. CSS needs to send the whole attribute string every time it's used with a
   different value
4. CSS needs to send the whole value string every time it's used with a
   different attribute
5. The compiler is tiny, and minifies and compresses well, because JS minifies
   and compresses well

## Getting started

```bash
yarn add ainsley # or `npm install ainsley`
```

```scss
// custom ainsley variables
...

// if you want to use the ainsley specific reset (recommended!)
@import "~ainsley/reset";

// import ainsley
@import "~ainsley";

// your custom overrides
...
```

(MIT Licence)
