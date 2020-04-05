type Primitive = string | number;

export interface AinsleyAbbreviationMapObject {
  [propName: string]: Primitive;
}
export type AinsleyAbbreviationMapArray = Primitive[];
export type AinsleyAbbreviationMap =
  | AinsleyAbbreviationMapArray
  | AinsleyAbbreviationMapObject;

export type AinsleyRule = [string, Array<[string, Primitive]>];
export type AinsleyPropertyOrPlaceholder = [string, AinsleyAbbreviationMap];

export type AinsleyChild =
  | Ainsley
  | AinsleyRule
  | AinsleyPropertyOrPlaceholder
  | string;
export type AinsleyVariation = Array<[string, string]>;

type AinsleyVariations = AinsleyVariation[];
type AinsleyChildren = AinsleyChild[];
interface AinsleyVariableMap {
  [propName: string]: AinsleyAbbreviationMap;
}

export interface Ainsley {
  variables?: AinsleyVariableMap;
  variations?: AinsleyVariations;
  children?: AinsleyChildren;
}
