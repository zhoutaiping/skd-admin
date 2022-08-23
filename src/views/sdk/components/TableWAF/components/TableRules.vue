<template>
  <div>
    <DmTable
      :add-button-disabled="list.length === 5"
      add-button
      border
      @click-add-button="handleRowAdd"
    >

      <!-- <template slot="btnAdd">
      <el-tooltip
        :disabled="!containUpstreamStatus"
        content="TCP响应报文大小仅可作为条件组合的最后一个匹配类型"
        placement="top"
      >
        <span>
          <yd-icon name="el-icon-plus" /> 新增
        </span>
      </el-tooltip>
    </template> -->

      <el-table :data="list">
        <el-table-column
          label="匹配类型"
          min-width="120"
        >
          <template slot-scope="scope">
            <ColumnForm
              :ref="`type-${scope.$index}`"
              :model="scope.row"
              :item-rules="rules.type"
              prop="rule_type"
            >
              <yd-form-select
                :disabled="scope.$index !== list.length - 1"
                v-model="scope.row.rule_type"
                :selects="formatTypeSelect(wafRules, scope.row.rule_type)"
                @change="val => handleTypeChange(val, scope.row)"
              />
            </ColumnForm>
          </template>
        </el-table-column>
        <el-table-column
          label="逻辑"
          min-width="80"
        >
          <template slot-scope="scope">
            <yd-form-select
              v-model="scope.row.logic"
              :selects="wafLogicMap[scope.row.rule_type]"
            />
          </template>
        </el-table-column>
        <el-table-column
          label="匹配目标"
          min-width="300"
        >
          <template slot-scope="scope">
            <ColumnForm
              :ref="`data-${scope.$index}`"
              :model="scope.row"
              :item-rules="rulesMap[scope.row.rule_type]"
              prop="data"
            >
              <!-- IP -->
              <template v-if="scope.row.rule_type === 'ip'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="请输入单个 IP 或 IP / 掩码如 (1.1.1.1/24)"
                  placeholder-item="1.1.1.1|2.2.2.0/24"
                >
                  <span slot="tips">（多个 IP 推荐使用 CIDR 格式 1.1.1.1/24)</span>
                </yd-input-multiple>
              </template>
              <!-- 请求端口 -->
              <template v-else-if="scope.row.rule_type === 'target_port'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="请输入端口"
                />
              </template>
              <!-- 访客区域 -->
              <template v-if="scope.row.rule_type === 'region'">
                <InputArea v-model="scope.row.data" />
              </template>
              <!-- 设备指纹 -->
              <template v-if="scope.row.rule_type === 'fingerprint'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="设备指纹"
                  placeholder-item="设备指纹"
                />
              </template>
              <!-- 终端系统 -->
              <template v-if="scope.row.rule_type === 'device_os'">
                <yd-form-select
                  :selects="wafSelects.deviceOS"
                  v-model="scope.row.data"
                  style="width: 100%"
                  multiple
                />
              </template>
              <!-- 终端风险类型 -->
              <template v-if="scope.row.rule_type === 'device_risk'">
                <yd-form-select
                  :selects="wafSelects.deviceRisk"
                  v-model="scope.row.data"
                  style="width: 100%"
                  multiple
                />
              </template>
              <!-- 单设备请求频率 -->
              <template v-if="scope.row.rule_type === 'device_rate_limit'">
                <InputRuleLimit v-model="scope.row.data" />
              </template>
              <!-- CPU架构 -->
              <template v-if="scope.row.rule_type === 'cpu_arch'">
                <yd-form-select
                  :selects="wafSelects.cpuArch"
                  v-model="scope.row.data"
                  style="width: 100%"
                  multiple
                />
              </template>
              <!-- 设备名 -->
              <template v-if="scope.row.rule_type === 'device'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="设备名"
                  placeholder-item="设备名"
                />
              </template>
              <!-- 应用名称 -->
              <template v-if="scope.row.rule_type === 'app_name'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="应用名称"
                  placeholder-item="应用名称"
                />
              </template>
              <!-- 应用签名 -->
              <template v-if="scope.row.rule_type === 'app_sign_hash'">
                <yd-input-multiple
                  v-model="scope.row.data"
                  placeholder="应用签名"
                  placeholder-item="应用签名"
                />
              </template>
            </ColumnForm>
          </template>
        </el-table-column>
        <el-table-column
          align="right"
          label="操作"
          width="80px"
        >
          <template slot-scope="scope">
            <ColumnAction>
              <el-button
                type="text"
                @click="handleRowDelete(scope.$index)"
              >删除</el-button>
            </ColumnAction>
          </template>
        </el-table-column>
      </el-table>
    </DmTable>
  </div>
</template>

<script>
import consoleTable from '@/mixins/consoleTable'
import RULE from '@/utils/verify'
import ColumnForm from '@/components/Column/ColumnForm'
import InputArea from '@/components/Input/InputArea'
import InputRuleLimit from '@/components/Input/InputRuleLimit'
import wafMixins from '@/views/sdk/mixins/waf'

function portVaildate(rule, value, callback) {
  if (typeof value === 'string') {
    value = [value]
  } else {
    if (!value[0]) callback(new Error('请填写'))
  }

  value.forEach(item => {
    if (!RULE.port.test(item)) {
      callback(new Error('端口不正确'))
    }
  })
  callback()
}

function ipVaildate(rule, value, callback) {
  if (typeof value === 'string') {
    value = [value]
  } else {
    if (!value[0]) callback(new Error('请填写 IP'))
  }

  value.forEach(item => {
    if (!RULE.cidrREG.test(item) && !RULE.ipRangeReg.test(item)) {
      callback(new Error('IP 地址不正确'))
    }
  })
  callback()
}

function validateArr(rule, value, callback) {
  if (value.length === 0) {
    callback(new Error(' '))
  } else {
    callback()
  }
}

function validateRegion(rule, value, callback) {
  if (!value || typeof value !== 'object' || value.country.length === 0) {
    callback(new Error(' '))
  } else {
    callback()
  }
}

function validatorNumber(val, min, max) {
  val = parseInt(val)
  if (isNaN(val)) return false
  if (min <= val && val <= max) {
    return true
  } else {
    return false
  }
}

function validateLimit(rule, value, callback) {
  if (!value || (typeof value !== 'object')) {
    callback(new Error(' '))
  } else {
    const { interval, reqs } = value
    if (!validatorNumber(interval, 1, 20) || !validatorNumber(reqs, 1, 1000)) {
      callback(new Error(' '))
    }
    callback()
  }
}

export default {
  components: { ColumnForm, InputArea, InputRuleLimit },

  mixins: [consoleTable, wafMixins],

  data() {
    return {
      selectList: [],
      rowKey: ['type', 'data'],
      rules: {
        type: [{ required: true, trigger: 'blur', message: ' ' }]
      },
      rulesMap: {
        ip: [{ validator: ipVaildate, trigger: 'blur' }],
        target_port: [{ validator: portVaildate, trigger: 'blur' }],
        region: [{ validator: validateRegion, trigger: 'blur' }],
        fingerprint: [{ validator: validateArr, trigger: 'blur' }],
        device_os: [{ validator: validateArr, trigger: 'blur' }],
        device_risk: [{ validator: validateArr, trigger: 'blur' }],
        device_rate_limit: [{ validator: validateLimit, trigger: 'blur' }],
        cpu_arch: [{ validator: validateArr, trigger: 'blur' }],
        device: [{ validator: validateArr, trigger: 'blur' }],
        app_name: [{ validator: validateArr, trigger: 'blur' }],
        app_sign_hash: [{ validator: validateArr, trigger: 'blur' }]
      },
      row: {
        rule_type: '',
        logic: '',
        data: []
      }
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      this.list = []
    },

    formatTypeSelect(list, focus) {
      const selected = this.list.map(_ => _.rule_type)
      list.forEach(_ => {
        _.disabled = selected.includes(_.value)
      })
      return list
    },

    handleTypeChange(type, row) {
      row.logic = this.wafLogicMap[type][0].value

      if (['device_rate_limit'].includes(type)) {
        row.data = {
          reqs: '',
          interval: ''
        }
      } else if (['region'].includes(type)) {
        row.data = {
          country: [],
          province: []
        }
      } else {
        row.data = []
      }
    },

    async setList(list) {
      this.list = list
    },

    async getList() {
      try {
        await this.handleCheckList()
      } catch (e) {
        throw new Error()
      }
      return this.list
    }
  }
}
</script>
