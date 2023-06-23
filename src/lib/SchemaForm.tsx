import {
  type PropType,
  defineComponent,
  provide,
  type Ref,
  watch,
  ref,
  shallowRef,
  watchEffect,
  computed
} from 'vue'
import Ajv, { type Options } from 'ajv'
import type { CommonWidgetDefine, CustomFormat, CustomKeyword, Schema, UISchema } from './types'
import SchemaItem from './SchemaItem'
import { SchemaKey } from './context'
import { validateFormData, type ErrorSchema } from './validator'

interface ContextRef {
  doValidate: () => Promise<{
    errors: []
    valid: boolean
  }>
  getFormData: () => any
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
    },
    uiSchema: {
      type: Object as PropType<UISchema>
    },
    customFormats: {
      type: [Array, Object] as PropType<CustomFormat[] | CustomFormat>,
    },
    customKeywords: {
      type: [Array, Object] as PropType<CustomKeyword[] | CustomKeyword>,
    },
  },
  setup(props) {
    const errorSchemaRef: Ref<ErrorSchema> = shallowRef({}) // 错误信息

    const validateResolveRef = ref()
    const validateIndex = ref(0)

    const formatMapRef = computed(() => {
      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        return customFormats.reduce((result, format) => {
          result[format.name] = format.component
          return result
        }, {} as { [key: string]: CommonWidgetDefine })
      }
    })

    const transformSchemaRef = computed(() => {
      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]
        return (schema: Schema) => {
          let newSchema = schema
          customKeywords.forEach((keyword) => {
            if ((newSchema as any)[keyword.name]) {
              newSchema = keyword.transformSchema(schema)
            }
          })
          return newSchema
        }
      }
      return (s: Schema) => s
    })

    provide(
      /* 注入名 */ SchemaKey,
      /* 值 */ {
        SchemaItem,
        formatMapRef,
        transformSchemaRef,
      }
    )

    const validatorRef: Ref<Ajv> = shallowRef() as any // Ajv 实例

    watchEffect(() => {
      validatorRef.value = new Ajv({
        ...defaultAjvOptions,
        ...props.ajvOptions
      })

      if (props.customFormats) {
        const customFormats = Array.isArray(props.customFormats)
          ? props.customFormats
          : [props.customFormats]
        customFormats.forEach((format) => {
          // 添加自定义校验规则
          validatorRef.value.addFormat(format.name, format.definition)
        })
      }

      if (props.customKeywords) {
        const customKeywords = Array.isArray(props.customKeywords)
          ? props.customKeywords
          : [props.customKeywords]
        customKeywords.forEach((keyword) => {
          // 添加关键字规则
          validatorRef.value.addKeyword(keyword.definition)
        })
      }
    })

    watch(
      () => props.value,
      () => {
        // 值变化了并且已经在校验的时候触发重新校验逻辑
        // console.log('value change', validateResolveRef.value)
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
      // 因为是异步之后才到这里的，所以需要判断index是否是最新的
      if (index !== validateIndex.value) return
      console.log('end validate ----------->')

      errorSchemaRef.value = result.errorSchema
      // resolve数据返回给外部
      validateResolveRef.value(result)
      // resolve 之后清空避免重新触发校验逻辑
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
            },
            getFormData() {
              return props.value
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
      const { schema, value, uiSchema } = props
      return (
        <SchemaItem
          rootSchema={schema}
          schema={schema}
          uiSchema={uiSchema || {}}
          value={value}
          onChange={handleChange}
          errorSchema={errorSchemaRef.value || {}}
        />
      )
    }
  }
})
