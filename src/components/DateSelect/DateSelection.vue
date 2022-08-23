<style lang="scss">
.DateSelection {
  position: relative;
  vertical-align: top;

  .rangePicker {
    top: 50px;
    bottom: 0px;
    position: absolute;
    overflow: hidden;
  }
  .button {
    &Back {
      margin-right: -1px;
    }
    &RangePicker {
      width: 280px;
      .ant-input {
        border-radius: 0px 3px 3px 0;
      }
    }
  }
}
</style>

<template>
  <el-radio-group
    :class="b()"
    v-model="selectType"
    @change="handleClick"
  >
    <template v-if="customPopover">
      <el-button-group>
        <el-button
          class="buttonBack"
          icon="el-icon-back"
          @click="handleClickBack"
        />

        <a-range-picker
          :show-time="{
            hideDisabledOptions: true,
          }"
          :disabled-date="disabledDate"
          :locale="locale"
          :format="customSecound ? 'YYYY-MM-DD HH:mm:ss' : 'YYYY-MM-DD'"
          @ok="handleSelectDateRange"
          @openChange="onOpenChange"
          @calendarChange="calendarChange"
        >
          <template
            slot="monthCellContentRender"
            slot-scope="date"
          >
            {{ `${moment(date).format('M')}月` }}
          </template>
        </a-range-picker>
      </el-button-group>
    </template>
    <template v-else>
      <el-radio-button
        v-if="show3h"
        label="3h"
      >3小时</el-radio-button>
      <el-radio-button label="today">今天</el-radio-button>
      <el-radio-button label="yesterday">昨天</el-radio-button>
      <el-radio-button label="7d">7天</el-radio-button>
      <el-radio-button
        v-show="!AccurateAccessControl"
        label="30d"
      >30天</el-radio-button>
      <el-radio-button label="custom">自定义</el-radio-button>
    </template>
  </el-radio-group>
</template>

<script>
import create from '@/utils/create-basic'
import moment from 'moment'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

const DATE_FORMAT = 'YYYY-MM-DD'

function formatTime(startDate, endDate) {
  const startTime = `${startDate} 00:00:00`
  const endTime = `${endDate || startDate} 23:59:59`
  return [startTime, endTime]
}

export default create({
  name: 'DateSelection',

  props: {
    show3h: Boolean,
    customSecound: Boolean,
    autoInit: {
      type: Boolean,
      default: true
    },
    value: {
      type: String,
      default: 'today'
    },
    startDate: Number
  },

  data() {
    const WAF_CC = ['cloud-speed.router.menaceAnalyze__WAFAttack', 'cloud-speed.router.menaceAnalyze__CCAttack'].includes(this.$route.name)
    const AccurateAccessControl = ['cloud-speed.router.menaceAnalyze__AccurateAccessControl'].includes(this.$route.name)
    return {
      locale,
      daterange: [],
      selectType: this.value,
      customPopover: false,
      DATE_FORMAT,
      pickerOptions: {},
      WAF_CC: WAF_CC,
      AccurateAccessControl: AccurateAccessControl,
      disabledDate: null,
      disabledCurrent: null

    }
  },

  watch: {
    value(val) {
      this.selectType = val
    },
    startDate() {
      this.init()
    }
  },

  created() {
    if (this.autoInit) this.handleClick()
    this.init()
  },

  methods: {
    moment,
    init() {
      let startX = this.WAF_CC ? new Date().setMonth((new Date().getMonth() - 6)) : this.startDate
      if (!startX) startX = Date.now() - 3600 * 1000 * 24 * 30

      this.disabledDate = current => {
        return current < moment(startX, 'x') || current > moment()
      }
    },

    onOpenChange(status) {
      // 清空禁用时间段的设置
      this.disabledCurrent = null
      this.disabledDate = current => {
        let startX = this.WAF_CC ? new Date().setMonth((new Date().getMonth() - 6)) : this.startDate
        if (!startX) {
          startX = Date.now() - 3600 * 1000 * 24 * 30
          if (this.AccurateAccessControl) startX = Date.now() - 3600 * 1000 * 24 * 30
        }
        return current < moment(startX, 'x') || current > moment()
      }
    },
    // 点击面板时间事件
    calendarChange(date, dateString) {
      if (date.length <= 1) {
        this.selectCurrentDate = date[0]
        if (this.WAF_CC) {
          const endTime = moment(this.selectCurrentDate).add(1, 'M') > moment().endOf('day') ? moment().endOf('day') : moment(this.selectCurrentDate).add(1, 'M')
          const startTime = moment(this.selectCurrentDate).add(-1, 'M') > moment().add(-6, 'M') ? moment(this.selectCurrentDate).add(-1, 'M') : moment().add(-6, 'M')
          this.disabledDate = (current) => {
            return current < startTime || current > endTime
          }
        }
        if (this.AccurateAccessControl) {
          const endTime = moment(this.selectCurrentDate).add(7, 'd') > moment().endOf('day') ? moment().endOf('day') : moment(this.selectCurrentDate).add(7, 'd')
          const startTime = moment(this.selectCurrentDate).add(-7, 'd') > moment().add(-1, 'M') ? moment(this.selectCurrentDate).add(-7, 'd') : moment().add(-7, 'd')
          this.disabledDate = (current) => {
            return current < startTime || current > endTime
          }
        }
        return
      }

      if (date.length === 0) {
        this.disabledDate = current => {
          let startX = this.WAF_CC ? new Date().setMonth((new Date().getMonth() - 6)) : this.startDate
          if (!startX) {
            startX = Date.now() - 3600 * 1000 * 24 * 30
            if (this.AccurateAccessControl) startX = Date.now() - 3600 * 1000 * 24 * 30
          }
          return current < moment(startX, 'x') || current > moment()
        }
      }
      // if (this.WAF_CC) {

      // }

      this.selectCurrentDate = null
    },

    handleClickBack() {
      this.selectType = ''
      this.customPopover = false
    },

    handleClick() {
      const { selectType } = this
      this.customPopover = false
      let date
      if (selectType === '3h') {
        const startTime = moment().subtract(3, 'hour').format('YYYY-MM-DD HH:mm:ss')
        const endTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.handleEmit([startTime, endTime])
        return
      } else if (selectType === 'today') {
        date = [moment().format(DATE_FORMAT)]
      } else if (selectType === 'yesterday') {
        date = [moment().subtract(1, 'days').format(DATE_FORMAT)]
      } else if (selectType === '7d') {
        const startDate = moment().subtract(6, 'days').format(DATE_FORMAT)
        const endDate = moment().format(DATE_FORMAT)
        date = [startDate, endDate]
      } else if (selectType === '30d') {
        const startDate = moment().subtract(30, 'days').format(DATE_FORMAT)
        const endDate = moment().format(DATE_FORMAT)
        date = [startDate, endDate]
      } else {
        this.customPopover = true
        return
      }

      this.handleEmit(formatTime(...date))
    },

    handleSelectDateRange([start, end]) {
      if (this.customSecound) {
        this.handleEmit([
          start.format('YYYY-MM-DD HH:mm:ss'),
          end.format('YYYY-MM-DD HH:mm:ss')
        ])
      } else {
        this.handleEmit([
          start.format('YYYY-MM-DD 00:00:00'),
          end.format('YYYY-MM-DD 23:59:59')
        ])
      }
    },

    handleEmit([startTime, endTime]) {
      this.$emit('change', startTime, endTime, this.selectType)
      // TODO
      this.$emit('timevalue', startTime, endTime, this.selectType)
      this.$emit('input', this.selectType)
    }
  }
})
</script>
