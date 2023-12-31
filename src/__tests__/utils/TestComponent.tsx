import { defineComponent, type PropType } from 'vue'
import SchemaForm, { ThemeProvider, type Schema } from '../../lib'
import themeDefault from '../../lib/theme-default'

export const ThemeDefaultProvider = defineComponent({
  setup(p, { slots }) {
    return () => (
      <ThemeProvider theme={themeDefault as any}>{slots.default && slots.default()}</ThemeProvider>
    )
  }
})

export default defineComponent({
  name: 'TestComponent',
  props: {
    schema: {
      type: Object as PropType<Schema>,
      required: true
    },
    value: {
      required: true
    },
    onChange: {
      type: Function as PropType<(v: any) => void>,
      required: true
    }
  },
  setup(props) {
    return () => {
      return (
        <ThemeDefaultProvider>
          <SchemaForm {...props} />
        </ThemeDefaultProvider>
      )
    }
  }
})
