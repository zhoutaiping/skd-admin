<template>
  <yd-card :loading="loading" :title="title" :height="height">
    <Chart :loading="false" :data="data" :grid="grid" :extend="extend" :settings="settings" height="350px" />
  </yd-card>
</template>

<script>
import chartMixins from '@/mixins/chart'
import { tooltipAlone } from '@/utils/chart'

export default {
  components: {
    // Chart
  },

  mixins: [chartMixins],

  props: {
    bindParams: Object,
    title: {
      type: String,
      default: ''
    },
    legendVisible: {
      type: Boolean,
      default: true
    },
    height: {
      type: Number,
      default: 400
    },
    extend: {
      type: Object,
      default: () => {
        return {
          series: {
            type: 'bar',
            barWidth: '10',
            barGap: '30%'
          },
          xAxis: {
            boundaryGap: true
          }
        }
      }
    },

    grid: {
      type: Object,
      default: () => {
        return {
          top: 30,
          left: 100,
          right: 20,
          bottom: 30
        }
      }
    }
  },

  data() {
    return {
      settings: {
        type: 'histogram'
      }
    }
  },

  methods: {
    async init(params, tip = ['时间', '瞬时数据']) {
      params = {
        ...params,
        ...this.bindParams
      }
      const data = params
      const unit = '个'
      this.settings.yAxisName = [`单位（${unit}）`]
      this.data = this.formatData(data.trend, tip)
      this.data.tooltip = tooltipAlone(unit)
    },
    formatData(data, columns) {
      const x_data = data.x_data.length ? data.x_data || ['暂无'] : ['暂无']
      const key1_data = data.y_data || {
        data: [0],
        unit: ''
      }
      const rows = x_data.map((time, index) => {
        const columns_1_data = key1_data[index] || key1_data.data[index] || 0
        return {
          [columns[0]]: time,
          [columns[1]]: columns_1_data
        }
      })
      return {
        columns,
        rows
      }
    }
  }
}
</script>
