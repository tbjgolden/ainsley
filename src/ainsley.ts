type AinsleyModifierChar =
  | "a"
  | "b"
  | "c"
  | "d"
  | "e"
  | "f"
  | "g"
  | "h"
  | "i"
  | "j"
  | "k"
  | "l"
  | "m"
  | "n"
  | "o"
  | "p"
  | "q"
  | "r"
  | "s"
  | "t"
  | "u"
  | "v"
  | "w"
  | "x"
  | "y"
  | "z";

interface AinsleyAbbreviationMapObject {
  [propName: string]: string | number;
}
type AinsleyAbbreviationMapArray = Array<string | number>;
type AinsleyAbbreviationMap =
  | AinsleyAbbreviationMapArray
  | AinsleyAbbreviationMapObject;

type AinsleyRule = Array<[string, Array<[string, string]>]>;
type AinsleyPropertyOrPlaceholder = [string, AinsleyAbbreviationMap];

type AinsleyChild =
  | Ainsley
  | AinsleyRule
  | AinsleyPropertyOrPlaceholder
  | string;

interface Ainsley {
  variations: Array<Array<[AinsleyModifierChar, string]>>;
  children: Array<AinsleyChild>;
}
