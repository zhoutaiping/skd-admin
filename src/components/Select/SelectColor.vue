<style lang="less">
</style>

<template>
  <div>
    <el-color-picker
      slot="prepend"
      v-model="val"
      @change="handlechange"
    />
    <el-input
      v-model="val"
      placeholder="#000000"
      style="width: 80px; vertical-align: top; margin-left: 12px;"
      @change="handlechange"
    />
  </div>
</template>

<script>
export default {
  props: {
    value: String
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    value(val) {
      this.val = val
    }
  },

  methods: {
    handlechange() {
      this.$emit('input', this.val)
    }
  }
}
</script>
