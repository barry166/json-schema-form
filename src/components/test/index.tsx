import { defineComponent, ref, reactive, watchEffect } from 'vue'

// 测试数据

// 导入组件库

// TODO: 在lib中export
type Schema = any
type UISchema = any

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}


// implementation
export default defineComponent({
  props: {
    name: {
      type: String,
      required: true,
    }
  },
  setup(props) {
    // tab switch

    const demo: {
      schema: Schema | null
      data: any
      uiSchema: UISchema | null
      schemaCode: string
      dataCode: string
      uiSchemaCode: string
      customValidate: ((d: any, e: any) => void) | undefined
    } = reactive({
      schema: null,
      data: {},
      uiSchema: {},
      schemaCode: '',
      dataCode: '',
      uiSchemaCode: '',
      customValidate: undefined,
    })


    // const methodRef: Ref<any> = ref()

    const handleChange = (v: any) => {
      // console.log('data', v, 'toJson(v)', toJson(v))
      demo.data = v
      demo.dataCode = toJson(v)
    }

    // closure 闭包 demo
    function handleCodeChange(
      field: 'schema' | 'data' | 'uiSchema',
      value: string,
    ) {
      try {
        const json = JSON.parse(value)
        demo[field] = json
        ;(demo as any)[`${field}Code`] = value
      } catch (err) {
        // some thing
      }
    }

    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    const contextRef = ref() // 进行验证用
    const nameRef = ref() // 获取 SchemaForm 引用

    const validateForm = () => {
      contextRef.value.doValidate().then((result: any) => {
        console.log(result, '............')
      })
    }

    return () => {


      return (
        <div>{props.name}</div>
      )
    }
  },
})
