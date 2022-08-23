<script>
import { line } from './lib/line'
import core from './mixins/core'

export default {
  name: 'ChartLine',

  mixins: [core],

  data() {
    return {
      chartHandler: line,
      extendDefault: {
        grid: {
          top: 40,
          left: 80,
          bottom: 20
        },
        xAxis: {
          boundaryGap: false
        },
        legend: {
          type: 'scroll'
        },
        tooltip: {
          trigger: 'axis'
        }
      }
    }
  }
}
</script>
