<template>
  <el-button
    :disabled="disabled"
    :type="type"
    @click="handleClick"
  >
    {{ $t(name) }}
  </el-button>
</template>

<script>
export default {
  name: 'DmButton',

  props: {
    name: String,
    type: String,
    disabled: Boolean
  },

  methods: {
    handleClick(e) {
      this.$emit('click', e)
    }
  }
}
</script>
