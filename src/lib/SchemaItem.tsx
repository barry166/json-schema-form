import { defineComponent, computed } from 'vue'
import { FieldPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'
import { useSchemaContext } from './context'
import { retrieveSchema } from './utils'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
  setup(props) {
    const formContext = useSchemaContext()

    const retrievedSchemaRef = computed(() => {
      const { schema, rootSchema, value } = props
      return formContext.transformSchemaRef.value(retrieveSchema(schema, rootSchema, value))
    })

    return () => {
      const { schema } = props
      const retrievedSchema = retrievedSchemaRef.value

      let Component: any
      switch (schema?.type) {
        case SchemaTypes.STRING:
          Component = StringField
          break
        case SchemaTypes.NUMBER:
          Component = NumberField
          break
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        case SchemaTypes.ARRAY:
          Component = ArrayField
          break
        default:
          console.warn(`${schema?.type} is not supported`)
      }

      return <Component {...props} schema={retrievedSchema} />
    }
  }
})
