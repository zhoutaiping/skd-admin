<template>
  <div>
    <ToolbarLogCommon
      placeholder="IP"
      @submit="handleSearch"
    />
    <DmData
      ref="DmData"
      @init="fetchList"
    >
      <DmTable
        :loading="loading"
        min-height
      >
        <el-table
          :data="list"
        >
          <el-table-column
            label="时间"
            prop="created_at"
            min-width="150"
          />
          <el-table-column
            label="变更前"
            min-width="150"
          >
            <template slot-scope="scope">
              <ColumnListMore v-model="scope.row.before_change_ips" />
            </template>
          </el-table-column>
          <el-table-column
            label="变更后"
            min-width="150"
          >
            <template slot-scope="scope">
              <ColumnListMore v-model="scope.row.after_change_ips" />
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <DialogRow
      ref="DialogRow"
      @init="fetchList"
    />
  </div>
</template>

<script>
import consoleData from '@/mixins/consoleData'
import ColumnListMore from '@/components/Column/ColumnListMore'
import ToolbarLogCommon from '@/components/Toolbar/ToolbarLogCommon'

export default {
  components: { ColumnListMore, ToolbarLogCommon },

  mixins: [consoleData],

  data() {
    return {
      API_INDEX: 'V4/tjkd.app.package.pool.change.log',
      bindParams: {
        package_id: this.$route.params.id
      },
      RESDATA: { 'status': { 'code': 1, 'message': '操作成功', 'create_at': '2022-08-11 23:08:53', 'api_time_consuming': '77.100992202759ms', 'function_time_consuming': '9.2599391937256ms', 'dispatch_before_time_consuming': '43.259143829346ms' }, 'data': { 'total': '1', 'list': [{ 'created_at': '2022-08-03 08:44:44', 'before_change_ips': [], 'after_change_ips': ['121.199.*.190', '39.108.*.22', '120.77.*.153', '120.24.*.144', '132.232.*.241', '212.64.*.166', '47.100.*.117', '148.70.*.126', '118.25.*.27', '120.78.*.94', '106.52.*.89', '111.231.*.107', '118.24.*.62', '148.70.*.63', '148.70.*.60', '111.231.*.17', '47.106.*.61', '120.79.*.160', '129.28.*.20', '111.231.*.3', '148.70.*.253', '172.81.*.107', '148.70.*.153', '159.138.*.249', '106.52.*.13', '120.79.*.179', '132.232.*.142', '148.70.*.172', '47.52.*.7', '47.56.*.79', '47.52.*.12', '47.106.*.228', '49.235.*.60', '118.25.*.231', '47.56.*.200', '129.28.*.232', '148.70.*.118', '132.232.*.200', '47.115.*.109', '132.232.*.151', '119.27.*.59', '118.24.*.174', '150.109.*.245', '121.199.*.19', '120.24.*.142', '123.56.*.32', '106.52.*.173', '49.234.*.154', '111.231.*.188', '49.234.*.28', '118.24.*.91', '62.234.*.15', '122.51.*.94', '62.234.*.93', '115.28.*.174', '47.74.*.185', '47.56.*.130'] }] }}
    }
  },
  mounted() {
    this.$nextTick(() => {
      console.log('--init', this.RESDATA)
      this.formatResponse(this.RESDATA.data)
    })
  },
  methods: {
    formatResponse(response) {
      console.log('--init')
      const { list = [] } = response
      this.list = list
      this.$refs.DmData.init({ total: this.RESDATA.total })
      return response
    },

    async handleSearch(params) {
      const { start_time, end_time, keyword } = params
      this.bindParams.ip_string = keyword
      this.bindParams.start_time = start_time
      this.bindParams.end_time = end_time
      this.$refs.DmData.initPage()
    }
  }
}
</script>
