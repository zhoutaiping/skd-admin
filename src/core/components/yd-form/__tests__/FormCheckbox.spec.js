import { mount } from '@vue/test-utils'
import localVue from 'tests/use/components'
import { asyncExpect } from 'tests/utils';
import Component from '../FormCheckbox.vue'

const NAME = 'yd-form-checkbox'

const select = [
  {
    label: 'a',
    value: 1
  },
  {
    label: 'b',
    value: 2
  }
]

describe('yd-form-checkbox', () => {
  const options = {
    localVue,
    propsData: {
      checks: select,
      value: []
    }
  }
  const wrapper = mount(Component, options)

  it('render', () => {
    expect(wrapper.exists()).toBe(true)

    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should render count', () => {
    expect(wrapper.findAll('.el-checkbox').length).toBe(select.length)
  })

  it('select checkbox one', async () => {
    expect(wrapper.vm.val).toEqual([])
    await asyncExpect(() => {
      wrapper.findAll('.el-checkbox').at(0).trigger('click')
    })

    expect(wrapper.vm.val).toEqual([1])

    // TODO
    // expect(wrapper.props().value).toEqual([1])
    // expect(wrapper.vm.isIndeterminate).toBe(true)
  })
  
  // it('select checkbox all', () => {
  //   wrapper.findAll('.el-checkbox').at(0).trigger('click')
  //   wrapper.findAll('.el-checkbox').at(1).trigger('click')
  //   expect(wrapper.vm.isIndeterminate).toBe(true)
  // })
})
