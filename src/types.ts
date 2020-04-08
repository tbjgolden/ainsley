export interface AinsleyAbbreviationMapObject {
  [propName: string]: string | number;
}
export type AinsleyAbbreviationMapArray = Array<string | number | [string | number, string | number]>;

export type AinsleyRule = [string, Array<[string, string | number]>];
export type AinsleyPropertyOrPlaceholder = [string, AinsleyAbbreviationMapObject | AinsleyAbbreviationMapArray];

export type AinsleyChild =
  | Ainsley
  | AinsleyRule
  | AinsleyPropertyOrPlaceholder
  | string;
export type AinsleyVariation = Array<[string, string]>;

export type AinsleyVariations = AinsleyVariation[];
export type AinsleyChildren = AinsleyChild[];
export interface AinsleyVariableMap {
  [propName: string]: AinsleyAbbreviationMapObject;
}

export interface Ainsley {
  variables?: AinsleyVariableMap;
  variations?: AinsleyVariations;
  children?: AinsleyChildren;
}

interface Meta { [propName: string]: any; }
export interface AinsleyMeta extends Ainsley {
  _: Meta
}
