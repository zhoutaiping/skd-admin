import Card from './Card'
import Column from './Column'
import Tips from './Tips'
import Dm from './Dm'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Card,
    Column,
    Tips,
    Dm
  ]

  components.forEach(Component => {
    Component.install(Vue)
  })
}

if (typeof window !== 'undefined' && window.Vue) {
  window.Vue.use(install)
}

export default {
  install
}
