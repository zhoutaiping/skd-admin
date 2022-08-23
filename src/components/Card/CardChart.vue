<style lang="scss">
.CardChart {
  .iconLoading {
    color: $--color-primary;
    margin-left: 8px;
  }
  .ant-card-head {
    padding: 0 16px !important;
  }
  .ant-card-body {
    .ve-chart {
      margin-left: 0px;
      margin-right: 0px;
    }
  }
}
</style>

<template>
  <DmCard :class="b()" :loading="loading">
    <template v-if="title" slot="title">
      {{ title }}
    </template>
    <template slot="extra">
      <slot name="extra"/>
    </template>
    <Chart
      ref="Chart"
      :loading="false"
      :tooltip="tooltip"
      :data="chartData"
      :settings="settings"
      :y-axis="yAxis"
      height="350px"
    />
  </DmCard>
</template>

<script>
import create from '@/utils/create-basic'
import Chart from '@/components/Chart/Chart'

export default create({
  name: 'CardChart',
  components: { Chart },
  props: {
    title: String,
    tooltip: Object,
    data: Object,
    settings: Object,
    yAxis: Object,
    loading: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      firstLoading: false, // 第一次加载完成
      loadingView: this.loading,
      busy: false,
      chartData: this.data
    }
  },

  watch: {
    data(val) {
      this.$refs.Chart.clear()
      setTimeout(() => {
        this.chartData = val
      }, 50)
    },

    loading(val) {
      if (val) {
        if (this.firstLoading) {
          this.busy = true
        } else {
          this.loadingView = true
        }
      } else {
        this.firstLoading = true
        this.loadingView = false
        this.busy = false
      }
    }
  }
})
</script>
