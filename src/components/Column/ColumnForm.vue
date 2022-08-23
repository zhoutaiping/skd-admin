<style lang="scss">
.ColumnForm {
  .el-form-item {
    margin-bottom: 0px !important;
  }
}
</style>

<template>
  <el-form
    ref="form"
    :class="b()"
    :model="model"
    :rules="rules"
    @submit.native.prevent
  >
    <el-form-item
      :prop="prop"
      :rules="itemRules"
    >
      <slot />
    </el-form-item>
  </el-form>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnForm',

  props: {
    model: Object,
    rules: Object,
    prop: String,
    itemRules: [Array, Object]
  },

  methods: {
    resetFields() {
      this.$refs.form.resetFields()
    },

    clearValidate() {
      this.$refs.form.clearValidate()
    },

    validate() {
      try {
        this.$refs.form.validate(valid => {
          if (!valid) throw new Error()
        })
      } catch (e) {
        return false
      }
      return true
    }
  }
})
</script>
