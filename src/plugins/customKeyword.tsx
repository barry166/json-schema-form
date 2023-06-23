import { type CustomKeyword } from '../lib/types'

const keyword: CustomKeyword = {
  name: 'test',
  definition: {
    keyword: 'test',
    macro: () => {
      return {
        minLength: 11,
      }
    },
  },
  transformSchema(schema: any) {
    return {
      ...schema,
      minLength: 10,
    }
  },
}

export default keyword
