import {
  defineComponent,
  provide,
  type PropType,
  computed,
  inject,
  type ComputedRef,
  type ExtractPropTypes,
  ref,
  shallowRef
} from 'vue'
import { WidgetNames, type Theme, FieldPropsDefine } from './types'
import { isObject } from './utils'
import { useSchemaContext } from './context'

const ThemeKey = Symbol('theme')

const ThemeProvider = defineComponent({
  name: 'ThemeProvider',
  props: {
    theme: Object as PropType<Theme>
  },
  setup(props, { slots }) {
    const { theme } = props
    const themeRef = computed(() => theme)
    provide(ThemeKey, themeRef)

    return () => slots.default && slots.default()
  }
})

export function getWidget(name: WidgetNames, props?: ExtractPropTypes<typeof FieldPropsDefine>) {
  const formContext = useSchemaContext()
  if (props) {
    const { uiSchema, schema } = props
    if (uiSchema?.widget && isObject(uiSchema.widget)) {
      return shallowRef(uiSchema.widget)
    }
    if (schema.format) {
      if (formContext.formatMapRef.value[schema.format]) {
        return ref(formContext.formatMapRef.value[schema.format])
      }
    }
  }
  const context = inject<ComputedRef<Theme>>(ThemeKey)

  if (!context) {
    throw new Error('must be use in Theme Provider')
  }
  return computed(() => context.value.widgets[name])
}

export default ThemeProvider
