//@ts-nocheck
import {
  defineComponent,
  ref,
  onMounted,
  watch,
  onBeforeMount,
  shallowRef,
  type PropType,
} from 'vue'
import * as Monaco from 'monaco-editor'
import classes from './MonacoEditor.module.scss'

// implementation
export default defineComponent({
  name: 'MonacoEditor',
  props: {
    code: {
      type: String as PropType<string>,
      required: true,
    },
    onChange: {
      type: Function as PropType<
        (value: string, event: Monaco.editor.IModelContentChangedEvent) => void
      >,
      required: true,
    },
    title: {
      type: String as PropType<string>,
      required: true,
    },
  },
  setup(props) {
    // must be shallowRef, if not, editor.getValue() won't work
    const editorRef = shallowRef()
    const containerRef = ref()
    let _subscription: Monaco.IDisposable | undefined
    let __preventTriggerChangeEvent = false

    onMounted(() => {
      const editor = (editorRef.value = Monaco.editor.create(
        containerRef.value,
        {
          value: props.code,
          language: 'json',
          formatOnPaste: true,
          tabSize: 2,
          minimap: {
            enabled: false,
          },
        },
      ))

      _subscription = editor.onDidChangeModelContent((event) => {
        if (!__preventTriggerChangeEvent) {
          props.onChange(editor.getValue(), event)
        }
      })
    })

    onBeforeMount(() => {
      if (_subscription) {
        _subscription.dispose()
      }
    })

    watch(
      () => props.code,
      (v) => {
        const editor = editorRef.value
        const model = editor.getModel()
        if (v !== model.getValue()) {
          editor.pushUndoStop()
          __preventTriggerChangeEvent = true
          // pushEditOperations says it expects a cursorComputer, but doesn't seem to need one.
          model.pushEditOperations(
            [],
            [
              {
                range: model.getFullModelRange(),
                text: v,
              },
            ],
          )
          editor.pushUndoStop()
          __preventTriggerChangeEvent = false
        }
      },
    )


    return () => {

      return (
        <div class={classes.container}>
          <div class={classes.title}>
            <span>{props.title}</span>
          </div>
          <div class={classes.code} ref={containerRef}></div>
        </div>
      )
    }
  },
})
