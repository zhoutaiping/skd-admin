<template>
  <yd-form-select
    v-if="options.type === 'select'"
    :selects="options.options"
    v-model="val"
    :multiple="options.multiple"
    :filterable="options.filterable"
    :disabled="options.disabled"
    :allow-create="options['allow-create']"
    style="width: 320px"
  />
  <el-input
    v-else-if="options.type === 'textarea'"
    v-model="val"
    :placeholder="options.placeholder"
    :rows="4"
    :disabled="options.disabled"
    type="textarea"
    style="width: 320px"
  />
  <el-switch
    v-else-if="options.type === 'switch'"
    v-model="val"
  />
  <el-checkbox
    v-else-if="options.type === 'checkbox'"
    v-model="val"
    @change="$emit('change', val)"
  >
    {{ options.label }}
  </el-checkbox>
  <el-input
    v-else
    :disabled="options.disabled"
    v-model="val"
    :placeholder="options.placeholder"
    style="width: 320px"
  />
</template>

<script>
export default {
  props: {
    value: [String, Number, Boolean],
    options: Object
  },

  data() {
    return {
      val: this.value
    }
  },

  watch: {
    value(value) {
      this.val = value
    },

    val(value) {
      this.$emit('input', value)
    }
  }
}
</script>
