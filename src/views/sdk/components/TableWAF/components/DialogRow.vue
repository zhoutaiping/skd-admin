<template>
  <DmDialog
    ref="Dialog"
    :fetch-submit="fetchSubmit"
    :mode="mode"
    width="800px"
    aside
    title-label="规则"
    @submit="handleSubmit"
  >
    <DmAlert>
      1. 同一条规则中多个匹配条件为 “与” 逻辑，即必须多个条件同时满足才算匹配中规则<br>
      2. 匹配目标具有多个时，用 “|” 隔开<br>
      3. 同一条规则最多 5个 匹配条件组合<br>
    </DmAlert>
    <el-form
      :model="form"
      label-position="top"
    >
      <el-form-item label="匹配条件">
        <TableRules ref="TableRules"/>
      </el-form-item>
      <el-form-item
        label="处置方式"
        prop="title"
      >
        <yd-form-radio
          v-model="form.action"
          :radios="actionType"
        />
      </el-form-item>
      <el-form-item v-if="form.action === 'block'">
        <el-form-item
          v-if="form.action_data.time_unit === 'second'"
          prop="interval"
          style="display: inline-block;"
        >
          <el-input-number
            v-model="form.action_data.interval"
            :min="0"
            :max="3600"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item
          v-if="form.action_data.time_unit === 'minute'"
          prop="interval"
          style="display: inline-block;"
        >
          <el-input-number
            v-model="form.action_data.interval"
            :min="0"
            :max="60"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item
          v-if="form.action_data.time_unit === 'hour'"
          prop="interval"
          style="display: inline-block;"
        >
          <el-input-number
            v-model="form.action_data.interval"
            :min="0"
            :max="24"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item
          v-if="form.action_data.time_unit === 'day'"
          prop="interval"
          style="display: inline-block;"
        >
          <el-input-number
            v-model="form.action_data.interval"
            :min="0"
            :max="7"
            controls-position="right"
          />
        </el-form-item>
        <yd-form-select
          v-model="form.action_data.time_unit"
          :selects="timeType"
          style="margin-left: 12px; width: 80px"
        />
      </el-form-item>
    </el-form>
  </DmDialog>
</template>

<script>
import createDialog from '@/utils/createDialog'
import TableRules from './TableRules'

const actionType = [
  {
    label: '观察',
    value: 'watch'
  },
  {
    label: '放行',
    value: 'pass'
  },
  {
    label: '阻断',
    value: 'deny'
  },
  {
    label: '封禁',
    value: 'block'
  }
]

export default createDialog({
  components: { TableRules },

  data() {
    return {
      id: '',
      actionType,
      mode: 'Create',
      timeType: [
        {
          label: '秒',
          value: 'second'
        },
        {
          label: '分钟',
          value: 'minute'
        },
        {
          label: '小时',
          value: 'hour'
        },
        {
          label: '天',
          value: 'day'
        }
      ],
      formDefault: {
        action: 'watch',
        action_data: {
          time_unit: 'second',
          interval: 0
        }
      }
    }
  },

  methods: {
    initOptions(form, options) {
      if (!form.action_data || !form.action_data.time_unit) {
        this.form.action_data = {
          time_unit: 'second',
          interval: 0
        }
      }
      this.mode = form.id ? 'Edit' : 'Create'
      if (this.mode === 'Edit') {
        this.id = form.id

        const rules = Array.isArray(form.rules) ? form.rules : []
        this.$refs.TableRules.setList(rules)
      } else {
        this.id = ''
        this.$refs.TableRules.setList([])
      }
    },

    async fetchSubmit() {
      const rules = await this.$refs.TableRules.getList()
      if (rules.length === 0) {
        this.$message.warning('至少添加一条规则')
        throw new Error()
      }
      const form = {
        tjkd_app_id: this.$route.params.id,
        rules,
        type: 'app',
        ...this.form
      }
      try {
        if (this.mode === 'Create') {
          await this.Fetch.post('V4/firewall.policy.save', form)
        } else {
          form.id = this.id
          await this.Fetch.post(`V4/firewall.policy.save`, form)
        }
      } catch (e) {
        throw new Error()
      }
    },

    async handleSubmit(form) {
      this.Message('ACTION_SUCCESS')
      this.$emit('init')
      this.handleClose()
    }
  }
})
</script>
