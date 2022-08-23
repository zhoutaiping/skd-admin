<script>
import Color from '@/config/color'
import NameMapVal from '@/config/nameMap'
import { map } from './lib/map'
import core from './mixins/core'

export default {
  name: 'ChartMap',

  mixins: [core],

  data() {
    return {
      chartHandler: map,
      settings: {
        position: 'china',
        label: {
          show: false
        },
        legendVisible: false,
        itemStyle: {
          normal: {
            areaColor: '#cde1f5',
            borderColor: '#fff'
          }
        }
      },
      extendDefault: {
        aspectScale: 0.75,
        nameMap: NameMapVal.nameMap,
        // tooltip: {
        //   trigger: 'item'
        // },
        visualMap: {
          inverse: true,
          show: true,
          type: 'continuous',
          realtime: false,
          min: 0,
          max: 10000,
          calculable: false,
          text: ['高', '低'],
          inRange: {
            color: [Color.ColorPrimarySS, Color.ColorPrimary],
            symbolSize: [50, 100]
          },
          align: 'top',
          orient: 'horizontal'
        }
      }
    }
  }
}
</script>
