import chart from './Chart'
import ChartBar from './ChartBar'
import ChartLine from './ChartLine'
import ChartMap from './ChartMap'
import ChartPieTable from './ChartPieTable'
import ChartPie from './ChartPie'
import ChartToggle from './ChartToggle'

const Chart = {}

Chart.install = Vue => {
  Vue.component(chart.name, chart)
  Vue.component(ChartBar.name, ChartBar)
  Vue.component(ChartLine.name, ChartLine)
  Vue.component(ChartMap.name, ChartMap)
  Vue.component(ChartPieTable.name, ChartPieTable)
  Vue.component(ChartPie.name, ChartPie)
  Vue.component(ChartToggle.name, ChartToggle)
}

export default Chart
