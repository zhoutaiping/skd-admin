import DmAlert from './DmAlert'
import DmButton from './DmButton'
import DmData from './DmData'
import DmCard from './DmCard'
import DmTable from './DmTable'
import DmToolbar from './DmToolbar'
import DmDialog from './DmDialog'
import DmDialogForm from './DmDialogForm'
import ConsolePageLayout from './ConsolePageLayout'

DmData.install = Vue => {
  Vue.component(DmAlert.name, DmAlert)
  Vue.component(DmButton.name, DmButton)
  Vue.component(DmData.name, DmData)
  Vue.component(DmCard.name, DmCard)
  Vue.component(DmTable.name, DmTable)
  Vue.component(DmToolbar.name, DmToolbar)
  Vue.component(DmDialog.name, DmDialog)
  Vue.component(DmDialogForm.name, DmDialogForm)
  Vue.component(ConsolePageLayout.name, ConsolePageLayout)
}

export default DmData
