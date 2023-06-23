import { defineComponent, onDeactivated, type PropType } from 'vue'
import { FieldPropsDefine, WidgetNames, type Schema } from '../types'
import { useSchemaContext } from '../context'
import { isObject } from '../utils'
import classes from './ArrayField.module.scss'
import { getWidget } from '../theme'

const ArrayItemWrapper = defineComponent({
  name: 'ArrayItemWrapper',
  props: {
    index: {
      type: Number,
      required: true
    },
    onAdd: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDelete: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onUp: {
      type: Function as PropType<(index: number) => void>,
      required: true
    },
    onDown: {
      type: Function as PropType<(index: number) => void>,
      required: true
    }
  },
  setup(props, { slots }) {
    const { index, onAdd, onDelete, onUp, onDown } = props
    const handleAdd = () => {
      onAdd(index)
    }
    const handleDelete = () => {
      onDelete(index)
    }
    const handleUp = () => {
      onUp(index)
    }
    const handleDown = () => {
      onDown(index)
    }
    return () => {
      return (
        <div class={classes['arrayItem']}>
          <div class={classes['actions']}>
            <button class={classes['action']} onClick={handleAdd}>
              新增
            </button>
            <button class={classes['action']} onClick={handleDelete}>
              删除
            </button>
            <button class={classes['action']} onClick={handleUp}>
              上移
            </button>
            <button class={classes['action']} onClick={handleDown}>
              下移
            </button>
          </div>
          <div class={classes['content']}>{slots.default && slots.default()}</div>
        </div>
      )
    }
  }
})

export default defineComponent({
  name: 'ArrayField',
  props: FieldPropsDefine,
  setup(props) {
    const handleArrayItemChange = (v: any, index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr[index] = v
      console.log('arr', arr)
      props.onChange(arr)
    }

    const handleAdd = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index + 1, 0, undefined)
      props.onChange(arr)
    }

    const handleDelete = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      arr.splice(index, 1)
      props.onChange(arr)
    }

    const handleUp = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === 0) return

      const item = arr.splice(index, 1)[0]
      arr.splice(index - 1, 0, item)
      props.onChange(arr)
    }

    const handleDown = (index: number) => {
      const { value } = props
      const arr = Array.isArray(value) ? value : []
      if (index === arr.length - 1) return

      const item = arr.splice(index, 1)[0]
      arr.splice(index + 1, 0, item)
      props.onChange(arr)
    }

    const SelectionWidgetRef = getWidget(WidgetNames.SelectionWidget)

    return () => {
      const { value = [], schema, rootSchema } = props

      const context = useSchemaContext()
      const { SchemaItem, theme } = context
      const SelectionWidget = SelectionWidgetRef.value

      const isMultiType = Array.isArray(schema.items)
      const isSelect = isObject(schema.items) && (schema.items as any).enum

      if (isMultiType) {
        const items: Schema[] = schema.items as any
        const arr = Array.isArray(value) ? value : []
        return items!.map((s: Schema, index: number) => {
          return (
            <SchemaItem
              key={index}
              rootSchema={rootSchema}
              schema={s}
              value={arr[index]}
              onChange={(v) => handleArrayItemChange(v, index)}
              errorSchema={props.errorSchema[index] || {}}
            />
          )
        })
      } else if (!isSelect) {
        const items = Array.isArray(value) ? value : []

        return items.map((v: any, index: number) => {
          return (
            <ArrayItemWrapper
              index={index}
              onAdd={handleAdd}
              onDelete={handleDelete}
              onUp={handleUp}
              onDown={handleDown}
            >
              <SchemaItem
                key={index}
                rootSchema={rootSchema}
                schema={schema.items as Schema}
                value={v}
                onChange={(v) => handleArrayItemChange(v, index)}
                errorSchema={props.errorSchema[index] || {}}
              />
            </ArrayItemWrapper>
          )
        })
      } else {
        const enumValue = (schema.items as any)!.enum
        const options = enumValue.map((i: any) => ({ key: i, value: i }))

        return (
          <SelectionWidget
            value={props.value}
            onChange={props.onChange}
            options={options}
            errors={props.errorSchema.__errors}
            schema={schema}
          />
        )
      }
    }
  }
})
