<template>
  <DmToolbar>
    <template slot="right">
      <el-date-picker
        v-model="dateRange"
        :picker-options="pickerOptions"
        type="daterange"
        value-format="yyyy-MM-dd"
        start-placeholder="开始日期"
        end-placeholder="结束日期"
        @change="handleDateChange"
      />
      <slot />
      <el-input
        v-if="showKeyword"
        v-model="params.keyword"
        :placeholder="placeholder"
        style="width: 180px"
        clearable
        @keyup.enter.native="handleSearch"
      />
      <el-button
        type="primary"
        @click="handleSearch"
      >查询</el-button>
      <el-button
        v-if="showExport"
        type="default"
        @click="handleExport"
      >导出</el-button>
    </template>
  </DmToolbar>
</template>

<script>
export default {
  props: {
    showExport: Boolean,
    showKeyword: {
      type: Boolean,
      default: true
    },
    placeholder: {
      type: String,
      default: '日志关键词'
    }
  },

  data() {
    return {
      dateRange: '',
      pickerOptions: {
        disabledDate(time) {
          return (
            // time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
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

  methods: {
    handleExport() {
      this.$emit('click-export', this.params)
    },

    handleSearch() {
      this.$emit('submit', this.params)
    },

    handleDateChange(val) {
      const params = this.params
      if (val && val.length) {
        const [start_time, end_time] = val
        if (start_time && end_time) {
          params.start_time = start_time + ' 00:00:00'
          params.end_time = end_time + ' 23:59:59'
        }
      } else {
        params.start_time = ''
        params.end_time = ''
      }
    },

    handleClickExport() {
      this.$emit('export', this.params)
    }
  }
}
</script>
