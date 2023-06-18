import { defineComponent, ref, watch, type PropType } from 'vue'

const SelectionWidget = defineComponent({
  name: 'SelectionWidget',
  props: {
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any[]) => void>,
      required: true
    },
    options: {
      type: Array as PropType<{ key: string; value: string }[]>,
      required: true
    }
  },
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
      const { options } = props
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

export default SelectionWidget
