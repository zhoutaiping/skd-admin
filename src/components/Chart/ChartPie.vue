<script>
import { pie } from './lib/pie'
import core from './mixins/core'

export default {
  name: 'ChartPie',

  mixins: [core],

  props: {
    tableVisible: Boolean
  },

  data() {
    return {
      chartHandler: pie
      // extend: {
      //   tooltip: {
      //     trigger: 'item'
      //   }
      // }
    }
  }
}
</script>
