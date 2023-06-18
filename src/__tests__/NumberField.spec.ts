import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import SchemaForm, { NumberField } from '../lib'


describe('NumberField', () => {
  it('should render correct number field', () => {
    let value = ''
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'number',
        },
        value,
        onChange: (v: any) => value = v,
      }
    })
    // 查找渲染结果是否包含NumberField组件
    expect(wrapper.findComponent(NumberField).exists()).toBeTruthy()
    const numberInput = wrapper.find('input')
    numberInput.element.value = '123'
    numberInput.trigger('input')
    expect(value).toBe(123)
  })
})
