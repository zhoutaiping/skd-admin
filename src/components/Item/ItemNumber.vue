<style lang="scss">
.ItemNumber {
  text-align: left;
  display: flex;
  overflow: hidden;
  justify-content: center;
  flex-direction: column;
  height: 100%;
  position: relative;

  &__num {
    font-weight: 500;
    font-size: 36px;
    line-height: 36px;
  }

  &__unit {
    color: $--color-text-regular;
    font-size: 18px;
    line-height: 18px;
  }

  &__title {
    margin: 0px;
    margin-top: 8px;
    color: $--color-text-regular;
    font-size: 14px;
    font-weight: 600;
    line-height: 15px;
  }
}
</style>

<template>
  <div v-loading="loading" :class="b()" element-loading-spinner="el-icon-loading">
    <div :class="[b('num'), `color--${color}`]">
      {{ formartValue || 0 }}
      <slot />
      <span v-if="unit" :class="b('unit')">{{ unit }}</span>
    </div>
    <p :class="b('title')">{{ title }}</p>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemNumber',

  props: {
    loading: Boolean,
    value: {
      type: [String, Number],
      default: 0
    },
    title: String,
    unit: String,
    color: {
      type: String,
      default: 'primary'
    },
    type: String
  },

  computed: {
    formartValue() {
      function numFormat(num) {
        num = num.toString().split('.') // 分隔小数点
        var arr = num[0].split('').reverse() // 转换成字符数组并且倒序排列
        var res = []
        for (var i = 0, len = arr.length; i < len; i++) {
          if (i % 3 === 0 && i !== 0) {
            res.push(',') // 添加分隔符
          }
          res.push(arr[i])
        }
        res.reverse() // 再次倒序成为正确的顺序
        if (num[1]) {
          // 如果有小数的话添加小数部分
          res = res.join('').concat('.' + num[1])
        } else {
          res = res.join('')
        }
        return res
      }
      return numFormat(Number(this.value))
    }
  },

  methods: {}
})
</script>
