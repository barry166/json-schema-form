import PasswordWidget from '@/components/PasswordWidget'

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
      color: {
        type: 'string',
        format: 'color',
        title: 'Input Color',
      },
      testkeyword: {
        type: 'string',
        minLength: 10,
        test: 'true',
        title: 'keyword test',
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
            name: { type: 'string', title: 'name', minLength: 3 },
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
  uiSchema: {
    properties: {
      pass1: {
        widget: PasswordWidget,
      },
      pass2: {
        color: 'red',
      },
    },
  },
  async customValidate (data: any, errors: any) {
    return new Promise((resolve) => {
      setTimeout(() => {
        if (data.pass1 != data.pass2) {
          errors.pass2.addError('密码必须相同')
        }
        resolve(true)
      }, 2000)
    })
  },
  default: {
    pass1: '',
    pass2: '',
    color: '#861818',
    testkeyword: '',
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
