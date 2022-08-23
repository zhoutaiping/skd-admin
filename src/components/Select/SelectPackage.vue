<template>
  <yd-form-select
    :selects="list"
    v-model="value"
    default-text="所有套餐"
    filterable
    @change="handleClick"
  />
</template>

<script>
import Cloudsafe from '@/api/cloudsafe'

export default {
  props: {
    value: [String, Number]
  },

  data() {
    return {
      list: [],
      loading: true
    }
  },

  created() {
    this.init()
  },

  methods: {
    async handleShow() {
      //
    },

    async init() {
      const params = {
        per_page: 1000
      }
      this.loading = true
      const { list = [] } = await Cloudsafe.hwwsPackageList(params)
      const nList = []
      list.forEach(item => {
        const { plan_diy_name, id: value, rule_nums_remain, rule_nums } = item
        const sub = rule_nums.rule_number_total_domain - rule_nums_remain.rule_number_total_domain

        let label = plan_diy_name
        if (this.showNum) {
          label = sub > 0 ? `${label}（${sub}）` : plan_diy_name
        }

        nList.push({ label, value })
      })

      this.list = nList
      this.loading = false
    },

    handleClick(value) {
      this.$emit('change', value)
      this.$emit('input', value)
    }
  }
}
</script>
