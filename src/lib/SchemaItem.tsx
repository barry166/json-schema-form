import { type PropType, defineComponent } from 'vue'
import type Schema from './types'
import { SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'

export default defineComponent({
  name: 'SchemaItem',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props) {
    return () => {
      const { schema } = props
      let Component: any
      switch (schema?.type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        default:
          console.warn(`${schema?.type} is not supported`)
      }

      return <Component {...props} />
    }
  }
})
