import Ajv, { ErrorObject } from 'ajv'

// TODO: formatError should give cleaner better errors

export const validate = (maybeAinsley: unknown): string[] => {
  const ajv = new Ajv({ allErrors: true })
  ajv.validate(schema, maybeAinsley)

  if (ajv.errors !== null && ajv.errors !== undefined) {
    // find lowest error and show that
    let lowestLength = Infinity
    let lowestErrors: string[] = []
    ajv.errors.forEach((error) => {
      const pathLength = error.schemaPath.split('/').length
      if (pathLength === lowestLength) {
        lowestErrors.push(formatError(error))
      } else if (pathLength < lowestLength) {
        lowestErrors = [formatError(error)]
        lowestLength = pathLength
      }
    })
    return lowestErrors
  } else {
    return []
  }
}

const formatError = (error: ErrorObject): string =>
  `Ainsley${error.dataPath} is invalid`

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
