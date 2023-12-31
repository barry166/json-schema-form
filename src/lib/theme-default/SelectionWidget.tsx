import { defineComponent, ref, watch, type PropType } from 'vue'
import { SelectionWidgetPropsDefine } from '../types'
import { withFormItem } from './FormItem'

const SelectionWidget = withFormItem(
  defineComponent({
    name: 'SelectionWidget',
    props: SelectionWidgetPropsDefine,
    setup(props) {
      const currentValueRef = ref(props.value || [])

      watch(currentValueRef, (newv: any, oldv) => {
        if (newv !== oldv) props.onChange(newv)
      })

      watch(
        () => props.value,
        (v) => {
          //@ts-ignore
          if (v !== currentValueRef.value) currentValueRef.value = v
        }
      )

      return () => {
        const { options, errors } = props
        return (
          <select multiple={true} v-model={currentValueRef.value}>
            {options.map((opt) => {
              return <option value={opt.value}>{opt.key}</option>
            })}
          </select>
        )
      }
    }
  })
)
export default SelectionWidget
