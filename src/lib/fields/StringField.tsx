import { defineComponent } from 'vue'
import { FieldPropsDefine } from '../types'

export default defineComponent({
  name: 'StringField',
  props: FieldPropsDefine,
  setup(props) {
    const handleChange = (e: any) => {
      console.log('StringField handleChange', e.target.value)
      props.onChange(e.target.value)
    }

    return () => {
      const { value, schema } = props
      return <input type='text' onInput={handleChange} value={value} />
    }
  }
})
