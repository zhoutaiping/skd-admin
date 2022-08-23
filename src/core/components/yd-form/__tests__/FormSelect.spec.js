import { shallowMount } from '@vue/test-utils'
import localVue from 'tests/use/components'
import { asyncExpect } from 'tests/utils'
import Component from '../FormSelect'
import Vuex from 'vuex'

const NAME = 'yd-form-select'

const select = [
  {
    label: '__companyEN__',
    value: 1
  }
]

describe('yd-form-select', () => {
  let store

  beforeEach(() => {
    store = new Vuex.Store({
      modules: {
        app: {
          state: {
            assets: {
              companyEN: 'SDK'
            }
          }
        }
      }
    })
  })

  const options = {
    store,
    localVue,
    propsData: {
      selects: select,
      value: []
    }
  }
  const wrapper = shallowMount(Component, options)

  it('render', () => {
    expect(wrapper.exists()).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('should filter company', async() => {
    expect(wrapper.vm.selectsView).toEqual([
      {
        label: 'YUNDUN',
        value: 1
      }
    ])
  })
})
