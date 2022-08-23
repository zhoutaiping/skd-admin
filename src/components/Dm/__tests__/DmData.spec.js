import { shallowMount, mount, createLocalVue, config } from '@vue/test-utils'
config.stubs.transition = false
import Component from '@/components/Dm/DmData.vue'
import ElementUI from 'element-ui'
import VueRouter from 'vue-router'

const localVue = createLocalVue()
localVue.use(ElementUI)
const Name = 'DmData'

localVue.use(VueRouter)
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
    expect(wrapper.classes('DmData')).toBe(true)
    expect(wrapper.contains('.el-table')).toBe(true)
    expect(wrapper.contains('.el-pagination')).toBe(true)
    expect(wrapper.html()).toMatchSnapshot()
  })

  it('DmData params', () => {
    const params = vm.getParams()

    expect(params).toEqual({
      page: 1,
      per_page: 10,
      total: 0
    })
  })

  it('DmData on-init', () => {
    expect(wrapper.emitted('init')).toBeTruthy()
    expect(wrapper.emitted('init').length).toBe(1)
    // expect(wrapper.emitted('init')[0]).toEqual([
    //   {
    //     page: 1,
    //     pagesize: 10,
    //     per_page: 10
    //   }
    // ])
  })

  it('DmData set-init', () => {
    vm.init({ total: 100 })
    expect(vm.pagination.total).toBe(100)

    vm.init({ total: 'AS' })
    expect(vm.pagination.total).toBe(0)
  })
  
  // it('DmData handleCurrentChange', () => {
  //   vm.handleCurrentChange(10)
  //   expect(vm.pagination.page).toBe(10)
  // })

  // it('DmData initPage', () => {
  //   vm.initPage()
  //   expect(vm.pagination.page).toBe(1)
  // })

  // it('DmData handleSizeChange', () => {
  //   vm.handleSizeChange(50)
  //   expect(vm.pagination.per_page).toBe(50)
  //   expect(vm.pagination.page).toBe(1)
  // })
})
