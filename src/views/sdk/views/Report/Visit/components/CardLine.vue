<template>
  <DmCard
    :loading="loading"
    :title="title"
    :height="height"
  >
    <h4 v-if="is_total">总数：{{ total }}</h4>
    <Chart
      :loading="false"
      :data="data"
      :grid="grid"
      :settings="settings"
      height="350px"
    />
  </DmCard>
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
    bindParams: Object,
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 400
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
        type: 'line'
      },
      is_total: false,
      total: 0
    }
  },

  methods: {
    async init(params, tip = ['时间', '瞬时数据'], is_total) {
      params = {
        ...params,
        ...this.bindParams
      }
      const data = params
      const unit = data.trend && data.trend.y_data ? data.trend.y_data.unit : ''
      if (is_total === true) {
        this.is_total = true
        this.total = data.total
      }
      this.settings.yAxisName = [`单位（${unit}）`]
      this.data = formatData(data.trend, tip)
      this.data.tooltip = tooltipAlone(unit)
    }
  }
}
</script>
