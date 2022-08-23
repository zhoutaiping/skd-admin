import { shallowMount, mount, createLocalVue } from '@vue/test-utils'
import Component from '@/components/Column/ColumnDomain.vue'
import VueRouter from "vue-router"

const localVue = createLocalVue()
localVue.use(VueRouter)

describe('ColumnDomain', () => {
  const domain = 'www.yundun.com'

  it('domain + disabled', () => {
    const wrapper = shallowMount(Component, {
      propsData: {
        disabled: true,
        domain
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.classes('ColumnDomain')).toBe(true)
    expect(wrapper.text()).toBe(domain)
  })

  it('domain + to', () => {
    const router = new VueRouter()
    const wrapper = mount(Component, {
      localVue,
      router,
      propsData: {
        domain,
        to: domain
      }
    })
    expect(wrapper.html()).toMatchSnapshot()
    expect(wrapper.contains('a')).toBe(true)
  })
})
