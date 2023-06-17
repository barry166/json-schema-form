export default {
  name: 'Test',
  schema: {
    type: 'object',
    properties: {
      staticArray: {
        type: 'array',
        items: [
          {
            type: 'string',
            minLength: 5,
          },
          {
            type: 'number',
          },
        ],
      },
      singleTypeArray: {
        type: 'array',
        items: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
            },
            age: {
              type: 'number',
            },
          },
        },
      },
      multiSelectArray: {
        type: 'array',
        items: {
          type: 'string',
          enum: ['123', '456', '789'],
        },
      },
    },
  },
  uiSchema: {},
  default: {
    test: 123,
    staticArray: ['1', 2],
    singleTypeArray: [{ name: 'jokcy', age: 12 }],
  },
}
