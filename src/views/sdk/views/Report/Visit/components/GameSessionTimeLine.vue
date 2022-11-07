<template>
  <DmCard
    :loading="loading"
    title="平均游戏时长"
  >
    <el-select
      slot="action"
      v-model="port"
      placeholder="请选择port"
      @change="changePort"
    >
      <el-option
        v-for="(port, index) in gameProtList"
        :key="port"
        :value="port"
        :label="port"
      />
    </el-select>
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
    gameProtList: {
      type: Array,
      default: () => []
    },
    gameProt: {
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
      this.port = this.gameProt
      this.data = formatData(data.trend, tip)
      this.data.tooltip = tooltipAlone(unit)
    },
    changePort(val) {
      this.$emit('changeGameTime', val)
    }
  }
}
</script>
