import { describe, it, expect, beforeEach } from 'vitest'
import { mount } from '@vue/test-utils'
import SchemaForm, { NumberField, StringField } from '../lib'


describe('ObjectField', () => {
  let schema : any
  beforeEach(() => {
    schema = {
      type: 'object',
      properties: {
        name: {
          type: 'string'
        },
        age: {
          type: 'number'
        },
      }
    }
  })
  it('should render correct object field', () => {
    let value = {}
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => value = v,
      }
    })
    // 查找渲染结果是否包含NumberField 和 StringField组件
    expect(wrapper.findComponent(NumberField).exists()).toBeTruthy()
    expect(wrapper.findComponent(StringField).exists()).toBeTruthy()
  })

  it('should change value when sub fields trigger onChange', () => {
    let value: any = {}
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => value = v,
      }
    })
    // 查找渲染结果是否包含NumberField 和 StringField组件
    const stringField = wrapper.findComponent(StringField)
    const numberField = wrapper.findComponent(NumberField)
    stringField.props().onChange('1')
    numberField.props().onChange(1)
    expect(value.name).toEqual('1')
    expect(value.age).toEqual(1)
  })

  it('should value be blank object when value type is not an object', () => {
    let value: any = {}
    const wrapper = mount(SchemaForm, {
      props: {
        schema,
        value,
        onChange: (v: any) => value = v,
      }
    })
    // 查找渲染结果是否包含NumberField 和 StringField组件
    const stringField = wrapper.findComponent(StringField)
    stringField.props().onChange(undefined)
    expect(value.name).toBeUndefined()
  })
})
