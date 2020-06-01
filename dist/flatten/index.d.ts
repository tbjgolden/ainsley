import { Ainsley, AinsleyChild } from '../types';
export declare const flatten: (configWithPlugins: Ainsley, getConfig?: (ref: string) => Promise<AinsleyChild>) => Promise<Ainsley>;
export declare const defaultGetConfig: (ref: string) => Promise<AinsleyChild>;
export declare const getFlatConfig: (ref: string, getConfig: (config: string) => Promise<AinsleyChild>) => Promise<AinsleyChild>;
