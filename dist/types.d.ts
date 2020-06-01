export interface AinsleyAbbreviationMapObject {
    [propName: string]: string | number;
}
export declare type AinsleyRule = [string, Array<[string, string | number]>];
export declare type AinsleyPropertyOrPlaceholder = [string, AinsleyAbbreviationMapObject];
export declare type AinsleyLeaf = AinsleyRule | AinsleyPropertyOrPlaceholder | string;
export declare type AinsleyChild = Ainsley | AinsleyLeaf;
export declare type AinsleyVariation = Array<[string, string]>;
export declare type AinsleyVariations = AinsleyVariation[];
export declare type AinsleyChildren = AinsleyChild[];
export interface AinsleyVariableMap {
    [propName: string]: AinsleyAbbreviationMapObject;
}
export interface Ainsley {
    variables?: AinsleyVariableMap;
    variations?: AinsleyVariations;
    children?: AinsleyChildren;
}
export interface AinsleyGenerateOptions {
    addVariationToSelector: (selector: string, variationAbbreviation: string) => string;
    addPropertyToSelector: (selector: string, propertyAbbreviation: string) => string;
    addValueToSelector: (selector: string, valueAbbreviation: string) => string;
    abbreviateProperty: (property: string) => [string, string];
}
