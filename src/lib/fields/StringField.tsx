import { computed, defineComponent } from 'vue'
import { FieldPropsDefine, WidgetNames, type CommonWidgetDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      // props.onChange(e.target.value)
      // 直接将值传给下层处理返回即可
      props.onChange(e)
    }

    const TextWidgetRef = computed(() => {
      return getWidget(WidgetNames.TextWidget, props).value
    })

    const widgetOptionsRef = computed(() => {
      const { widget, properties, items, ...rest } = props.uiSchema
      return rest
    })

    return () => {
      const { value, schema, errorSchema } = props
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine

      return (
        <TextWidget
          value={value}
          schema={schema}
          onChange={handleChange}
          errors={errorSchema.__errors}
          options={widgetOptionsRef.value}
        />
      )
    }
  }
})
