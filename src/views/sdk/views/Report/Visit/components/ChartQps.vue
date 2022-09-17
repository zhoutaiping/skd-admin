<template>
  <div>
    <DmCard
      :loading="loading"
      title="TCP会话趋势"
    >
      <ChartLine
        :data="chartDataTCP"
        :options="settingsTCP"
      />
    </DmCard>
    <DmCard
      :loading="loading"
      class="margin-top"
      title="请求数趋势"
    >
      <ChartLine
        :data="chartDataQPS"
        :options="settingsQPS"
      />
    </DmCard>
  </div>
</template>

<script>
import moment from 'moment'

function formatDataM(data, columns, dateformat = 'M月D日 H:mm') {
  const x_data = data[0]
  let max = 0
  const [columnDate, ...columnsList] = columns
  const rows = x_data.map((time, index) => {
    const item = {
      [columnDate]: moment(time, 'YYYY-MM-DD HH:mm:ss').format(dateformat)
    }

    columnsList.forEach((column, cIndex) => {
      item[column] = data[cIndex + 1][index]
    })

    return item
  })

  data.forEach((item, index) => {
    if (index > 0 && item.length) {
      if (Math.max(...item) > max) max = Math.max(...item)
    }
  })

  return {
    columns,
    rows,
    max
  }
}

export default {
  props: {
    bindParams: Object,
    title: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      loading: true,
      chartDataTCP: {},
      settingsTCP: {
        baseUnit: '次',
        max: 1,
        grid: {
          top: 50
        }
      },
      chartDataQPS: {},
      settingsQPS: {
        baseUnit: 'QPS',
        max: 1,
        grid: {
          top: 50
        }
      }
    }
  },

  methods: {
    async init(params = {}) {
      params = {
        ...params,
        ...this.bindParams
      }
      this.loading = true
      const data = await this.Fetch.get('V4/statistic.tjkd.app.tcp.conversation.line', params)
      const chartDataTCP = formatDataM([
        data.trend.x_data,
        data.trend.y_data.data
      ], ['时间', '会话趋势'])
      this.settingsTCP.max = chartDataTCP.max
      this.chartDataTCP = chartDataTCP
      //
      const chartDataQPS = formatDataM([
        data.trend.x_data,
        data.trend.qps_data
      ], ['时间', 'QPS'])
      this.settingsQPS.max = chartDataQPS.max
      this.chartDataQPS = chartDataQPS
      this.loading = false
    }
  }
}
</script>
