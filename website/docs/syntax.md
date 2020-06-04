---
id: syntax
title: Syntax
sidebar_label: Syntax
---

An `ainsley` config is a JavaScript object, which may optionally contain three fields:
`variables`, `variations` and `children`.

## Basic Example

```js
{
  // variations allow modifiers to be added to every class inside automatically
  variations: [
    [
      ['s', '@media(min-width:384px)'],
      ['m', '@media(min-width:768px)'],
      ['l', '@media(min-width:1024px)']
    ]
  ],
  // variables are maps from class friendly abbreviations to values
  variables: {
    color: { b: 'black', w: 'white', lg: '#eee', g: '#888', dg: '#222' },
    length: { '0': 0, '1': '1px', '2': '2px' }
  },
  // children contains a configs css contents
  children: [
    // strings are pure CSS - they are passed straight through to the output
    'body{font:16px/1.25 sans-serif}',
    // this is an ainsley rule (all ainsley rules produce classes)
    ['c', [['color', '{color}']]],
    ['b', [
      ['border', '{length} {color}'],
      ['border-style', 'solid']
    ]],
    // a config's children can contain configs, which enables scoping variables,
    // extending variables and scoping variations
    {
      variables: {
        "+length": { '8': '8px', '16': '16px' }
      },
      children: [
        ['pa', [['padding', '{length}']]],
        ['mt', [['margin-top', '{length}']]]
      ]
    }
  ]
}
```

## Variables

Variables are a map of (CSS class selector friendly) abbreviations to values.
These values can be used (interpolated) in both the properties and the values of
ainsley rules.

```js
variables: {
  color: { b: 'black', w: 'white', lg: '#eee', g: '#888', dg: '#222' },
  length: { '0': 0, '1': '1px', '2': '2px' }
}
```

### Implied each

**Variables use a principle called _implied each_.**

Every time a variable is referenced, it will iterate through its map and
generate a class rule for each one. When used together, they will explore each
combination of variables and values.

With the above variables, this rule...

```js
["b", [
  ["border", "{length} solid {color}"]
]]
```

...would be expanded to...

```css
.b0B { border: 0 solid black }
    .b1B { border: 1px solid black }
        .b2B { border: 2px solid black }
.b0W { border: 0 solid white }
    .b1W { border: 1px solid white }
        .b2W { border: 2px solid white }
.b0LG { border: 0 solid #eee }
    .b1LG { border: 1px solid #eee }
        .b2LG { border: 2px solid #eee }
.b0G { border: 0 solid #888 }
    .b1G { border: 1px solid #888 }
        .b2G { border: 2px solid #888 }
.b0DG { border: 0 solid #222 }
    .b1DG { border: 1px solid #222 }
        .b2DG { border: 2px solid #222 }
```

### Variable modifiers

Variables can have modifiers, which cause them to behave differently when
configs with the same variable name are nested.

By default (i.e. without a modifier), the innermost variable will override the
outermost variable.

```js
variables: { length: { '0': 0, '1': '1px', '2': '2px' } },
children: [{
  variables: { length: { '4': "4px", '8': "8px" } },
  children: [ ['b', [['border-width', '{length}']]] ]
}]
```

becomes

```css
.b4 { border-width: 4px } .b8 { border-width: 8px }
```

#### The extend modifier

The extend modifier is a `+` prefix to the name of the variable. It only affects
the scope created by the nested config.

```js
variables: { length: { '0': 0, '1': '1px', '2': '2px' } },
children: [{
  variables: { "+length": { '4': "4px", '8': "8px" } },
  children: [ ['b', [['border-width', '{length}']]] ]
}]
```

becomes

```css
.b0 { border-width: 0 } .b1 { border-width: 1px } .b2 { border-width: 2px }
.b4 { border-width: 4px } .b8 { border-width: 8px }
```

#### The default modifier

They can also be given default values, which makes sense for people who want to
create shared configs. They are only defined if the variable hasn't already been
defined in a higher scope.

```js {7}
variables: {
  length: { '0': 0, '2': '2px', '4': '4px' }
},
children: [
  {
    variables: {
      "?length": { '0': 0, '1': '1px' }
    },
    children: [
      ['b', [['border-width', '{length}']]]
    ]
  }
]
```

produces

```css
.b0 { border-width: 0 } .b2 { border-width: 2px } .b4 { border-width: 4px }
```

## Variations

...

## Children

...

<!--

## Admonitions

:::note

This is a note

:::

:::tip

This is a tip

:::

:::important

This is important

:::

:::caution

This is a caution

:::

:::warning

This is a warning

:::

-->
