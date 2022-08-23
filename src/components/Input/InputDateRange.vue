<template>
  <el-date-picker
    v-model="val"
    :format="format"
    :value-format="format"
    type="datetimerange"
    range-separator="-"
    start-placeholder="开始日期"
    end-placeholder="结束日期"
    @change="handleChange"
  />
</template>

<script>
import { isEqual } from '@/utils/util'

export default {
  props: {
    value: Object,
    format: {
      type: String,
      default: 'yyyy-MM-dd HH:mm:ss'
    }
  },

  data() {
    return {
      val: []
    }
  },

  watch: {
    value(value, val) {
      if (!isEqual(value, val)) this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const value = this.value
      if (typeof value === 'object' && value.start_time && value.end_time) {
        const { start_time, end_time } = value
        this.val = [start_time, end_time]
      } else {
        this.val = []
      }
    },

    handleChange(val) {
      const [start_time, end_time] = val
      this.$emit('input', {
        start_time,
        end_time
      })
    }
  }
}
</script>
