import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils'
config.stubs.transition = false
import Component from '@/components/Dm/DmTable.vue'
import ElementUI from 'element-ui'

const localVue = createLocalVue()
localVue.use(ElementUI)
const Name = 'DmTable'

describe(Name, () => {
  const options = {
    localVue,
    slots: {
      default: '<el-table />'
    }
  }

  const wrapper = mount(Component, options)
  const vm = wrapper.vm

  it(`${Name} render`, () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.classes('DmTable')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })
})
