import Alert from './packages/Alert'
import Badge from './packages/Badge'
import Button from './packages/Button'
import Card from './packages/Card'
import Charts from './packages/Charts'
import Dialog from './packages/Dialog'
import Form from './packages/Form'
import FormItem from './packages/FormItem'
import Icon from './packages/Icon'
import InputCheckbox from './packages/InputCheckbox'
import Scroll from './packages/Scroll'
import Loading from './packages/Loading'
import Table from './packages/Table'
import Tips from './packages/Tips'

function install(Vue) {
  if (install.installed) {
    return
  }
  install.installed = true

  const components = [
    Alert,
    Badge,
    Button,
    Card,
    Charts,
    Dialog,
    Form,
    FormItem,
    Scroll,
    Icon,
    InputCheckbox,
    Loading,
    Table,
    Tips
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
