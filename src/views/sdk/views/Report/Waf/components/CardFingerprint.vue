<template>
  <DmCard
    :loading="loading"
  >
    <yd-form-radio-button
      slot="title"
      :radios="selectType"
      v-model="type"
      @change="init(bindParams)"
    />
    <el-row>
      <el-col :span="12">
        <ChartPie
          :data="data"
          :options="options"
          :extend="extend"
          :height="330"
          :loading="false"
          :data-empty="!loading && !data.rows.length"
          style="margin-top: -30px"
        />
      </el-col>
      <el-col :span="12">
        <DmTable type="white">
          <el-table v-if="type==='fingerprint'" :data="data.rows">
            <el-table-column
              prop="name"
              label="设备信誉"
            />
            <el-table-column
              prop="value"
              align="right"
              label="数量"
              width="150"
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
                <ColumnRatio :value="scope.row.percent/100"/>
              </template>
            </el-table-column>
          </el-table>
          <el-table v-else :data="data.rows">
            <el-table-column
              prop="name"
              label="风险类型"
            />
            <el-table-column
              prop="value"
              align="right"
              label="数量"
              width="150"
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
                <ColumnRatio :value="scope.row.percent/100"/>
              </template>
            </el-table-column>
          </el-table>
        </DmTable>
      </el-col>
    </el-row>
  </DmCard>
</template>

<script>
import create from '@/utils/create-basic'
import ColumnRatio from '@/components/Column/ColumnRatio'

export default create({
  name: 'CardAttackIpTop',

  components: { ColumnRatio },

  data() {
    return {
      loading: true,
      type: 'terminal',
      selectType: [
        {
          label: '风险类型分布',
          value: 'terminal'
        }
      ],
      data: {
        columns: [],
        row: []
      },
      options: {
        radius: 100
      },
      extend: {
        legend: {
          show: false
        }
      },
      bindParams: {}
    }
  },

  methods: {
    async init(params) {
      this.bindParams = params
      let data
      if (this.type === 'fingerprint') {
        data = await this.Fetch.post('V4/statistic.tjkd.app.fingerprint.data', params)
      } else {
        data = await this.Fetch.post('V4/statistic.tjkd.app.package.terminal.risk', params)
      }

      this.loading = true
      delete data._status
      this.data = {
        columns: ['name', 'value'],
        rows: data
      }
      this.loading = false
    }
  }
})
</script>
