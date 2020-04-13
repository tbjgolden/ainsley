```none
you write                               | eslint plugin?
[ config with plugins ]                 |
which is flattened into                 | flatten()
[ flat config (no plugins) ]            |
which is minified into a                | minify()
[ minified config ]                     |
which is sent to the client             | webpack plugin?
and then turned into CSS                | compile()
[ compiles the config into CSS ]        |
so you can inject it into a <style> tag | embed()
```

maybe a validate() function which at least checks for valid types

```
variables
  overrides
  "x": [...]
  defaults
  "?x": [...]
  appends
  "+x": [...]
```

be able to import css files

can you move every variable to it's highest unique scope?

bfs for variables

===

documentation.js
JSDoc
Runtime typechecking
