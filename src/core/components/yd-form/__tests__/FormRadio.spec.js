import { mount } from '@vue/test-utils'
import localVue from 'tests/use/components'
import { asyncExpect } from 'tests/utils';
import Component from '../FormRadio'

const NAME = 'yd-form-radio'

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

describe('yd-form-radio', () => {
  const options = {
    localVue,
    propsData: {
      radios: select,
      value: 1
    }
  }
  const wrapper = mount(Component, options)

  it('render', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot();
  })

  it('should render count', () => {
    expect(wrapper.findAll('.el-radio').length).toBe(select.length)
  })

  it('select one', async () => {
    expect(wrapper.vm.val).toBe(1)
    await asyncExpect(() => {
      wrapper.findAll('.el-radio').at(1).trigger('click')
    })

    expect(wrapper.vm.val).toBe(2)
  })
})