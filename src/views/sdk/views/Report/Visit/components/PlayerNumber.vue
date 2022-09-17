<template>
  <yd-card :loading="loading" :title="title" :height="height">
    <el-select v-model="port" placeholder="请选择port" size="mini" style="margin-bottom: 10px;" @change="changePort">
      <el-option v-for="(port, index) in playProtList" :key="port" :value="port" :label="port"/>
    </el-select>
    <Chart :loading="false" :data="data" :grid="grid" :settings="settings" height="350px" />
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
    bindParams: Object,
    title: {
      type: String,
      default: ''
    },
    height: {
      type: Number,
      default: 430
    },
    playProtList: {
      type: Array,
      default: () => []
    },
    playProt: {
      type: String,
      default: ''
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
      port: ''
    }
  },

  methods: {
    async init(params, tip = ['时间', '瞬时数据']) {
      params = {
        ...params,
        ...this.bindParams
      }
      const data = params
      const unit = data.trend && data.trend.y_data ? data.trend.y_data.unit : ''
      this.settings.yAxisName = [`单位（${unit}）`]
      this.port = this.playProt
      this.data = formatData(data.trend, tip)
      this.data.tooltip = tooltipAlone(unit)
    },
    changePort(val) {
      this.$emit('chengeGameVisitLine', val)
    }
  }
}
</script>
