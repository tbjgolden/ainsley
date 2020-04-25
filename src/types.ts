export interface AinsleyAbbreviationMapObject {
  [propName: string]: string | number;
}

export type AinsleyRule = [string, Array<[string, string | number]>];
export type AinsleyPropertyOrPlaceholder = [
  string,
  AinsleyAbbreviationMapObject
];

export type AinsleyLeaf = AinsleyRule | AinsleyPropertyOrPlaceholder | string;
export type AinsleyChild = Ainsley | AinsleyLeaf;
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

export type AinsleyAST = Array<string | AinsleyRule | [string, AinsleyAST]>;

export interface AinsleyGenerateOptions {
  addVariationToSelector: (
    selector: string,
    variationAbbreviation: string
  ) => string;
  addPropertyToSelector: (
    selector: string,
    propertyAbbreviation: string
  ) => string;
  addValueToSelector: (selector: string, valueAbbreviation: string) => string;
  abbreviateProperty: (property: string) => [string, string];
}
