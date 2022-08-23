<template>
  <CardItemForm
    :loading="false"
    is-support
    is-init
    title="设备信誉模型"
  >
    <template slot="tips">
      终端信誉等级识别模型，信誉等级分析结果将应用在资源分配和调度隔离等场景
    </template>
    <DmAlert>
      终端信誉等级分为风险、普通、优质三种类型。平台默认采用智能引擎根据每个设备的多维度信息进行持续性的自动化评级。您也可以根据具体业务情况调整引擎识别阈值，更多配置维度将不断开放
    </DmAlert>
    <DmData
      ref="DmData"
      :show-pagination="false"
      @init="fetchList"
    >
      <DmTable
        :loading="loading"
      >
        <el-table
          :data="list"
        >
          <el-table-column
            label="信誉等级"
            prop="reputation_level_name"
            min-width="150"
          />
          <el-table-column
            label="匹配条件"
            min-width="250"
          >
            <template slot-scope="scope">
              <ColumnRules v-if="scope.row.match_mode === 1" v-model="scope.row.match_terms" />
              <template v-else>
                <span class="color--success">
                  {{ scope.row.match_mode | labelView(DeviceReputation.Mode) }}
                </span>
              </template>
            </template>
          </el-table-column>
          <el-table-column
            label="备注"
            prop="remarks"
            min-width="100"
          />
          <el-table-column
            label="操作"
            align="right"
            min-width="80"
          >
            <template slot-scope="scope">
              <el-button
                type="text"
                @click="$refs.DialogCardDeviceReputation.handleOpen(scope.row)"
              >编辑</el-button>
            </template>
          </el-table-column>
        </el-table>
      </DmTable>
    </DmData>
    <DialogCardDeviceReputation
      ref="DialogCardDeviceReputation"
      @init="fetchList"
    />
  </CardItemForm>
</template>

<script>
import consoleData from '@/mixins/consoleData'
import ColumnRules from './components/ColumnRules'
import DialogCardDeviceReputation from './components/DialogCardDeviceReputation'
import DeviceReputation from '../../../constants/DeviceReputation'

export default {
  components: { ColumnRules, DialogCardDeviceReputation },

  mixins: [consoleData],

  data() {
    return {
      DeviceReputation,
      API_INDEX: 'V4/tjkd.app.package.device.reputation.list',
      bindParams: {
        package_id: this.$route.params.id
      }
    }
  },
  methods: {
    formatResponse(response) {
      delete response._status
      return {
        list: response
      }
    }
  }
}
</script>
