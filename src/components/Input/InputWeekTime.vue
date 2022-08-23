<template>
  <span>
    <el-form-item
      style="display:inline-block; width: 195px;"
      prop="weeks"
      class="hide-error"
    >
      <yd-input-checkbox
        v-model="weeks"
        :checks="WEEKS_LIST"
        indeterminate
        popover-width="100"
        placeholder="选择星期时间范围"
        style="margin-right: 12px"
      />
    </el-form-item>
    <el-form-item
      style="display:inline-block; width: 130px;"
      prop="req_time"
      class="hide-error"
    >
      <el-time-picker
        v-model="req_time"
        :picker-options="{format: 'HH:mm'}"
        style="width: 130px;"
        is-range
        value-format="HH:mm"
        placeholder="选择时间"
        @change="handleChange"
      />
    </el-form-item>
  </span>
</template>

<script>
const WEEKS_LIST = [
  {
    label: '周一',
    value: 1
  },
  {
    label: '周二',
    value: 2
  },
  {
    label: '周三',
    value: 3
  },
  {
    label: '周四',
    value: 4
  },
  {
    label: '周五',
    value: 5
  },
  {
    label: '周六',
    value: 6
  },
  {
    label: '周日',
    value: 0
  }
]

export default {
  name: 'InputWeekTime',

  props: {
    value: {
      type: [Array, Object, String]
    }
  },

  data() {
    return {
      WEEKS_LIST,
      weeks: [],
      req_time: ''
    }
  },

  watch: {
    value() {
      this.init()
    },

    weeks() {
      this.handleChange()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const value = this.value
      if (this.value instanceof Object) {
        const { weeks = [], startTime = '', endTime = '' } = value
        this.weeks = weeks
        this.req_time = [startTime, endTime]
      } else {
        this.weeeks = []
        this.req_time = ''
      }
    },

    handleChange() {
      const [startTime, endTime] = this.req_time
      this.$emit('input', {
        weeks: this.weeks,
        startTime,
        endTime
      })
    }
  }
}
</script>
