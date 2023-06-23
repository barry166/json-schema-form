import { defineComponent, provide, type PropType, computed, inject, type ComputedRef } from 'vue'
import { WidgetNames, type Theme } from './types'

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

export function getWidget(name: WidgetNames) {
  const context = inject<ComputedRef<Theme>>(ThemeKey)
  if (!context) {
    throw new Error('must be use in Theme Provider')
  }
  return computed(() => context.value.widgets[name])
}

export default ThemeProvider
