<template>
  <DmCard
    :loading="loading"
    class="chartMap"
    title="CC攻击统计地图"
    style="margin-top: 12px"
  >
    <template slot="action">
      <el-radio-group
        v-model="activeProvince"
        @change="init"
      >
        <el-radio-button label="china">全国分布</el-radio-button>
        <el-radio-button label="world">全球分布</el-radio-button>
      </el-radio-group>
    </template>
    <el-row :gutter="12">
      <el-col :span="14">
        <ChartMap
          ref="chartMap"
          :data="chartProvince.data"
          :options="chartProvince.settings"
          :height="500"
        />
      </el-col>
      <el-col :span="10">
        <yd-table
          style="margin-top: 12px"
          type="white"
        >
          <el-table :data="chartProvince.data.rows.slice(0, 10)">
            <el-table-column
              type="index"
              label=" "
              width="50"
            />
            <el-table-column
              :label="activeProvince === 'china' ? '省份' : '国家'"
              prop="name"
            />
            <el-table-column
              label="攻击次数"
              align="right"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.value | formatNumber }} 次
              </template>
            </el-table-column>
            <el-table-column
              label="占比"
              prop="percent"
              width="120"
            >
              <template slot-scope="scope">
                <ColumnRatio :value="scope.row.percent" />
              </template>
            </el-table-column>
          </el-table>
        </yd-table>
      </el-col>
    </el-row>
  </DmCard>
</template>

<script>
import ColumnRatio from '@/components/Column/ColumnRatio'
import DateSelection from '@/components/DateSelect/DateSelection'

export default {
  components: {
    ColumnRatio,
    DateSelection
  },

  props: {
    bindParams: Object
  },

  data() {
    return {
      activeProvince: 'china',
      params: {},
      chartProvince: {
        data: {
          columns: [],
          rows: []
        },
        settings: {
        }
      },
      loading: false
    }
  },

  methods: {
    async fetchData(params) {
      this.loading = true
      const data = this.activeProvince === 'china' ? await this.Fetch.get('V4/statistic.tjkd.app.tcp.cc.Province.top', params) : await this.Fetch.get('V4/statistic.tjkd.app.tcp.cc.Country.top', params)

      data.forEach(item => {
        item.country = item.name
        item.count = item.value
        item.percent = (item.percent / 100).toFixed(4)
      })

      this.chartProvince.data = {
        columns: ['country', 'count', 'percent'],
        rows: data
      }

      this.chartProvince.settings = {
        labelMap: {
          count: '请求次数'
        },
        max: data.length === 0 ? 1 : Math.max(...data.map(_ => parseInt(_.count, 10))),
        position: this.activeProvince === 'china' ? 'china' : 'world'
      }
      this.loading = false
    },

    async init(params = {}) {
      params = {
        ...this.params,
        ...params
      }
      Object.assign(this.params, params)
      this.fetchData(params)
    }
  }
}
</script>
