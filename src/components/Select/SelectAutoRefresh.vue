<style lang="scss">
.SelectAutoRefresh {
  display: inline-block;
  vertical-align: top;

  &__button {
    i {
      margin-right: 4px;
    }
  }

  &__poppver {
    position: relative;
  }

  &__switch {
    position: absolute;
    right: 12px;
    top: 10px;
  }

  &__body {
    margin-top: 12px;
  }
}
</style>

<template>
  <el-popover
    :popper-class="b('popper')"
    placement="bottom"
    title="自动刷新"
    trigger="hover"
  >
    <div style="margin-bottom: 12px">
      <el-switch
        v-model="open"
        :class="b('switch')"
        size="small"
        default-checked
        @change="handleOpenChange"
      />
    </div>
    <template>
      <yd-form-radio-button
        :class="b('body')"
        :radios="AUTO_TIME"
        v-model="val"
        :disabled="!open"
        size="mini"
        @change="handleUpdateInterval"
      />
    </template>
    <el-button
      slot="reference"
      :class="b('button')"
      :type="open ? 'primary' : 'default'"
    >
    <i class="el-icon-refresh" />{{ val | labelView(AUTO_TIME) }}</el-button>
  </el-popover>
</template>

<script>
import create from '@/utils/create-basic'

const AUTO_TIME = [
  {
    label: '30秒',
    value: 30
  },
  {
    label: '1分钟',
    value: 60
  },
  {
    label: '5分钟',
    value: 300
  },
  {
    label: '10分钟',
    value: 600
  },
  {
    label: '15分钟',
    value: 900
  }
]

export default create({
  name: 'SelectAutoRefresh',

  data() {
    return {
      val: 30,
      AUTO_TIME,
      open: true,
      intervalFn: ''
    }
  },

  beforeDestroy() {
    this.stopInterval()
  },

  created() {
    // this.AUTO_TIME = this.i18nSelects(AUTO_TIME)
  },

  mounted() {
    this.startInterval()
  },

  methods: {
    handleUpdateInterval() {
      this.startInterval()
    },

    handleOpenChange(e) {
      if (e) {
        this.startInterval()
      } else {
        this.stopInterval()
      }
    },

    stopInterval() {
      clearInterval(this.intervalFn)
    },

    startInterval() {
      this.stopInterval()
      this.intervalFn = setInterval(() => {
        this.$emit('update')
      }, this.val * 1000)
    }
  }
})
</script>
