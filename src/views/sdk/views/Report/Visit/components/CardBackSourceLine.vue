<template>
  <DmCard :loading="loading">
    <template slot="title">
      节点回源统计
      <TipsTooltip>
        <p
          v-for="(item, index) in desc"
          :key="index"
        >{{ item.name }}: {{ item.desc }}</p>
      </TipsTooltip>
    </template>
    <template slot="action">
      <yd-form-select
        :selects="selectPort"
        v-model="params.port"
        default-text="全部端口"
        style="width: 120px"
        @change="init"
      />
    </template>
    <ChartLine
      :data="data"
      :options="options"
    />
  </DmCard>
</template>

<script>
import moment from 'moment'
import chartMixins from '@/mixins/chart'
import TipsTooltip from '@/components/Tips/TipsTooltip'

export default {
  components: { TipsTooltip },

  mixins: [chartMixins],

  props: {
    bindParams: Object,
    portList: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      loading: true,
      params: {
        ip: '',
        port: ''
      },
      selectIP: [],
      selectPort: [],
      desc: [],
      options: {
        grid: {
          top: 50
        }
      }
    }
  },

  methods: {
    async init(params) {
      params = {
        ...params,
        ...this.bindParams
      }
      const { package_id } = params
      this.loading = true
      const data = await this.Fetch.get('V4/statistic.tjkd.app.ip.status.line', params)
      delete data._status
      this.selectPort = this.portList.map(_ => {
        return {
          label: _,
          value: _
        }
      })

      this.options.yAxisName = [`单位（次）`]
      const tip = ['时间', '200', '404', '405', '502']
      this.desc = this.formatDesc(data.trend, tip)
      this.data = this.formatData(data.trend, tip, 'status_200_data', 'status_404_data', 'status_405_data', 'status_502_data')

      this.loading = false
      this.fetchIpList(package_id)
    },
    // 回源统计IpList
    async fetchIpList(package_id) {
      const params = { package_id }
      const data = await this.Fetch.get('V4/tjkd.app.package.ip.list', params)
      delete data._status
      this.selectIP = data.map(_ => {
        return {
          value: _,
          label: _
        }
      })
    },

    formatDesc(data, list) {
      const arr = []
      list.forEach(i => {
        const key = 'status_' + i + '_data'
        if (data && data[key]) {
          arr.push({
            name: data[key].name || i,
            desc: data[key].desc || ''
          })
        }
      })
      return arr
    },

    formatData(data, columns, key1, key2, key3, key4, key5) {
      const x_data = data.x_data || []
      const key1_data = data[key1].value || {
        data: [],
        unit: ''
      }
      const key2_data = data[key2].value || {
        data: [],
        unit: ''
      }
      const key3_data = data[key3].value || {
        data: [],
        unit: ''
      }
      const key4_data = data[key4].value || {
        data: [],
        unit: ''
      }

      const rows = x_data.map((time, index) => {
        let new_key1_data = 0
        let new_key2_data = 0
        let new_key3_data = 0
        let new_key4_data = 0
        if (key1) {
          new_key1_data = key1_data[index]
        } else {
          new_key1_data = key1_data.data[index]
        }
        if (key2) {
          new_key2_data = key2_data[index]
        } else {
          new_key2_data = key2_data.data[index]
        }
        if (key3) {
          new_key3_data = key3_data[index]
        } else {
          new_key3_data = key3_data.data[index]
        }
        if (key4) {
          new_key4_data = key4_data[index]
        } else {
          new_key4_data = key4_data.data[index]
        }

        return {
          [columns[0]]: moment(time, 'YYYY-MM-DD HH:mm:ss').format('M月D日 H:mm'),
          [columns[1]]: new_key1_data,
          [columns[2]]: new_key2_data,
          [columns[3]]: new_key3_data,
          [columns[4]]: new_key4_data
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
