import { Ainsley, AinsleyGenerateOptions } from '../types';
export declare const ITERATOR_REGEX = "\\{[a-zA-Z0-9_-]+\\}";
export declare const DEFAULT_OPTIONS: AinsleyGenerateOptions;
export declare const generate: (ainsley: Ainsley, options?: Partial<AinsleyGenerateOptions>) => string;
