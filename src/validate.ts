import Ajv, { ErrorObject } from "ajv";

export const validate = (maybeAinsley: unknown): string[] => {
  const ajv = new Ajv({ allErrors: true });

  const _valid = ajv.validate(schema, maybeAinsley) as boolean;

  let errors: string[] = [];
  if (ajv.errors !== null && ajv.errors !== undefined) {
    errors = ajv.errors
      .reduceRight(
        (errors: ErrorObject[], error: ErrorObject): ErrorObject[] =>
          errors.length === 0 || error.dataPath !== errors[0].dataPath
            ? [error, ...errors]
            : errors,
        []
      )
      .map(
        (error) =>
          `Ainsley${error.dataPath}${
            error.message === undefined ? "" : ` ${error.message}`
          }`
      );
  }

  return errors;
};

// prettier-ignore
export const schema = {
  "$schema": "http://json-schema.org/draft-07/schema#",
  "definitions": {
    "Primitive": {
      "anyOf": [
        {
          "type": "string"
        },
        {
          "type": "number"
        }
      ]
    }
  },
  "properties": {
    "children": {
      "items": {
        "anyOf": [
          {
            "items": [
              {
                "type": "string"
              },
              {
                "items": {
                  "items": [
                    {
                      "type": "string"
                    },
                    {
                      "$ref": "#/definitions/Primitive"
                    }
                  ],
                  "minItems": 2,
                  "maxItems": 2,
                  "type": "array"
                },
                "type": "array"
              }
            ],
            "minItems": 2,
            "maxItems": 2,
            "type": "array"
          },
          {
            "items": [
              {
                "type": "string"
              },
              {
                "anyOf": [
                  {
                    "type": "object",
                    "additionalProperties": {
                      "$ref": "#/definitions/Primitive"
                    }
                  },
                  {
                    "type": "array",
                    "items": {
                      "anyOf": [
                        {
                          "$ref": "#/definitions/Primitive"
                        },
                        {
                          "items": [
                            {
                              "$ref": "#/definitions/Primitive"
                            },
                            {
                              "$ref": "#/definitions/Primitive"
                            }
                          ],
                          "minItems": 2,
                          "maxItems": 2,
                          "type": "array"
                        }
                      ]
                    }
                  }
                ]
              }
            ],
            "minItems": 2,
            "maxItems": 2,
            "type": "array"
          },
          {
            "type": "string"
          },
          {
            "$ref": "#"
          }
        ]
      },
      "type": "array"
    },
    "variables": {
      "type": "object",
      "additionalProperties": {
        "type": "object",
        "additionalProperties": {
          "$ref": "#/definitions/Primitive"
        }
      }
    },
    "variations": {
      "items": {
        "items": {
          "items": [
            {
              "type": "string"
            },
            {
              "type": "string"
            }
          ],
          "minItems": 2,
          "maxItems": 2,
          "type": "array"
        },
        "type": "array"
      },
      "type": "array"
    }
  },
  "type": "object"
};
