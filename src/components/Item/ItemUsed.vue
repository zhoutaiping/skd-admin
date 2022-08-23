<style lang="scss">
.ItemUsed {
  &__title {
    font-weight: 600;
    font-size: 12px;
    margin: 10px 0;
  }

  &__tips {
    float: right;
  }

  .el-progress-bar__innerText {
    display: none;
  }

  .el-progress-bar__outer {
    border-radius: 0px;
  }

  .el-progress-bar__inner {
    border-radius: 0px;
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('title')">
      {{ title }}
      <span :class="b('tips')">
        <slot name="tips" />
      </span>
    </div>
    <div :class="b('progress')">
      <el-progress
        :text-inside="true"
        :stroke-width="26"
        :percentage="percentageText"
      />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemUsed',

  components: {},

  props: {
    title: {
      type: String,
      default: ''
    },
    percentage: {
      type: Number,
      default: 0
    },
    unit: {
      type: String,
      default: ''
    }
  },

  data() {
    return {}
  },

  computed: {
    percentageText() {
      let val = 0
      if (this.percentage > 100) {
        val = 100
      } else if (this.percentage < 0) {
        val = 0
      } else {
        val = this.percentage
      }

      return val
    }
  },

  methods: {}
})
</script>
