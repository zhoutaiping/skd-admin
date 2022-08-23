<script>
import { histogram } from './lib/bar'
import core from './mixins/core'

export default {
  name: 'ChartBar',

  mixins: [core],

  data() {
    return {
      chartHandler: histogram,
      extendDefault: {
        xAxis: {
          boundaryGap: true
        },
        tooltip: {
          trigger: 'axis'
        }
      }
    }
  }
}
</script>
