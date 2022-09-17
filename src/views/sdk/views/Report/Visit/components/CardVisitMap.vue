<template>
  <DmCard
    :loading="loading"
    title="访客分布"
    style="margin-top: 12px"
  >
    <template slot="action">
      <el-radio-group
        v-model="chartProvince.settings.position"
        @change="fetchData"
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
              :label="chartProvince.settings.position === 'china' ? '省份' : '国家'"
              prop="name"
            />
            <el-table-column
              label="访客个数"
              align="right"
              width="100"
            >
              <template slot-scope="scope">
                {{ scope.row.value | formatNumber }} 个
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

export default {
  components: {
    ColumnRatio
  },

  props: {
    bindParams: Object
  },

  data() {
    return {
      API_MAP: {
        china: 'V4/statistic.tjkd.app.province.visit.top',
        world: 'V4/statistic.tjkd.app.country.visit.top'
      },
      params: {},
      chartProvince: {
        data: {
          columns: [],
          rows: []
        },
        settings: {
          position: 'china',
          labelMap: {
            value: '访客个数'
          }
        }
      },
      loading: false
    }
  },

  methods: {
    async fetchData() {
      this.loading = true
      const position = this.chartProvince.settings.position
      let data = []

      try {
        data = await this.Fetch.get(this.API_MAP[position], {
          ...this.bindParams,
          ...this.params
        })
      } catch (e) {
        return
      } finally {
        this.loading = false
      }

      data.forEach(item => {
        item.percent = (item.percent / 100).toFixed(4)
      })

      const max = data.length === 0 ? 1 : Math.max(...data.map(_ => parseInt(_.value)))
      this.chartProvince.settings.max = max

      this.chartProvince.data = {
        columns: ['name', 'value', 'percent'],
        rows: data
      }
    },

    async init() {
      this.fetchData()
    }
  }
}
</script>
