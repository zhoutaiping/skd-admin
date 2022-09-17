<template>
  <DmToolbar>
    <yd-form-select
      :selects="selectPackages"
      v-model="params.package_id"
      style="width: 220px"
      @change="handleUpdate"
    />
    <InputSearch
      v-if="showRuleId"
      v-model="params.rule_id"
      style="width: 240px"
      placeholder="规则ID"
      @submit="handleUpdate"
    />
    <template slot="right">
      <DateSelection @change="handleTimeChange" />
    </template>
  </DmToolbar>
</template>

<script>
import DateSelection from '@/components/DateSelect/DateSelection'
import packageMixins from '../../../mixins/packages'

export default {
  components: { DateSelection },

  mixins: [packageMixins],

  props: {
    showRuleId: Boolean
  },

  data() {
    return {
      params: {
        rule_id: '',
        package_id: '',
        start_time: '',
        end_time: ''
      },
      selectPackages: []
    }
  },

  created() {
    this.params.rule_id = this.$route.query.rule_id
    this.init()
  },

  methods: {
    handleTimeChange(startTime, endTime) {
      this.params.start_time = startTime
      this.params.end_time = endTime
      this.handleUpdate()
    },

    handleUpdate() {
      this.$emit('change', this.params)
    },

    init() {
      this.selectPackages = this.packageList.map(_ => {
        return {
          label: _.package_name,
          value: _.id
        }
      })
      this.params.package_id = this.selectPackages[0].value
    }
  }
}
</script>
