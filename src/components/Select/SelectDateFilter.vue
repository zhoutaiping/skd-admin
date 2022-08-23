<style lang="scss">
.SelectDateFilter {
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
    v-model="filterType"
    @change="handleClick()"
  >
    <template v-if="customSwitch">
      <el-button-group>
        <el-button
          class="buttonBack"
          icon="el-icon-back"
          @click="handleClickBack"
        />
        <el-date-picker
          v-model="daterange"
          :picker-options="pickerOptions"
          :type="customSecound ? 'datetimerange' : 'daterange'"
          :value-format="customSecound ? 'yyyy-MM-dd HH:mm:ss' : 'yyyy-MM-dd'"
          range-separator="至"
          start-placeholder="开始日期"
          end-placeholder="结束日期"
          @change="handleSelectDaterange"
        />
      </el-button-group>
    </template>
    <template v-else>
      <el-radio-button
        v-if="show3h"
        label="15m"
      >15分钟</el-radio-button>
      <el-radio-button
        v-if="show3h"
        label="3h"
      >3小时</el-radio-button>
      <el-radio-button label="today">今天</el-radio-button>
      <el-radio-button label="yesterday">昨天</el-radio-button>
      <el-radio-button label="7d">7天</el-radio-button>
      <el-radio-button label="30d">30天</el-radio-button>
      <el-radio-button label="custom">自定义</el-radio-button>
    </template>
  </el-radio-group>
</template>

<script>
import create from '@/utils/create-basic'
import moment from 'moment'

const DATE_FORMAT = 'YYYY-MM-DD'

function formatTime(startDate, endDate) {
  const startTime = `${startDate} 00:00:00`
  const endTime = `${endDate || startDate} 23:59:59`
  return [startTime, endTime]
}

export default create({
  name: 'SelectDateFilter',

  props: {
    value: Object,
    type: {
      type: String,
      default: 'today'
    },
    show15m: Boolean,
    show3h: Boolean,
    customSecound: Boolean,
    disabledDateValue: {
      type: Number,
      default: 30
    }
  },

  data() {
    return {
      filterType: this.type,
      customSwitch: false,
      daterange: []
    }
  },

  watch: {
    type(val) {
      this.filterType = val
    }
  },

  created() {
    this.handleClick(true)
  },

  computed: {
    pickerOptions() {
      const defaultDisabledDate = this.disabledDateValue || 30
      return {
        disabledDate(time) {
          return (
            time.getTime() <= Date.now() - 3600 * 1000 * 24 * defaultDisabledDate ||
            time.getTime() >= Date.now()
          )
        }
      }
    }
  },

  methods: {
    disabledDate(current) {
      const startDate = moment().subtract(30, 'days')
      return current && (current < startDate || current > moment().endOf('day'))
    },

    handleClickBack() {
      this.filterType = ''
      this.customSwitch = false
    },

    handleClick(hasInit = false) {
      const type = this.filterType
      this.customSwitch = false
      this.$emit('update:type', type)
      let date
      if (type === '15m') {
        const startTime = moment().subtract(15, 'minutes').format('YYYY-MM-DD HH:mm:ss')
        const endTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.handleEmit([startTime, endTime])
        return
      } else if (type === '3h') {
        const startTime = moment().subtract(3, 'hour').format('YYYY-MM-DD HH:mm:ss')
        const endTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.handleEmit([startTime, endTime])
        return
      } else if (type === 'today') {
        const startTime = moment().format('YYYY-MM-DD 00:00:00')
        const endTime = moment().format('YYYY-MM-DD HH:mm:ss')
        this.handleEmit([startTime, endTime])
        return
      } else if (type === 'yesterday') {
        date = [moment().subtract(1, 'days').format(DATE_FORMAT)]
      } else if (type === '7d') {
        const startDate = moment().subtract(7, 'days').format(DATE_FORMAT)
        const endDate = moment().format(DATE_FORMAT)
        date = [startDate, endDate]
      } else if (type === '30d') {
        const startDate = moment().subtract(30, 'days').format(DATE_FORMAT)
        const endDate = moment().format(DATE_FORMAT)
        date = [startDate, endDate]
      } else {
        this.customSwitch = true
        return
      }

      this.handleEmit(formatTime(...date), hasInit)
    },

    handleSelectDaterange([startDate, endDate]) {
      if (this.customSecound) {
        const [eDate, eTime] = endDate.split(' ')
        if (eTime === '00:00:00') endDate = `${eDate} 23:59:59`
        this.handleEmit([startDate, endDate])
      } else {
        this.handleEmit(formatTime(startDate, endDate))
      }
    },

    handleEmit([startTime, endTime], hasInit) {
      const params = this.value
      params.start_time = startTime
      params.end_time = endTime
      this.$emit('input', params)

      if (!hasInit) this.$emit('change')
    }
  }
})
</script>
