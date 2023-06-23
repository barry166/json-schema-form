import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'
import { useSchemaContext } from '../context'
import { isObject } from '../utils'

export default defineComponent({
  name: 'ObjectField',
  props: FieldPropsDefine,
  setup(props) {
    const handleFieldChange = (key: string, v: any) => {
      const changeValue: any = isObject(props.value) ? props.value : {}
      console.log('changeValue', changeValue, key, v)
      if (v === undefined) {
        delete changeValue[key]
      } else {
        changeValue[key] = v
      }
      props.onChange(changeValue)
    }

    return () => {
      // 属性需要写在setup里面，因为在setup回调会每次更新调用
      const { schema, rootSchema, value, errorSchema } = props
      // console.log('object field value', value)
      const context = useSchemaContext()
      const { SchemaItem } = context

      const properties = schema.properties || {}
      const currentValue: any = isObject(value) ? value : {}

      return Object.keys(properties).map((k: string, index: number) => {
        return (
          <SchemaItem
            key={index}
            schema={properties[k]}
            rootSchema={rootSchema}
            value={currentValue[k]}
            onChange={(v) => handleFieldChange(k, v)}
            errorSchema={errorSchema[k] || {}}
          />
        )
      })
    }
  }
})
