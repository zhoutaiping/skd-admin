import { mount } from '@vue/test-utils'
import localVue from 'tests/use/components'
import { asyncExpect } from 'tests/utils';
import Component from '../FormRadioButton'

const NAME = 'yd-form-radio-button'

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

describe(NAME, () => {
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
    expect(wrapper.findAll('.el-radio-button').length).toBe(select.length)
  })

  it('select one', async () => {
    expect(wrapper.vm.val).toBe(1)
    await asyncExpect(() => {
      wrapper.findAll('.el-radio-button').at(1).trigger('click')
    })

    expect(wrapper.vm.val).toBe(2)
  })
})