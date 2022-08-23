<style lang="scss">
.SelectDaterange {
  .suffix {
    padding: 0 12px;
  }
}
</style>

<template>
  <div :class="b()">
    <a-range-picker
      :disabled-date="disabledDate"
      :locale="locale"
      v-model="value"
      :format="'YYYY-MM-DD HH:mm:ss'"
      @change="handleSelectDateRange"
    >
      <template slot="monthCellContentRender" slot-scope="date">
        {{ `${moment(date).format('M')}月` }}
      </template>
    </a-range-picker>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import locale from 'ant-design-vue/es/date-picker/locale/zh_CN'
import moment from 'moment'
import 'moment/locale/zh-cn'
moment.locale('zh-cn')

export default create({
  name: 'SelectDaterange',

  props: {
    value: Array
  },

  data() {
    return {
      locale,
      disabledDate: null
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const startX = Date.now() - 3600 * 1000 * 24 * 30

      this.disabledDate = current => {
        return current < moment(startX, 'x') || current > moment()
      }
    },

    handleSelectDateRange([start, end]) {
      this.$emit('change', [
        start.format('YYYY-MM-DD HH:mm:ss'),
        end.format('YYYY-MM-DD HH:mm:ss')
      ])
      this.$emit('input', [start, end])
    }
  }
})
</script>
