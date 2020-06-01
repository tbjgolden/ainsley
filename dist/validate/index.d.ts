export declare const validate: (maybeAinsley: unknown) => string[];
export declare const schema: {
    $schema: string;
    definitions: {
        Primitive: {
            anyOf: {
                type: string;
            }[];
        };
    };
    properties: {
        children: {
            items: {
                anyOf: ({
                    items: ({
                        type: string;
                        items?: undefined;
                    } | {
                        items: {
                            items: ({
                                type: string;
                                $ref?: undefined;
                            } | {
                                $ref: string;
                                type?: undefined;
                            })[];
                            minItems: number;
                            maxItems: number;
                            type: string;
                        };
                        type: string;
                    })[];
                    minItems: number;
                    maxItems: number;
                    type: string;
                    $ref?: undefined;
                } | {
                    items: ({
                        type: string;
                        anyOf?: undefined;
                    } | {
                        anyOf: ({
                            type: string;
                            additionalProperties: {
                                $ref: string;
                            };
                            items?: undefined;
                        } | {
                            type: string;
                            items: {
                                anyOf: ({
                                    $ref: string;
                                    items?: undefined;
                                    minItems?: undefined;
                                    maxItems?: undefined;
                                    type?: undefined;
                                } | {
                                    items: {
                                        $ref: string;
                                    }[];
                                    minItems: number;
                                    maxItems: number;
                                    type: string;
                                    $ref?: undefined;
                                })[];
                            };
                            additionalProperties?: undefined;
                        })[];
                        type?: undefined;
                    })[];
                    minItems: number;
                    maxItems: number;
                    type: string;
                    $ref?: undefined;
                } | {
                    type: string;
                    items?: undefined;
                    minItems?: undefined;
                    maxItems?: undefined;
                    $ref?: undefined;
                } | {
                    $ref: string;
                    items?: undefined;
                    minItems?: undefined;
                    maxItems?: undefined;
                    type?: undefined;
                })[];
            };
            type: string;
        };
        variables: {
            type: string;
            additionalProperties: {
                type: string;
                additionalProperties: {
                    $ref: string;
                };
            };
        };
        variations: {
            items: {
                items: {
                    items: {
                        type: string;
                    }[];
                    minItems: number;
                    maxItems: number;
                    type: string;
                };
                type: string;
            };
            type: string;
        };
    };
    type: string;
};
