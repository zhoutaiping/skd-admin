<template>
  <yd-card :loading="loading" >
    <div slot="header">
      <div style="display:inline-block; float:left;">
        <h2 class="yd-card__title">{{ title }}</h2>
      </div>
      <div style="display:inline-block; float:right;">
        <el-select v-model="ip" placeholder="" @change="changIpPort">
          <el-option
            v-for="(item, index) in ipList"
            :key="index"
            :label="item"
            :value="item"/>
        </el-select>
        <el-select v-model="port" placeholder="" @change="changIpPort">
          <el-option
            v-for="(item, index) in portList"
            :key="index"
            :label="item"
            :value="item"/>
        </el-select>
      </div>
    </div>
    <div style="width:500px; margin:0 0 20px;">
      <h5 v-for="(desc, d_index) in desc" :key="d_index" style="width:120px; margin:2px; display:inline-block;">{{ desc.name }}: {{ desc.desc }}</h5>
    </div>
    <ChartLine :loading="false" :data="data" :grid="grid" :settings="settings" height="350px" />
  </yd-card>
</template>

<script>
import chartMixins from '@/mixins/chart'
import ChartLine from '@/components/Chart/ChartLine'
import { tooltipAlone } from '@/utils/chart'
import moment from 'moment'
export default {
  components: {
    ChartLine
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
    ipList: {
      type: Array,
      default: () => []
    },
    portList: {
      type: Array,
      default: () => []
    },
    ipStatusLineIp: {
      type: String,
      default: ''
    },
    ipStatusLinePort: {
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
      port: '',
      ip: '',
      desc: []
    }
  },

  methods: {
    async init(params, tip = ['时间', '406', '407', '408', '409', '410', '411', '412', '413']) {
      params = {
        ...params,
        ...this.bindParams
      }
      const data = params
      const unit = data.trend && data.trend.status_200_data ? data.trend.status_200_data.unit || '次' : '次'
      this.ip = this.ipStatusLineIp
      this.port = this.ipStatusLinePort
      this.settings.yAxisName = [`单位（${unit}）`]
      this.desc = this.getDesc(data.trend, tip)
      this.data = this.formatData(data.trend, tip,
        'status_406_data', 'status_407_data', 'status_408_data', 'status_409_data', 'status_410_data', 'status_411_data', 'status_412_data', 'status_413_data')
      this.data.tooltip = tooltipAlone(unit)
    },
    changIpPort() {
      this.$emit('changeIpStatusLine', this.ip, this.port)
    },
    getDesc(data, list) {
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
    formatData(data, columns, key1, key2, key3, key4, key5, key6, key7, key8) {
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
      const key5_data = data[key5].value || {
        data: [],
        unit: ''
      }
      const key6_data = data[key6].value || {
        data: [],
        unit: ''
      }
      const key7_data = data[key7].value || {
        data: [],
        unit: ''
      }
      const key8_data = data[key8].value || {
        data: [],
        unit: ''
      }
      const rows = x_data.map((time, index) => {
        let new_key1_data = 0
        let new_key2_data = 0
        let new_key3_data = 0
        let new_key4_data = 0
        let new_key5_data = 0
        let new_key6_data = 0
        let new_key7_data = 0
        let new_key8_data = 0
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
        if (key5) {
          new_key5_data = key5_data[index]
        } else {
          new_key5_data = key5_data.data[index]
        }
        if (key6) {
          new_key6_data = key6_data[index]
        } else {
          new_key6_data = key6_data.data[index]
        }
        if (key7) {
          new_key7_data = key7_data[index]
        } else {
          new_key7_data = key7_data.data[index]
        }
        if (key8) {
          new_key8_data = key8_data[index]
        } else {
          new_key8_data = key8_data.data[index]
        }
        return {
          [columns[0]]: moment(time, 'YYYY-MM-DD HH:mm:ss').format('M月D日 H:mm'),
          [columns[1]]: new_key1_data,
          [columns[2]]: new_key2_data,
          [columns[3]]: new_key3_data,
          [columns[4]]: new_key4_data,
          [columns[5]]: new_key5_data,
          [columns[6]]: new_key6_data,
          [columns[7]]: new_key7_data,
          [columns[8]]: new_key8_data
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
