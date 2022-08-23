<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    width="800px"
    aside
    title="编辑"
    @submit="handleSubmit"
  >
    <DmAlert>
      1. 优质：建议总在线时长大于48小时，APP启动次数大于50次<br>
      2. 普通：建议总在线时长大于8小时，APP启动次数大于20次<br>
      3. 风险：建议总在线时长小于8小时，APP启动次数小于20次
    </DmAlert>
    <el-form
      :model="form"
      label-position="left"
      label-width="120px"
    >
      <el-form-item label="模式">
        <yd-form-radio-button
          :radios="DeviceReputation.Mode"
          v-model="form.match_mode"
        />
      </el-form-item>
      <el-form-item
        v-if="form.match_mode === 1"
        label="备注"
        prop="remarks"
      >
        <el-input
          v-model="form.remarks"
          placeholder="备注"
          style="width: 280px"
          type="textarea"
        />
      </el-form-item>
    </el-form>
    <el-form
      v-show="form.match_mode === 1"
      label-position="top"
    >
      <el-form-item label="匹配条件">
        <DmTable
          :add-button-disabled="list.length === 3"
          border
          add-button
          @click-add-button="handleRowAdd"
        >
          <el-table :data="list">
            <el-table-column
              label="匹配类型"
              min-width="100"
            >
              <template slot-scope="scope">
                <ColumnForm
                  :ref="`type-${scope.$index}`"
                  :model="scope.row"
                  :item-rules="formRules.type"
                  prop="type"
                >
                  <yd-form-select
                    :disabled="scope.$index !== list.length - 1"
                    :selects="selectOptionsDisabled(DeviceReputation.MatchType, list.map(_=>_.type))"
                    v-model="scope.row.type"
                    @change="val => handleChangeType(val, scope.row)"
                  />
                </ColumnForm>
              </template>
            </el-table-column>
            <el-table-column
              label="逻辑"
              min-width="80"
            >
              <template slot-scope="scope">
                <ColumnForm
                  :ref="`logic-${scope.$index}`"
                  :model="scope.row"
                  :item-rules="formRules.logic"
                  prop="logic"
                >
                  <yd-form-select
                    v-if="scope.row.type"
                    :selects="selectExport(DeviceReputation.Logic, mathTypeMap[scope.row.type].logic)"
                    v-model="scope.row.logic"
                  />
                </ColumnForm>
              </template>
            </el-table-column>
            <el-table-column
              label="匹配目标"
              min-width="280"
            >
              <template slot-scope="scope">
                <template v-if="scope.row.type === 'total_online_time'">
                  <ColumnForm
                    :ref="`data-${scope.$index}`"
                    :model="scope.row"
                    :item-rules="formRules.data"
                    prop="data.value"
                  >
                    <el-input v-model="scope.row.data.value">
                      <yd-form-select
                        slot="append"
                        :selects="DeviceReputation.TimeUnit"
                        v-model="scope.row.data.unit"
                        style="width: 100px"
                      />
                    </el-input>
                  </ColumnForm>
                </template>
                <template v-else-if="scope.row.type === 'app_start_times'">
                  <el-input-number
                    :min="1"
                    v-model="scope.row.data.value"
                    controls-position="right"
                  />
                  <span style="margin-left: 8px">次</span>
                </template>
                <template v-else-if="scope.row.type === 'online_time_rang'">
                  <ColumnForm
                    :ref="`data-${scope.$index}`"
                    :model="scope.row"
                    :item-rules="formRules.online_time_rang"
                    prop="data"
                  >
                    <InputTimeRange v-model="scope.row.data" />
                  </ColumnForm>
                </template>
              </template>
            </el-table-column>
            <el-table-column
              label="操作"
              width="80"
              align="right"
            >
              <template slot-scope="scope">
                <el-button
                  type="text"
                  @click="handleRowDelete(scope.$index)"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </DmTable>
      </el-form-item>
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog'
import InputTimeRange from '@/components/Input/InputTimeRange'
import { selectExport, selectOptionsDisabled } from '@/utils/form'
import ColumnForm from '@/components/Column/ColumnForm'
import consoleTable from '@/mixins/consoleTable'
import DeviceReputation from '../../../../constants/DeviceReputation'

function validatorDateRange(rule, value, callback) {
  if (!value) callback()

  if (value && value.start_time && value.end_time) {
    callback()
  } else {
    callback(new Error(' '))
  }
}

export default createDialog({
  components: { InputTimeRange, ColumnForm },

  mixins: [consoleTable],

  data() {
    return {
      DeviceReputation,
      selectExport,
      selectOptionsDisabled,
      list: [],
      row: {
        type: '',
        logic: '',
        data: {}
      },
      mathTypeMap: {},
      rowKey: ['type', 'logic', 'data'],
      formDefault: {
        match_mode: 0,
        remarks: ''
      },
      formRules: {
        type: { required: true, message: ' ' },
        logic: { required: true, message: ' ' },
        data: { required: true, message: ' ' },
        online_time_rang: { validator: validatorDateRange, required: true, message: ' ' }
      }
    }
  },

  created() {
    const mathTypeMap = {}
    DeviceReputation.MatchType.forEach(item => {
      mathTypeMap[item.value] = item
    })
    this.mathTypeMap = mathTypeMap
  },

  methods: {
    handleChangeType(val, row) {
      if (val === 'total_online_time') {
        row.data = {
          value: '',
          unit: 'minute'
        }
      } else if (val === 'online_time_rang') {
        row.data = {
          start_time: '',
          end_time: ''
        }
      } else if (val === 'app_start_times') {
        row.data = {
          value: ''
        }
      }
      row.logic = ''
    },

    initOptions(form, options) {
      this.setList(form.match_terms)
    },

    handleRowDelete(index) {
      this.list.splice(index, 1)
    },

    async getList() {
      await this.handleCheckList()
      const data = { }
      this.list.forEach(item => {
        if (item.type) {
          data[item.type] = {
            logic: item.logic,
            ...item.data
          }
        }
      })
      return data
    },

    setList(data) {
      const list = []
      Object.keys(data).forEach(type => {
        if (!type) return
        const item = data[type]
        list.push({
          type,
          logic: item.logic,
          data: {
            value: item.value,
            unit: item.unit,
            start_time: item.start_time,
            end_time: item.end_time
          }
        })
      })

      this.list = list
    },

    async fetchSubmit() {
      const form = {
        ...this.form,
        package_id: this.$route.params.id,
        match_terms: await this.getList()
      }

      if (Number(form.match_mode) === 0) {
        delete form.remarks
      }
      await this.Fetch.post(`V4/tjkd.app.package.save.device.reputation`, form)
    },

    async handleSubmit(form) {
      this.Message('ACTION_SUCCESS')
      this.$emit('init')
      this.handleClose()
    }
  }
})
</script>
