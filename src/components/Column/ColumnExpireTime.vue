<template>
  <div :class="b()">
    <span>{{ expireTime ? formattedExpire : '--' }}</span>
    <p
      v-if="!showExpire"
      class="color--danger"
    >
      已到期
    </p>
    <div
      v-if="showExpireTime"
      class="color--warning"
    >
      仅剩{{ resultTime }}
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import moment from 'moment'

export default create({
  name: 'ColumnExpireTime',

  props: {
    expireTime: {
      type: String,
      default: ''
    }
  },

  data() {
    return {
      resultTime: '',
      showExpireTime: true,
      showExpire: true,
      formattedExpire: ''
    }
  },

  computed: {
    updateTime() {
      return this.expireTime
    }
  },

  watch: {
    updateTime() {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const sevenDayBefore = moment(this.expireTime).subtract(7, 'days').format('YYYY-MM-DD HH:mm:ss')
      const oneDayBefore = moment(this.expireTime).subtract(1, 'days').format('YYYY-MM-DD HH:mm:ss')
      const nowTime = moment().format('YYYY-MM-DD HH:mm:ss')
      const _7day = moment(nowTime).isBetween(sevenDayBefore, this.expireTime)
      const _1day = moment(nowTime).isBetween(oneDayBefore, this.expireTime)
      const difference = moment(this.expireTime).unix() - moment(nowTime).unix()
      let hours
      let minutes
      if (difference < 0) {
        this.showExpire = false
        this.formattedExpire = moment(this.expireTime).format('YYYY年MM月DD日')
        this.showExpireTime = false
        return
      }
      this.showExpire = true
      this.showExpireTime = true
      if (_1day) {
        hours = Math.floor(difference / 3600)
        minutes = Math.floor(difference % 3600 / 60)
        const startPoint = moment(this.expireTime).format('YYYY-MM-DD 00:00:00')
        const isToday = !moment().isAfter(startPoint)
        if (isToday) {
          this.formattedExpire = '明日' + moment(this.expireTime).format('HH时mm分')
        } else {
          this.formattedExpire = '今日' + moment(this.expireTime).format('HH时mm分')
        }
        this.resultTime = `${hours}小时${minutes}分`
      } else if (_7day) {
        const days = Math.floor(difference / (24 * 3600))
        hours = Math.floor(difference % (24 * 3600) / 3600)
        this.formattedExpire = moment(this.expireTime).format('MM月DD日HH时')
        this.resultTime = `${days}天${hours}小时`
      } else {
        this.formattedExpire = moment(this.expireTime).format('YYYY年MM月DD日')
        this.showExpireTime = false
      }
    }
  }
})
</script>
