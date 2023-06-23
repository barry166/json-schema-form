import { defineComponent } from 'vue'
import { CommonWidgetPropsDefine, type CommonWidgetDefine } from '..'
import styles from './FormItem.module.scss'

const FormItem = defineComponent({
  name: 'FormItem',
  props: CommonWidgetPropsDefine,
  setup(props, { slots }) {
    return () => {
      const { value, errors, schema } = props
      return (
        <div class={styles['form-item-container']}>
          <label class={styles.label}>{schema.title}</label>
          {slots.default && slots.default()}
          <ul class={styles['errorText']}>
            {errors?.map((err) => (
              <li>{err}</li>
            ))}
          </ul>
        </div>
      )
    }
  }
})

export default FormItem

export function withFormItem(Comp: any) {
  return defineComponent({
    name: `Wrapped${Comp.name}`,
    props: CommonWidgetPropsDefine,
    setup(props, { attrs }) {
      return () => {
        return (
          <FormItem {...props}>
            <Comp {...props} {...attrs} />
          </FormItem>
        )
      }
    }
  })
}
