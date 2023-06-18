import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'NumberField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      const value = e.target.value
      Number.isNaN(value) ? props.onChange(undefined) : props.onChange(Number(e.target.value))
    }

    return () => {
      const { value, schema } = props
      return <input type="number" onInput={handleChange} value={value} />
    }
  }
})
