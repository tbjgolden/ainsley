---
id: faq
title: FAQs
---

### Hasn't this already been done?

The most popular implementation of something like this is [Less.js](http://lesscss.org/usage/#using-less-in-the-browser), which includes a client-side implementation of their Less to CSS compiler; which offers a similar feature set, except at 40kB (the ainsley compiler is 1kB).

Less.js is bigger than its output CSS in typical use, making it an inefficient option if speed or bytes are your objective.

### How to avoid Flash of Unstyled Content? (FOUC)

When using this library, some users will get a Flash of Unstyled Content.

This library doesn't prescribe a specific pattern, but a common method is to add `style="visibility: hidden;"` to your body tag, and then remove it after generating and embedding your CSS:

```js
Ainsley.embed(Ainsley.generate({ /* ... */ }))
document.body.style.visibility = ''
```

:::note

The Webkit team wrote an interesting blog post on why it's hard for browsers to determine when to show the page's content: https://webkit.org/blog/66/the-fouc-problem/

Browsers' algorithms for this don't factor in JavaScript; so we need to tell it when to show it.

:::

### How is the compiler so small?

Wow, I'm glad you asked....

A bunch of factors combine:

* JavaScript minifies well
* It doesn't check your input at runtime (build time steps, do this instead)
* It doesn't try to fully "solve" CSS by checking property names and values
* It uses some newer, shorter, ES6+ syntax
* The variables and options were named using words from the brotli dictionary

### How do I get this working with Autoprefixer/PostCSS?

Unfortunately, you can't... _yet_.

Watch this space.
