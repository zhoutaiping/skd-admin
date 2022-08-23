import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils'
config.stubs.transition = false
import Component from '@/components/Dm/DmDialog.vue'
import ElementUI from 'element-ui'
import YdUI from '@/components/yd-ui'
// import consoleDialog from '@/mixins/consoleDialog'

const localVue = createLocalVue()
localVue.use(ElementUI)
localVue.use(YdUI)
// localVue.mixin(consoleDialog)
const Name = 'DmDialog'

describe(Name, () => {
  const options = {
    localVue,
    propsData: {
      titleLabel: '组件'
    },
    slots: {
      default: '<el-form />'
    }
  }

  const wrapper = mount(Component, options)
  const vm = wrapper.vm

  it(`render`, () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  // it(`handleOpen`, () => {
  //   expect(wrapper.not.toBeVisible())
  //   vm.handleOpen()
  //   expect(vm.visible).toBe(true)
  // }) 
  
  // it(`handleClose`, () => {
  //   expect(wrapper.toBeVisible())
  //   vm.handleClose()
  //   expect(vm.visible).toBe(false)
  // })

  // it(`title`, () => {
  //   wrapper.setProps({
  //     mode: 'Edit'
  //   })
  //   expect(vm.titleShow).toBe('修改组件')
  //   wrapper.setProps({
  //     mode: 'Create'
  //   })
  //   expect(vm.titleShow).toBe('创建组件')
  // })
})
