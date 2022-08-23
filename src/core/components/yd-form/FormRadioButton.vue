<style lang="scss">
.yd-form-radio-button.el-radio-group{
  margin-left: 1px;
  .el-radio-button{
    margin-bottom: 8px;

    .el-radio-button__inner{
      border-left: 1px solid #e8e8e8;
      box-shadow: none;
    }

    margin-left: -1px;
  }
}

</style>

<template>
  <el-radio-group
    v-model="val"
    :class="b()"
    :size="size"
    :disabled="disabled"
  >
    <el-radio-button
      v-for="item in radios"
      :key="item.value"
      :disabled="item.disabled"
      :label="item.value"
    >{{ item.label }}</el-radio-button>
    <slot />
  </el-radio-group>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'yd-form-radio-button',

  props: {
    size: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: false
    },
    disabled: Boolean,
    radios: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: [String, Number]
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    val(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },
    value(val) {
      this.val = val
    }
  }
})
</script>
