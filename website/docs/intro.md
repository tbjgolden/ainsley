---
id: intro
title: Introduction
---

### Motivation

For the longest time, CSS has been written to be compiled before sending to the client. There are many reasons why people have ended up with this approach. Even in modern CSS-in-JS libraries, they will often compile them to static styles at build time.

This has become a bottleneck.

CSS is certainly an effective way to define a stylesheet, but it has a very inefficient syntax.

```css
.bg-black {
  background-color: black;
}
.bg-dark-gray {
  background-color: #333;
}
/* ... */
.bg-white {
  background-color: white;
}
```

Many web developers know this, so they use CSS preprocessors like SASS and PostCSS to make writing it easier.

Instead, this in SASS might look like this:

```scss
$colors: (
  "black": "black",
  "dark-gray": "#333",
  // ...
  "white": "white",
)

@each $name, $color in $colors {
  .bg-#{$name} {
    background-color: $color;
  }
}
```

Not only does this mean that variables are defined in one place, but it means that the rule only needs to be defined once.

In fact, often even though SASS source code, even though variable names are often longer than the values they contain, are orders of magnitude smaller than the CSS they produce.

### And so it was born

`ainsley` enables you define a stylesheet as a tiny JavaScript object, which gets
expanded into CSS on the client. It is designed to represent a stylesheet in as few bytes as possible and is optimized for compiling to CSS.

It can emulate CSS preprocessor's best features like variables, nesting and interpolation, and generally aims to make writing CSS as [D.R.Y.](https://en.wikipedia.org/wiki/Don%27t_repeat_yourself) as possible.

The potential rewards for this are massive:

* It can compress a typical utility class stylesheet by <span style={{ backgroundColor: "var(--ifm-color-primary-darkest)", borderRadius: 2, color: "#fff", padding: "0.2rem" }}>10 times</span>
* It allows you to change the stylesheet with runtime JS values easily at no extra size (themes in particular become incredibly simple)
* Best practices encourage consistency in class names, and use of utility classes (made popular by [Tachyons](https://tachyons.io/) and then [Tailwind](https://tailwindcss.com/))
