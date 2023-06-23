import { computed, defineComponent } from 'vue'
import { FieldPropsDefine, WidgetNames, type CommonWidgetDefine } from '../types'
import { getWidget } from '../theme'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      console.log('StringField handleChange', e)
      // props.onChange(e.target.value)
      // 直接将值传给下层处理返回即可
      props.onChange(e)
    }

    const TextWidgetRef = computed(() => {
      return getWidget(WidgetNames.TextWidget).value
    })

    return () => {
      const { value, schema, errorSchema } = props
      const TextWidget = TextWidgetRef.value as CommonWidgetDefine

      // return <input type='text' onInput={handleChange} value={value} />
      return (
        <TextWidget
          value={value}
          schema={schema}
          onChange={handleChange}
          errors={errorSchema.__errors}
        />
      )
    }
  }
})
