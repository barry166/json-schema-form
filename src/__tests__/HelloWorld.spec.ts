import { describe, it, expect } from 'vitest'

import { mount } from '@vue/test-utils'
import { defineComponent, h } from 'vue'

const HelloWorld = defineComponent({
  props: {
    msg: {
      type: String,
    }
  },
  setup(props) {
    return () => {
      return h('div', props.msg)
    }
  }
})


describe('HelloWorld', () => {
  it('renders properly', () => {
    const wrapper = mount(HelloWorld, { props: { msg: 'Hello Vitest' } })
    expect(wrapper.text()).toContain('Hello Vitest')
  })
})
