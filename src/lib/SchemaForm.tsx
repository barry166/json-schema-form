import { type PropType, defineComponent } from 'vue'
import type Schema from './types'
import SchemaItem from './SchemaItem'

export default defineComponent({
  name: 'SchemaForm',
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
    const handleChange = (v: any) => {
      props.onChange(v)
    }
    return (props: any) => {
      const { schema, value } = props
      console.log('schema form', schema)
      return <SchemaItem schema={schema} value={value} onChange={handleChange} />
    }
  }
})
