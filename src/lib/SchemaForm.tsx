import { type PropType, defineComponent, provide } from 'vue'
import type { Schema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaKey } from './context'

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
    provide(
      /* 注入名 */ SchemaKey,
      /* 值 */ {
        SchemaItem
      }
    )

    const handleChange = (v: any) => {
      props.onChange(v)
    }
    
    return (props: any) => {
      const { schema, value } = props
      return (
        <SchemaItem rootSchema={schema} schema={schema} value={value} onChange={handleChange} />
      )
    }
  }
})
