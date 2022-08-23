import TipsButton from './_TipsButton'
import TipsTooltip from './TipsTooltip'

const Tips = {}

Tips.install = function(Vue) {
  Vue.component(TipsButton.name, TipsButton)
  Vue.component(TipsTooltip.name, TipsTooltip)
}

export default Tips
