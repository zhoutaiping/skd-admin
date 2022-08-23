<template>
  <DmToolbar>
    <template slot="right">
      <el-date-picker
        v-model="dateRange"
        :picker-options="pickerOptions"
        type="daterange"
        range-separator="至"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleDateChange"
      />
      <InputSearch
        v-model="params.keyword"
        placeholder="日志关键词"
      />
      <el-button
        type="primary"
        class="btn--search"
        @click="handleSearch"
      >查询</el-button>
      <el-button
        @click="handleClickExport"
      >导出</el-button>
    </template>
  </DmToolbar>
</template>

<script>
export default {
  props: {},

  data() {
    return {
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
