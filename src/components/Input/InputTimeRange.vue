<template>
  <el-time-picker
    v-model="val"
    :value-format="format"
    :picker-options="{format: format}"
    is-range
    range-separator="至"
    start-placeholder="开始时间"
    end-placeholder="结束时间"
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
      default: 'HH:mm:ss'
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
        this.val = ['', '']
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
