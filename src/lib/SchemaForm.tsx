import {
  type PropType,
  defineComponent,
  provide,
  type Ref,
  watch,
  ref,
  shallowRef,
  watchEffect
} from 'vue'
import Ajv, { type Options } from 'ajv'
import type { Schema, Theme } from './types'
import SchemaItem from './SchemaItem'
import { SchemaKey } from './context'
import { validateFormData, type ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: []
    valid: boolean
  }>
}

const defaultAjvOptions: Options = {
  allErrors: true
  // jsonPointers: true,
}

export default defineComponent({
  name: 'SchemaForm',
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
    },
    contextRef: {
      type: Object as PropType<Ref<ContextRef | undefined>>
    },
    ajvOptions: {
      type: Object as PropType<Options>
    },
    locale: {
      type: String as PropType<string>,
      default: 'zh'
    },
    customValidate: {
      type: Function as PropType<(data: any, errors: any) => void>
    }
  },
  setup(props) {
    provide(
      /* 注入名 */ SchemaKey,
      /* 值 */ {
        SchemaItem
      }
    )

    const validatorRef: Ref<Ajv> = shallowRef() as any // Ajv 实例
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({}) // 错误信息

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })
    })

    watch(
      () => props.value,
      () => {
        if (validateResolveRef.value) {
          doValidate()
        }
      },
      { deep: true }
    )

    async function doValidate() {
      console.log('start validate --------->')
      const index = (validateIndex.value += 1)
      const result = await validateFormData(
        validatorRef.value,
        props.value,
        props.schema,
        props.locale,
        props.customValidate
      )

      if (index !== validateIndex.value) return
      console.log('end validate ----------->')

      errorSchemaRef.value = result.errorSchema
      validateResolveRef.value(result)
      validateResolveRef.value = undefined
    }

    watch(
      () => props.contextRef,
      () => {
        if (props.contextRef) {
          props.contextRef.value = {
            doValidate() {
              return new Promise((resolve) => {
                validateResolveRef.value = resolve
                doValidate()
              })
            }
          }
        }
      },
      {
        immediate: true
      }
    )

    const handleChange = (v: any) => {
      props.onChange(v)
    }

    return (props: any) => {
      const { schema, value } = props
      return (
        <SchemaItem
          rootSchema={schema}
          schema={schema}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  }
})
