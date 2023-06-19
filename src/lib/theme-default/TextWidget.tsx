import { defineComponent, computed } from 'vue'
import { CommonWidgetPropsDefine } from '../types'

const TextWidget = defineComponent({
  name: 'TextWidget',
  props: CommonWidgetPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const v = e.target.value
      e.target.value = props.value
      props.onChange(v)
    }

    return () => {
      const { value } = props
      return <input type="text" value={value as any} onInput={handleChange} />
    }
  }
})

export default TextWidget
