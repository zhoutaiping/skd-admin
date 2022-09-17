<template>
  <div title="规则详情">
    <DmToolbar>
      <router-link to="/report/waf">
        <el-button>返回</el-button>
      </router-link>
      <toolbar-wall-dashboard-detail
        slot="right"
        :type="params.type"
        @init="init"
      />
    </DmToolbar>
    <dm-data
      ref="dmData"
      @init="initPage"
    >
      <template
        v-if="showAll"
        slot="pagination-desc"
      >
        共 {{ totalRaw }} 条记录（最多显示 3,000 条记录）
      </template>
      <DmTable
        :loading="loading"
        min-height
      >
        <el-table :data="list">
          <el-table-column
            min-width="150"
            label="访问时间"
            prop="timestamp"
          />
          <el-table-column
            min-width="200"
            label="访客IP"
          >
            <template slot-scope="scope">
              {{ scope.row.remote_addr }}[{{ scope.row.remote_addr_region }}]
            </template>
          </el-table-column>
          <el-table-column
            min-width="250"
            label="设备指纹"
            prop="fingerprint"
          />
          <el-table-column
            min-width="100"
            label="终端类型"
            prop="platform"
          />
          <el-table-column
            min-width="100"
            label="终端风险类型"
          >
            <template slot-scope="scope">
              {{ scope.row.risk_type || '-' }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="100"
            label="处置动作"
          >
            <template slot-scope="scope">
              {{ scope.row.action_mode | labelView(ACTION_TYPE) }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="200"
            align="right"
            label="规则ID"
          >
            <template slot-scope="scope">
              <ColumnPopoverRule
                v-if="!wafLoadingSettings"
                :id="scope.row.rule_id"
              />
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </dm-data>
  </div>
</template>

<script>
import { vPagination } from '@/utils/array'
import ColumnRuleTirggerStatus from '@/components/Column/ColumnRuleTirggerStatus'
import DateSelection from '@/components/DateSelect/date-selection'
import ToolbarWallDashboardDetail from './components/ToolbarWallDashboardDetail'
import PopoverEllipsis from '@/components/Popover/PopoverEllipsis'
import ColumnWallRecordActionStatus from '@/components/Column/ColumnWallRecordActionStatus'
// TODO
import { ACTION_TYPE } from '@/constants/cloud-wall'
import ColumnPopoverRule from './components/ColumnPopoverRule'
import wafMixins from '@/console/taichi-app/mixins/waf'

export default {
  components: { ColumnRuleTirggerStatus, DateSelection, ToolbarWallDashboardDetail, PopoverEllipsis, ColumnWallRecordActionStatus, ColumnPopoverRule },

  mixins: [wafMixins],

  data() {
    return {
      ACTION_TYPE,
      loading: false,
      params: {},
      dateRange: [],
      list: [],
      listRaw: [],
      type: null,
      showAll: false,
      totalRaw: 0
    }
  },

  created() {
    const { start_time, end_time } = this.$route.query
    const { id: rule_id } = this.$route.params

    const params = {
      rule_id,
      start_time,
      end_time
    }
    this.params = params
  },

  methods: {
    initPage(params) {
      this.list = vPagination(this.listRaw, params.page, params.per_page)
    },

    async init(params = {}) {
      this.loading = true
      const { rule_id, type, start_time, end_time } = this.params

      Object.assign(params, {
        rule_id,
        type,
        start_time,
        end_time
      })

      const data = await this.Fetch.get('V4/firewall.report.sdk.package.block.details', params)
      const { list = [], total, page_total: totalRaw } = data

      this.totalRaw = totalRaw
      this.listRaw = list
      this.showAll = total < totalRaw
      this.$refs.dmData.init({ total })

      this.initPage({ page: 1, per_page: 10 })
      this.loading = false
    }
  }
}
</script>
