<template>
  <yd-card
    :loading="loading"
    title="CC攻击趋势"
    height="400"
  >
    <Chart
      :loading="false"
      :data="data"
      :settings="settings"
      height="350px"
    />
  </yd-card>
</template>

<script>
import chartMixins from '@/mixins/chart'
import Chart from '@/components/Chart/Chart'
import { formatData, tooltipAlone } from '@/utils/chart'

export default {
  components: {
    Chart
  },

  mixins: [chartMixins],

  props: {
    bindParams: Object
  },

  data() {
    return {
      API_URI: 'GET V4/statistic.tjkd.app.tcp.cc.line',
      settings: {
        type: 'line'
      }
    }
  },

  methods: {
    async init(params) {
      params = {
        ...params,
        ...this.bindParams
      }
      const data = await this.fetchData(params)
      const unit = data.trend && data.trend.y_data ? data.trend.y_data.unit : ''
      this.settings.yAxisName = [`单位（${unit}）`]
      this.data = formatData(data.trend, ['时间', '攻击QPS'])
      this.data.tooltip = tooltipAlone(unit)
    }
  }
}
</script>
