import { defineComponent } from 'vue'
import { FieldPropsDefine, WidgetNames, type CommonWidgetDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      Number.isNaN(value) ? props.onChange(undefined) : props.onChange(Number(e.target.value))
    }

    const NumberWidgetRef = getWidget(WidgetNames.NumberWidget)

    return () => {
      const { value, schema } = props
      const NumberWidget = NumberWidgetRef.value as CommonWidgetDefine

      return <NumberWidget {...props} />
    }
  }
})
