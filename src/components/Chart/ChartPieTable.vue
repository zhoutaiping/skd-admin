<template>
  <div >
    <el-row>
      <el-col :span="16">
        <ChartPie
          :loading="loading"
          :unit-type="unitType"
          :data="data"
          :options="options"
          @ready="handleReady"
        />
      </el-col>
      <el-col :span="8">
        <DataTable :data="tableData" />
      </el-col>
    </el-row>
  </div>
</template>

<script>
import ChartPie from './ChartPie'
import DataTable from './components/DataTable'
import base from './mixins/base'
import { arraySum } from '@/utils/array'

export default {
  name: 'ChartPieTable',

  components: { ChartPie, DataTable },

  mixins: [base],

  data() {
    return {
      tableData: {},
      options: {
        legend: {
          show: false
        }
      }
    }
  },

  watch: {
    data: {
      deep: true,
      handler() { this.formatList() }
    }
  },

  created() {
    this.formatList()
  },

  methods: {
    handleReady() {
      this.$emit('ready')
    },

    getListSum() {
      let sum = 0
      const { rows = [] } = this.data
      rows.forEach(item => {
        sum += arraySum(Object.values(item).splice(1))
      })
      return sum
    },

    formatList() {
      const list = []
      const { rows = [] } = this.data
      const sum = this.getListSum()

      rows.forEach(item => {
        const title = Object.keys(item)[0]
        const itemSum = arraySum(Object.values(item).splice(1))
        list.push({
          [title]: item[title],
          percent: `${((itemSum / sum) * 100).toFixed(2)} %`
        })
      })

      this.tableData = {
        columns: ['date', this.unitType, 'percent'],
        rows: list
      }
    }
  }
}
</script>
