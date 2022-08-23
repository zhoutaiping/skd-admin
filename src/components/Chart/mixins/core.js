import echarts from 'echarts/lib/echarts'
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/pie'
import 'echarts/lib/chart/map'

import { throttle } from 'throttle-debounce'
import { maxSection } from '@/utils/array'
import setExtend from '../lib/extend'
import { getFormated } from '../lib/utils'
import DataEmpty from '../components/DataEmpty'
import base from './base'
import { DEFAULT_COLORS } from '../constants'

export default {
  render(h) {
    return h(
      'div',
      {
        style: {
          height: this.height + 'px'
        }
      },
      [
        h('div', {
          style: {
            height: this.height + 'px'
          },
          class: { ChartsCover: this.dataEmpty || this.loading },
          ref: 'chart'
        }),
        h(DataEmpty, {
          style: { display: this.dataEmpty ? '' : 'none' }
        })
      ]
    )
  },

  mixins: [base],

  data() {
    return {
      extendData: {}
      // extend: {}
    }
  },

  watch: {
    height() {
      this.resize()
    },

    data: {
      deep: true,
      handler() {
        this.dataUpdateHandler()
      }
    },

    options: {
      deep: true,
      handler() {
        this.initOptions()
        this.dataUpdateHandler()
      }
    },

    extends: {
      deep: true,
      handler() {
        this.initOptions()
        this.dataUpdateHandler()
      }
    }
  },

  created() {
    this.echarts = null
    this._once = {}
    this.initOptions()
    this.init()
  },

  methods: {
    // 生成配置并渲染
    optionsHandler(options) {
      this.extendsHander(options)
      // change inited echarts settings
      if (this.extend) {
        setExtend(options, {
          ...this.extendDefault,
          ...this.extend
        })
      }

      if (this.echarts) {
        this.echarts.setOption(options)
        this.$emit('ready', this.echarts, options)

        if (!this._once['ready-once']) {
          this._once['ready-once'] = true
          this.$emit('ready-once', this.echarts, options)
        }
      }
    },
    // 配置更新
    extendsHander(options) {
      const chartType =
        options.series && options.series[0]
          ? options.series[0].type
          : 'line'

      if (this.options.max) {
        if (chartType === 'map') {
          this.extendDefault.visualMap.max = this.options.max
        } else if (['line', 'bar'].includes(chartType)) {
          const yAxisType = this.settings.yAxisType
          const unitType = (yAxisType && yAxisType[0]) || 'normal'

          if (['byte', 'bits'].includes(unitType)) {
            const [maxValue, maxUnit] = this.formatter(this.options.max).split(' ')
            let max = maxValue
            if (unitType === 'byte') {
              if (maxUnit === 'B') max = maxSection(maxValue)
              if (maxUnit === 'KB') max = maxSection(maxValue) * 1024
              if (maxUnit === 'MB') max = maxSection(maxValue) * 1024 * 1024
              if (maxUnit === 'GB') max = maxSection(maxValue) * 1024 * 1024 * 1024
              if (maxUnit === 'TB') {
                max = maxSection(maxValue) * 1024 * 1024 * 1024 * 1024
              }
            } else if (unitType === 'bits') {
              if (maxUnit === 'bps') max = maxSection(maxValue)
              if (maxUnit === 'Kbps') max = maxSection(maxValue) * 1000
              if (maxUnit === 'Mbps') max = maxSection(maxValue) * 1000 * 1000
              if (maxUnit === 'Gbps') max = maxSection(maxValue) * 1000 * 1000 * 1000
            }

            if (options.yAxis && options.yAxis.length) {
              if (max > 0) {
                //
              } else {
                max = 1
              }
              options.yAxis.forEach(item => {
                item.max = max
              })
            }
          }
        }
      }
    },
    // 数据更新
    dataUpdateHandler() {
      this.clear()
      this.dataHandler()
    },
    // 数据处理
    dataHandler() {
      const { columns = [], rows = [] } = this.data
      const extra = {
        tooltipVisible: this.tooltipVisible,
        legendVisible: this.legendVisible,
        color: DEFAULT_COLORS,
        _once: this._once
      }

      const options = this.chartHandler(columns, rows, this.settings, extra)

      if (options) {
        if (typeof options.then === 'function') {
          options.then(this.optionsHandler)
        } else {
          this.optionsHandler(options)
        }
      }
    },

    initOptions() {
      Object.assign(this.settings, this.options)
      const { grid } = this.options
      Object.assign(this.extend, { grid })

      const unitType =
        this.settings.yAxisType && this.settings.yAxisType[0]
          ? this.settings.yAxisType[0]
          : 'normal'
      this.formatter = val => getFormated(val, unitType)
    },
    // 获取最大值
    getRowsMax() {
      const { rows = [] } = this.data
      const list = []
      rows.forEach(item => {
        list.push(Math.max(...Object.values(item).splice(1)))
      })
      return Math.max(...list)
    },

    init() {
      this.$nextTick(() => {
        this.echarts = echarts.init(this.$refs.chart, 'yundun')
        window.addEventListener('resize', throttle(500, this.resize), false)
        this.dataHandler()
      })
    },

    resize() {
      this.echarts && this.echarts.resize()
    },

    clear() {
      this.echarts && this.echarts.clear()
    }
  }
}
