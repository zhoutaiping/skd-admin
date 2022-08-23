<template>
  <div>
    <el-form
      ref="Form"
      :model="form"
      label-position="top"
    >
      <el-form-item>
        <template slot="label">
          处置方式
        </template>
        <yd-form-radio
          v-model="form.action"
          :radios="wafSelects.actionTypeSDK"
        />
      </el-form-item>
      <!-- 封禁 -->
      <el-form-item v-if="form.action === 'block'">
        <el-form-item
          v-if="form.action_data.time_unit === 'second'"
          prop="interval"
          style="display: inline-block;"
        >
          <el-input-number
            v-model="form.action_data.interval"
            :min="1"
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
            :min="1"
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
            :min="1"
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
            :min="1"
            :max="7"
            controls-position="right"
          />
        </el-form-item>
        <yd-form-select
          v-model="form.action_data.time_unit"
          :selects="wafSelects.timeType"
          style="margin-left: 12px; width: 80px"
        />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import wafMixins from '@/views/sdk/mixins/waf'
import deepmerge from 'deepmerge'

export default {
  mixins: [wafMixins],

  data() {
    return {
      form: {},
      formDefault: {
        action: 'watch',
        action_data: {
          time_unit: 'second',
          interval: ''
        }
      }
    }
  },

  created() {
    this.setForm()
  },

  methods: {
    setForm(form = {}) {
      this.$nextTick(() => {
        this.$refs.Form.clearValidate()
      })
      this.form = deepmerge(this.formDefault, form)
    },

    getForm() {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error()
      })
      return this.form
    }
  }
}
</script>
