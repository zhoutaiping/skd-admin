<template>
  <DmCard :loading="loading">
    <template slot="title">
      通道回源统计
      <TipsTooltip>
        <p
          v-for="(item, index) in tips"
          :key="index"
        >{{ item.title }}: {{ item.content }}</p>
      </TipsTooltip>
    </template>
    <ChartLine
      :data="chartData"
      :options="options"
    />
  </DmCard>
</template>

<script>
import moment from 'moment'
import TipsTooltip from '@/components/Tips/TipsTooltip'

export default {
  components: { TipsTooltip },

  props: {
    bindParams: Object
  },

  data() {
    return {
      loading: true,
      chartData: {},
      options: {
        labelMap: {},
        grid: {
          top: 50
        }
      },
      tips: []
    }
  },

  methods: {
    async init(params) {
      this.loading = true
      params = {
        ...params,
        ...this.bindParams
      }
      const data = await this.Fetch.get('V4/statistic.tjkd.app.channel.ip.status.line', params)

      const labelMap = {
        x_data: '日期'
      }
      const trend = data.trend
      const rows = []
      const tips = []
      const columns = Object.keys(trend).filter(_ => _ !== 'x_data')

      columns.forEach(key => {
        const { name } = trend[key]
        labelMap[key] = name
        tips.push({
          title: name,
          content: trend[key].desc
        })
      })

      trend.x_data.forEach((date, index) => {
        const item = {}

        columns.map(key => {
          if (trend[key].value) {
            item[key] = trend[key].value[index]
          }
        })
        rows.push({
          ...item,
          date: moment(date, 'YYYY-MM-DD HH:mm:ss').format('YYYY-MM-DD HH:mm')
        })
      })

      this.tips = tips

      this.options.labelMap = labelMap
      this.chartData = {
        columns: ['date'].concat(columns),
        rows
      }
      this.loading = false
    }
  }
}
</script>
