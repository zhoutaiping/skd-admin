<template>
  <span class="right wrapper">
    <el-button v-show="show3h" :type="activeType === '3h' ? 'primary' : ''" @click="handleTypeClick('3h')">最近3小时</el-button>
    <el-button :type="activeType === 'today' ? 'primary' : ''" @click="handleButtonDateToday">今天</el-button>
    <el-button :type="activeType === 'yesterday' ? 'primary' : ''" @click="handleButtonDateYesterday">昨天</el-button>
    <el-button :type="activeType === '7d' ? 'primary' : ''" @click="handleButtonDateSevendays">7天</el-button>
    <el-button v-show="buttonSelfShow" :class="{'active': activeType === 'custom'}" @click="handleButtonDateLogChange">自定义</el-button>
    <span v-show="buttonShow" class="block">
      <span class="demonstration">从</span>
      <el-date-picker v-model="startTimevalue" :picker-options="pickerOptions" type="date" placeholder="选择开始时间" value-format="yyyy-MM-dd" @change="timeSelectStar"/>
      <span class="demonstration">到</span>
      <el-date-picker v-model="endTimevalue" :picker-options="pickerOptions" type="date" placeholder="选择结束时间" value-format="yyyy-MM-dd" @change="timeSelectEnd"/>
      <slot/>
      <el-button :class="{ active: dateStatus[4] }" class="btn--search" @click="handleButtonDateSelfLogChange">查询</el-button>
    </span>
  </span>
</template>

<script>
import moment from 'moment'

export default {
  props: {
    onlyRange: {
      type: Boolean,
      default: false
    },
    show3h: Boolean
  },

  data() {
    return {
      activeType: '',
      startTimevalue: '',
      endTimevalue: '',
      dateStatus: [true, false, false, false, false, false],
      buttonShow: false,
      buttonSelfShow: true,
      start: '',
      end: '',
      pickerOptions: {
        disabledDate(time) {
          return (
            time.getTime() <= Date.now() - 3600 * 1000 * 24 * 30 ||
            time.getTime() >= Date.now()
          )
        }
      }
    }
  },

  mounted() {
    if (this.onlyRange) {
      this.handleButtonDateLogChange()
    }

    if (this.show3h) {
      this.handleTypeClick('3h')
    } else {
      this.handleButtonDateToday()
    }
  },

  methods: {
    handleTypeClick(type) {
      const start = moment().subtract(3, 'hour').format('YYYY-MM-DD HH:mm:ss')
      const end = moment().format('YYYY-MM-DD HH:mm:ss')
      this.buttonShow = false
      this.buttonSelfShow = true
      this.activeType = type
      this.$emit('timevalue', start, end, type)
    },

    init3h() {
      const start = moment().subtract(3, 'hour').format('YYYY-MM-DD HH:mm:ss')
      const end = moment().format('YYYY-MM-DD HH:mm:ss')
      this.$emit('timevalue', start, end, '3h')
    },

    timeSelectStar(timeRange) {
      this.startTimevalue = timeRange
    },
    timeSelectEnd(timeRange) {
      this.endTimevalue = timeRange
    },
    handleButtonDateToday() {
      this.buttonShow = false
      this.buttonSelfShow = true
      this.activeType = 'today'
      const time = moment().format('YYYY-MM-DD hh:mm:ss')
      this.start = time.slice(0, 10) + ' 00:00:00'
      this.end = time.slice(0, 10) + ' 23:59:59'
      this.$emit('timevalue', this.start, this.end, this.activeType)
    },
    handleButtonDateYesterday() {
      this.buttonShow = false
      this.buttonSelfShow = true
      this.activeType = 'yesterday'
      const time = moment()
        .subtract(1, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.start = time.slice(0, 10) + ' 00:00:00'
      this.end = time.slice(0, 10) + ' 23:59:59'
      this.$emit('timevalue', this.start, this.end, this.activeType)
    },
    handleButtonDateSevendays() {
      this.buttonShow = false
      this.buttonSelfShow = true
      this.activeType = '7d'
      const time = moment()
        .subtract(6, 'days')
        .format('YYYY-MM-DD HH:mm:ss')
      this.start = time.slice(0, 10) + ' 00:00:00'
      this.end =
        moment()
          .format('YYYY-MM-DD hh:mm:ss')
          .slice(0, 10) + ' 23:59:59'
      this.$emit('timevalue', this.start, this.end, this.activeType)
    },
    handleButtonDateLogChange() {
      this.buttonShow = true
      this.buttonSelfShow = false
      this.activeType = 'custom'
      this.startTimevalue = ''
      this.endTimevalue = ''
    },
    handleButtonDateSelfLogChange() {
      if (this.startTimevalue === '') {
        this.$message({
          showClose: true,
          message: '开始时间不能为空！',
          type: 'error'
        })
        return false
      } else if (this.endTimevalue === '') {
        this.$message({
          showClose: true,
          message: '结束时间不能为空！',
          type: 'error'
        })
        return false
      } else if (this.startTimevalue > this.endTimevalue) {
        this.$message({
          showClose: true,
          message: '开始时间不能大于结束时间！',
          type: 'error'
        })
        return false
      } else {
        this.buttonShow = false
        this.buttonSelfShow = true
        this.activeType = 'custom'
        this.startTimevalue = this.startTimevalue + ' 00:00:00'
        this.endTimevalue = this.endTimevalue + ' 23:59:59'
        this.$emit('timevalue', this.startTimevalue, this.endTimevalue, this.activeType)
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.btn--search {
  margin-left: 6px;
}
.demonstration {
  padding-left: 6px;
}
.right {
  float: right;
}
.wrapper {
  position: relative;
  z-index: 99;
}
.el-date-editor {
  margin-left: 6px;
}
</style>
