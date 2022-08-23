<template>
  <el-button
    v-if="time !== 60 && time !== 0"
    :size="size"
    :type="type"
    :plain="plain"
    disabled
  >{{ time }}秒后可重发</el-button>
  <el-button
    v-else
    :loading="loading"
    :size="size"
    :type="type"
    :plain="plain"
    @click="handleClick"
  >发送验证码</el-button>
</template>

<script>
export default {
  props: {
    size: String,
    type: String,
    plain: Boolean,
    loading: Boolean
  },

  data() {
    return {
      time: 0
    }
  },

  methods: {
    handleClick() {
      this.$emit('click')
    },

    startTimer() {
      this.time = 59
      this.interval = setInterval(() => {
        this.timer()
      }, 1000)
    },

    timer() {
      this.time--
      if (this.time === 0) clearInterval(this.interval)
    }
  }
}
</script>
