<style lang="scss">
.toolbar-wall-log {
  .full-right {
    float: right;
    .wrapper {
      float: none;
    }
  }
  .input--search {
    width: 180px;
    margin-left: 6px;
  }
  .btn--export,
  .btn--search {
    margin-left: 6px !important;
  }
}
</style>
<template>
  <div class="toolbar-wall-log">
    <div class="full-right">
      <el-date-picker
        v-model="dateRange"
        :picker-options="pickerOptions"
        type="daterange"
        unlink-panels
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleDateChange"
      />
      <el-input
        v-model="params.keyword"
        class="input--search"
        placeholder="日志关键词"
        icon="search"
      />
      <el-button
        type="primary"
        class="btn--search"
        @click="handleSearch"
      >查询</el-button>
      <el-button
        v-if="showExport"
        class="btn--export"
        @click="handleClickExport"
      >导出</el-button>
    </div>
  </div>
</template>

<script>
import DateSelection from '@/components/DateSelect/date-selection'
import { ACTION_TYPE } from '@/constants/cloud-wall'

export default {

  components: { DateSelection },
  props: {
    showExport: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      ACTION_TYPE,
      dateRange: '',
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
            time.getTime() >= Date.now()
          )
        }
      },
      params: {
        start_time: '',
        end_time: '',
        keyword: ''
      }
    }
  },

  mounted() {
    this.$emit('init', this.params)
  },

  methods: {
    init() {
      this.dateRange = ''
      this.params.start_time = ''
      this.params.end_time = ''
      this.params.keyword = ''
    },
    emitInit() {
      this.$emit('init', this.params)
    },
    handleChange() {
      this.emitInit()
    },
    getParams() {
      return this.params
    },
    handleSearch() {
      this.$emit('init', this.params)
    },
    handleDateChange(val) {
      val = val.split(' - ')
      const [start_time, end_time] = val
      if (start_time && end_time) {
        this.params.start_time = start_time + ' 00:00:00'
        this.params.end_time = end_time + ' 23:59:59'
      }
      this.$emit('init', this.params)
    },
    handleClickExport() {
      this.$emit('click-export', this.params)
    }
  }
}
</script>
