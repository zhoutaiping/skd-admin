<template>
  <div>
    <DmCard>
      <item-number-group>
        <item-number
          v-for="(item, index) in listIndex"
          :loading="loading"
          :key="index"
          :value="item.value"
          :title="item.title"
          :color="item.color"
        />
      </item-number-group>
    </DmCard>
    <DmCard
      title="触发事件"
      style="margin-top: 12px"
    >
      <DmData
        ref="DmData"
        :auto-init="false"
        :loading="loading"
        @init="initPage"
      >
        <DmTable
          :loading="loading"
          min-height
        >
          <el-table
            :data="list"
            @select="handleRowSelect"
            @select-all="handleRowSelect"
          >
            <el-table-column
              type="selection"
              width="55"
            />

            <el-table-column
              min-width="200"
              label="规则ID"
            >
              <template slot-scope="scope">
                <ColumnPopoverRule
                  v-if="!wafLoadingSettings"
                  :id="scope.row.rule_id"
                />
              </template>
            </el-table-column>
            <el-table-column
              label="触发对象"
              prop="access_key"
              min-width="200"
            />
            <el-table-column
              label="套餐"
              prop="package_name"
              min-width="150"
            />
            <el-table-column
              min-width="100"
              label="处置方式"
            >
              <template slot-scope="scope">
                {{ scope.row.action_mode | labelView(ACTION_TYPE) }}
              </template>
            </el-table-column>
            <el-table-column
              label="触发次数"
              prop="rule_num"
              min-width="100"
            />
            <el-table-column
              label="操作"
              align="right"
              width="150"
            >
              <template slot-scope="scope">
                <ColumnAction>
                  <router-link
                    :to="
                      {
                        name: 'taichi-app.router.report__waf__id',
                        params: {id: scope.row.rule_id},
                        query: {
                          start_time: bindParams.start_time,
                          end_time: bindParams.end_time
                        }
                      }
                    ">
                    <el-button type="text">详情</el-button>
                  </router-link>
                </ColumnAction>
              </template>
            </el-table-column>
          </el-table>
        </DmTable>
      </DmData>
    </DmCard>
  </div>
</template>

<script>
import wafMixins from '@/console/taichi-app/mixins/waf'
import ColumnWallRecordActionStatus from '@/components/Column/ColumnWallRecordActionStatus'
import ItemNumber from '@/components/Item/ItemNumber'
import ItemNumberGroup from '@/components/Item/ItemNumberGroup'
import ColumnPopoverRule from './ColumnPopoverRule'
import { vPagination } from '@/utils/array'
// TODO
import { ACTION_TYPE } from '@/constants/cloud-wall'

export default {
  components: { ColumnWallRecordActionStatus, ItemNumberGroup, ItemNumber, ColumnPopoverRule },

  mixins: [wafMixins],

  data() {
    return {
      loading: true,
      ACTION_TYPE,
      API_INDEX: 'V4/firewall.report.sdk.package.block.list',
      bindParams: {},
      selectionId: [],
      list: [],
      listRaw: [],
      listIndex: [
        {
          title: '触发总次数',
          value: 0,
          color: 'primary'
        },
        {
          title: '触发观察次数',
          value: 0,
          color: 'warning'
        },
        {
          title: '触发放行次数',
          value: 0,
          color: 'green'
        },
        {
          title: '触发阻断次数',
          value: 0,
          color: 'danger'
        },
        {
          title: '触发封禁次数',
          value: 0,
          color: 'danger'
        }
      ]
    }
  },

  methods: {
    async init(params) {
      this.loading = true
      this.bindParams = params
      const response = await this.Fetch.get('V4/firewall.report.sdk.package.block.list', params)
      const listIndex = [
        {
          title: '触发总次数',
          value: response.trigger_total,
          color: 'primary'
        },
        {
          title: '触发观察次数',
          value: response.watch_total,
          color: 'warning'
        },
        {
          title: '触发放行次数',
          value: response.pass_total,
          color: 'green'
        },
        {
          title: '触发阻断次数',
          value: response.deny_total,
          color: 'danger'
        },
        {
          title: '触发封禁次数',
          value: response.block_total,
          color: 'danger'
        }
      ]

      this.listRaw = response.list
      this.listIndex = listIndex
      this.$refs.DmData.init({ total: response.total })
      this.initPage({ page: 1, per_page: 10 })
      this.loading = false
    },

    initPage(params) {
      this.list = vPagination(this.listRaw, params.page, params.per_page)
    },

    handleRowSelect(selection) {
      this.selectionId = selection.map(_ => _.id)
    }
  }
}
</script>
