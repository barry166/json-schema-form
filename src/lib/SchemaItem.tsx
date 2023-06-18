import { type PropType, defineComponent } from 'vue'
import { FieldPropsDefine, SchemaTypes } from './types'
import StringField from './fields/StringField'
import NumberField from './fields/NumberField'
import ObjectField from './fields/ObjectField'
import ArrayField from './fields/ArrayField'

export default defineComponent({
  name: 'SchemaItem',
  props: FieldPropsDefine,
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
        case SchemaTypes.OBJECT:
          Component = ObjectField
          break
        case SchemaTypes.ARRAY:
          Component = ArrayField
          break
        default:
          console.warn(`${schema?.type} is not supported`)
      }

      return <Component {...props} />
    }
  }
})
