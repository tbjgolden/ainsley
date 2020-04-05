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

```
variables
  overrides
  "x": [...]
  explicit override
  "!x": [...] // errors when flattened if not present higher up
  defaults
  "?x": [...]
  appends
  "+x": [...] // errors when flattened if not present higher up
```
