import Vue from 'vue'
import YdUI from '@/components/yd-ui'
import ColumnStatus from '@/components/Column/ColumnStatus'
import ColumnSelect from '@/components/Column/ColumnSelect'
import ColumnRouter from '@/components/Column/ColumnRouter'
import InputSearch from '@/components/Input/InputSearch'
import NavbarPage from '@/components/Navbar/NavbarPage'
import DialogForm from '@/components/Dialog/DialogForm'
import PopoverConfirm from '@/components/Popover/PopoverConfirm'
import TipsTooltip from '@/components/Tips/TipsTooltip'
import InputMultiple from '@/components/Input/InputMultiple'

import Components from '@/components'
Vue.use(Components)

Vue.component(ColumnSelect.name, ColumnSelect)
Vue.component(ColumnRouter.name, ColumnRouter)

Vue.component(DialogForm.name, DialogForm)
Vue.component(PopoverConfirm.name, PopoverConfirm)
Vue.component(ColumnStatus.name, ColumnStatus)
Vue.component(InputSearch.name, InputSearch)
Vue.component(NavbarPage.name, NavbarPage)
Vue.component(TipsTooltip.name, TipsTooltip)
Vue.component(InputMultiple.name, InputMultiple)

Vue.use(YdUI)

// TODO

import domainMixins from '@/mixins/domain'
Vue.mixin(domainMixins)

import CardChart from '@/components/Card/CardChart'
import Chart from '@/components/Chart/Chart'

Vue.component(CardChart.name, CardChart)
Vue.component(Chart.name, Chart)

import 'v-charts/lib/style.min.css'

import consoleMixins from '@/mixins/console'
Vue.mixin(consoleMixins)

Vue.prototype.successCallback = function(response) {
  if (response) {
    if (response.data.status.code === 1) {
      this.$store.dispatch('getBasicinfo')
    } else {
      this.$message.error(response.data.status.message)
    }
  }
}
