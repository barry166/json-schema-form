export default {
  name: 'current',
  schema: {
    type: 'object',
    properties: {
      pass1: {
        type: 'string',
        minLength: 10,
        title: 'password',
      },
      pass2: {
        type: 'string',
        minLength: 10,
        title: 're-try password',
      },
      staticArray: {
        type: 'array',
        items: [
          { type: 'string', title: 'string' },
          { type: 'number', title: 'number' },
        ],
        title: 'staticArray',
      },
      singleTypeArray: {
        type: 'array',
        title: 'singleTypeArray',
        items: {
          type: 'object',
          properties: {
            name: { type: 'string', title: 'name' },
            age: { type: 'number', title: 'age' },
          },
        },
      },
      multiSelectArray: {
        type: "array",
        items: {
          type: "string",
          enum: [
            "foo",
            "bar",
            "foobar"
          ]
        },
        title: "multiSelectArray"
      }
    },
  },
  uiSchema: {},
  default: {
    pass1: '',
    pass2: '',
    staticArray: ['string', 111],
    singleTypeArray: [{
      name: 'barry',
      age: 20,
    }],
    multiSelectArray: [
      "foo",
      "bar"
    ]
  },
}
