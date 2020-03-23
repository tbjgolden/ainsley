- [x] focus/hover/breakpoints
- [x] determine cost of str => [str] convenience
- [x] determine if a recurse fn can be changed to work for both recursions
- [x] es5 version
- [x] remove spreads and destructuring from compiler
- [x] jest tests
- [x] make props more flexible
- [x] reset in ainsley
- [x] lint script which checks the types

Before the end of the day

- [x] how do we resolve `a` meaning `all` for props :/
- [x] better errors on lint script
- [x] formalise/document the api
- [x] repl
- [x] do we need to remove prop abbrev clashes if vals don't clash
- [ ] mnemonics
- [ ] check if vertical and horizontal work or not
- [ ] ensure all rules in

mad ideas zone

- generalize a few things to make it work for non-ainsley style classes
- range abbreviation strategy
- how do we resolve `a` meaning `all` for props :/
- css to ainsley
- postcss integration for autoprefixer et al?
- plugins
- alphabetical sort mods abbrevs

## V2 Types

```none
X : Shape<{
  variations: Arr<Arr<(Str,Str)>>,
  children: X'
}> (or) X'

X' : Arr<
  X
  (or)
  Def
  (or)
  Prop (can be extended like in sass?)
  (or)
  variable (like a css placeholder?)
  (or)
  css (i.e. reset)
>

Def : Arr<(Str, Arr<(Str, Str)>)>
Raw : Def

Prop : (Str, AbbrevMap)
Var : (Str, AbbrevMap)

AbbrevMap : Object<StrNum, StrNum> (or) Array<StrNum>

StrNum : Str (or) Num

----

TODO

NonEmpty
Char for modifiers
constants in strings
```
