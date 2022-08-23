<template>
  <el-form-item
    label="消息接收人"
    prop="alert_receivers"
  >
    <SelectMultiple
      v-model="form.alert_receivers"
      :checks="selectNumber"
      :default-check="false"
      width="300px"
      item-name="用户"
    />
  </el-form-item>
</template>

<script>
import SelectMultiple from '@/components/Select/SelectMultiple'

export default {
  components: { SelectMultiple },

  props: {},

  data() {
    return {
      selectNumber: [],
      NOTICE_TYPE: [
        {
          label: '短信',
          value: 1
        },
        {
          label: '邮件',
          value: 0
        }
      ],
      form: {
        alert_type: [],
        alert_receivers: []
      }
    }
  },

  computed: {},

  created() {
    this.init()
  },

  methods: {
    getForm() {
      return this.form
    },

    setForm(form) {
      Object.assign(this.form, form)
    },

    resetForm() {
      this.form.alert_type = []
      this.form.alert_receivers = []
    },

    async init() {
      const data = await this.Fetch.get('V4/cloud.monitor.alertSetting.config')
      this.selectNumber = data.receivers_list.map(_ => {
        return {
          value: _.value,
          label: _.name
        }
      })
    }
  }
}
</script>
