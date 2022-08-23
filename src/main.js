import Vue from 'vue'
import App from './App'
import store from './store'
import router from './router'
import Element from 'element-ui'
import Cookies from 'js-cookie'
import * as filters from './filters' // global filters

import '@/core/use'
import '@/core/use-console'
import '@/core/use-stage'

import 'normalize.css/normalize.css' // a modern alternative to CSS resets
import '@/styles/theme/index.css' // global css
import '@/styles/index.scss' // global css

import './icons' // icon
import './permission' // permission control

/**
 * If you don't want to use mock-server
 * you want to use MockJs for mock api
 * you can execute: mockXHR()
 *
 * Currently MockJs will be used in the production environment,
 * please remove it before going online ! ! !
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('../mock')
  mockXHR()
}

Vue.use(Element, {
  size: Cookies.get('size') || 'medium' // set element-ui default size
})

// register global utility filters
Object.keys(filters).forEach(key => {
  Vue.filter(key, filters[key])
})

Vue.config.productionTip = false

new Vue({
  el: '#app',
  router,
  store,
  render: h => h(App)
})
