<template>
  <div>
    <DmToolbar>
      <el-button
        type="primary"
        @click="$refs.DialogRow.handleOpen()"
      >新增规则</el-button>
      <el-button
        :disabled="selectionId.length === 0"
        @click="handleAction('stop')"
      >暂停</el-button>
      <el-button
        :disabled="selectionId.length === 0"
        @click="handleAction('open')"
      >启用</el-button>
      <el-button
        :disabled="selectionId.length === 0"
        @click="handleAction('delete')"
      >删除</el-button>
    </DmToolbar>
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
          @select="handleRowSelect"
          @select-all="handleRowSelect"
        >
          <el-table-column
            type="selection"
            width="55"
          />
          <el-table-column
            label="规则ID/创建时间"
            min-width="200"
          >
            <template slot-scope="scope">
              {{ scope.row.code }}<br>
              {{ scope.row.create_at }}
            </template>
          </el-table-column>
          <el-table-column
            min-width="300"
            label="匹配条件"
            prop="active"
          >
            <template slot-scope="scope">
              <ColumnRules :items="scope.row.rules" />
            </template>
          </el-table-column>
          <el-table-column
            label="处置方式"
            min-width="110"
          >
            <template slot-scope="scope">
              <ColumnRulesAction :data="scope.row" />
            </template>
          </el-table-column>
          <el-table-column
            min-width="80"
            label="备注"
          >
            <template slot-scope="scope">
              <ColumnRemark
                :row="scope.row"
                @submit="handleSubmitRemark"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="状态"
            min-width="100"
          >
            <template slot-scope="scope">
              <ColumnRulesStatus :data="scope.row" />
            </template>
          </el-table-column>
          <el-table-column
            label="优先级"
            min-width="100"
          >
            <template slot-scope="scope">
              <ColumnBtnSort
                :disabled="scope.row.disabled"
                :disabled-up="scope.$index === 0"
                :disabled-down="scope.$index === list.length - 1"
                type="text"
                @on-set-down="handleRuleSort(scope.$index, 'set-down')"
                @on-down="handleRuleSort(scope.$index, 'down')"
                @on-up="handleRuleSort(scope.$index, 'up')"
                @on-set-up="handleRuleSort(scope.$index, 'set-up')"
              />
            </template>
          </el-table-column>
          <el-table-column
            label="操作"
            align="right"
            width="200"
          >
            <template slot-scope="scope">
              <ColumnAction>
                <el-button
                  type="text"
                  @click="$refs.DialogRow.handleOpen(scope.row)"
                >编辑</el-button>
                <el-button
                  type="text"
                  @click="$refs.DialogLog.handleOpen(scope.row)"
                >修改记录</el-button>
                <router-link
                  :to="{
                    name: 'taichi-app.router.report__waf',
                    query: {
                      rule_id: scope.row.code
                    }
                  }"
                >
                  <el-button
                    type="text"
                  >匹配记录</el-button>
                </router-link>
              </ColumnAction>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <DialogRow
      ref="DialogRow"
      @init="fetchList"
    />
    <DialogLog ref="DialogLog" />
  </div>
</template>

<script>
import consoleData from '@/mixins/consoleData'
import wafMixins from '@/views/sdk/mixins/waf'
import ColumnBtnSort from '@/components/Column/ColumnBtnSort'
import ColumnRulesStatus from '@/components/Column/ColumnRulesStatus'
import ColumnRemark from '@/components/Column/ColumnRemark'
import ColumnRulesAction from '@/components/Column/ColumnRulesAction'
import { arrToSortObj } from '@/utils/array'
import DialogRow from './components/DialogRow'
import DialogLog from './components/DialogLog'
import ColumnRules from './components/ColumnRules'

export default {
  components: { DialogRow, DialogLog, ColumnBtnSort, ColumnRulesStatus, ColumnRulesAction, ColumnRemark, ColumnRules },

  mixins: [consoleData, wafMixins],

  data() {
    return {
      API_INDEX: 'V4/firewall.policy.get_tjkdappid',
      bindParams: {
        tjkd_app_id: this.$route.params.id
      },
      selectionId: []
    }
  },

  methods: {
    formatResponse(response) {
      return response
    },

    async handleAction(type) {
      this.$confirm('确认操作?', '提示', {
        type: 'warning'
      }).then(async() => {
        if (type === 'open') {
          await this.Fetch.post('V4/firewall.policy.open', { ids: this.selectionId })
        } else if (type === 'stop') {
          await this.Fetch.post('V4/firewall.policy.stop', { ids: this.selectionId })
        } else if (type === 'delete') {
          await this.Fetch.post('V4/firewall.policy.delete', { ids: this.selectionId })
        }
        this.$message.success('操作成功')
        this.fetchList()
      })
    },
    // 提交备注编辑
    async handleSubmitRemark(data) {
      if (data.remark.length > 255) {
        this.$message.warning('备注内容过长, 最长支持255字节')
        return
      }
      try {
        data.tjkd_app_id = this.$route.params.id
        await this.Fetch.post('/V4/firewall.policy.save', data)
      } catch (e) {
        return
      }
      this.$message.success('编辑成功')
      this.fetchList()
    },
    // 排序
    async handleRuleSort(index, type) {
      this.loading = true
      const list = this.list.map(item => item.id)
      const item = list.splice(index, 1)[0]

      if (type === 'up') {
        if (index === 0) { // 置顶
          list.unshift(item)
        } else { // 上移
          list.splice(index - 1, 0, item)
        }
      }
      if (type === 'down') {
        if (index === list.length - 1) { // 置底
          list.push(item)
        } else {
          list.splice(index + 1, 0, item)
        }
      }
      if (type === 'set-up') {
        list.unshift(item)
      }
      if (type === 'set-down') {
        list.push(item)
      }

      const arg = arrToSortObj(list)

      try {
        await this.Fetch.post('/V4/firewall.policy.sort', { new_sorts: arg })
      } catch (e) {
        return
      } finally {
        this.loading = false
      }
      this.$message.success('操作成功')
      this.fetchList()
    },

    handleRowSelect(selection) {
      this.selectionId = selection.map(_ => _.id)
    }
  }
}
</script>
