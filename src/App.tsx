import { defineComponent, reactive, ref, watchEffect, type Ref } from 'vue'
import MonacoEditor from './components/MonacoEditor/MonacoEditor'
import classes from './App.module.scss'
import SchemaForm, { ThemeProvider } from './lib'
import themeDefault from './lib/theme-default'
import demos from './demos'

function toJson(data: any) {
  return JSON.stringify(data, null, 2)
}

export default defineComponent({
  setup() {
    const demo: {
      schema: any
      data: any
      uiSchema: any | null
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
      customValidate: undefined
    })
    const selectedRef: Ref<number> = ref(0)

    // 数据监听，确定 demo 的当前值
    watchEffect(() => {
      const index = selectedRef.value
      // demos is test data provide by lib user
      const d: any = demos[index]
      demo.schema = d.schema
      demo.data = d.default
      demo.uiSchema = d.uiSchema
      demo.schemaCode = toJson(d.schema)
      demo.dataCode = toJson(d.default)
      demo.uiSchemaCode = toJson(d.uiSchema)
      demo.customValidate = d.customValidate
    })

    const handleValueChange = (v: any) => {
      demo.data = v
      demo.dataCode = toJson(v)
    }

    const handleCodeChange = (field: 'schema' | 'data' | 'uiSchema', value: string) => {
      console.log('handleCodeChange', value)
      try {
        const json = JSON.parse(value)
        demo[field] = json(demo as any)[`${field}Code`] = value
      } catch (err) {
        // some thing
      }
    }
    const handleSchemaChange = (v: string) => handleCodeChange('schema', v)
    const handleDataChange = (v: string) => handleCodeChange('data', v)
    const handleUISchemaChange = (v: string) => handleCodeChange('uiSchema', v)

    return () => {
      return (
        <div class={classes['app-container']}>
          <div class={classes.code}>
            <MonacoEditor code={demo.schemaCode} onChange={handleSchemaChange} title="Schema" />
            <div class={classes.uiAndValue}>
              <MonacoEditor
                code={demo.uiSchemaCode}
                class={classes.codePanel}
                onChange={handleUISchemaChange}
                title="UISchema"
              />
              <MonacoEditor
                code={demo.dataCode}
                class={classes.codePanel}
                onChange={handleDataChange}
                title="Value"
              />
            </div>
          </div>
          <div class={classes.form}>
            <ThemeProvider theme={themeDefault as any}>
              <SchemaForm
                // theme={themeDefault as any}
                schema={demo.schema}
                value={demo.data}
                onChange={handleValueChange}
              />
            </ThemeProvider>
          </div>
        </div>
      )
    }
  }
})
