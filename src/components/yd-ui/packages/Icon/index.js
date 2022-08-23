import Icon from './Icon'
import IconStatus from './IconStatus'

Icon.install = Vue => {
  Vue.component(Icon.name, Icon)
  Vue.component(IconStatus.name, IconStatus)
}

export default Icon
