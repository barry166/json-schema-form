import { describe, it, expect, beforeAll, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SchemaForm, { ArrayField, NumberField, SelectionWidget, StringField } from '../lib'
import exp from 'constants'

describe('ArrayField', () => {
  it('should render multi type', () => {
    let value: any[] = []
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: [
            { type: 'string' },
            { type: 'number' },
          ]
        },
        value,
        onChange: (v: any) => value = v,
      }
    })
    // 查找渲染结果是否包含NumberField组件
    const arr = wrapper.findComponent(ArrayField)
    const stringField = arr.findComponent(StringField)
    const numberField = arr.findComponent(NumberField)
    expect(stringField.exists()).toBeTruthy()
    expect(numberField.exists()).toBeTruthy()
  })

  it('should render single type', () => {
    let value: any[] = ['1', '2']
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string' },
        },
        value,
        onChange: (v: any) => value = v,
      }
    })
    const arr = wrapper.findComponent(ArrayField)
    const strs = arr.findAllComponents(StringField)
    expect(strs.length).toBe(2)
    expect(strs[0].props('value')).toBe('1')
  })

  it('should render multi-select type', () => {
    let value: any[] = []
    const wrapper = mount(SchemaForm, {
      props: {
        schema: {
          type: 'array',
          items: { type: 'string', enum: ['foo', 'bar', 'baz'] },
        },
        value,
        onChange: (v: any) => value = v,
      }
    })

    const arr = wrapper.findComponent(ArrayField)
    const selection = arr.findComponent(SelectionWidget)
    expect(selection.exists()).toBeTruthy()
    
  })
})
