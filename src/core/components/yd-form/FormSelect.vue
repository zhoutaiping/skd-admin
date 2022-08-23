<style lang="scss">
.yd-form-select{
  .el-loading-spinner{
    margin-top: -10px;
  }
}
</style>

<template>
  <el-select
    v-model="val"
    v-loading="loading"
    :size="size"
    :placeholder="placeholder"
    :disabled="disabled"
    :filterable="filterable"
    :multiple="multiple"
    :collapse-tags="collapseTags"
    :allow-create="allowCreate"
    class="yd-form-select"
    element-loading-background="rgba(0, 0, 0, 0.05)"
    element-loading-spinner="el-icon-loading"
    @change="handleChange"
    @visible-change="handleVisibleChange"
  >
    <el-option
      v-if="defaultText"
      :size="size"
      :label="defaultText"
      :value="defaultValue"
    >{{ defaultText }}</el-option>
    <el-option
      v-for="item in selectsView"
      :key="item.value"
      :size="size"
      :disabled="item.disabled"
      :value="item.value"
      :label="item.label"
    >
      {{ item.label }}
    </el-option>
  </el-select>
</template>

<script>
import create from '@/utils/create-basic'
import { deepClone } from '@/utils'

export default create({
  name: 'yd-form-select',

  props: {
    placeholder: String,
    disabled: Boolean,
    multiple: Boolean,
    collapseTags: Boolean,
    allowCreate: Boolean,
    defaultText: String,
    loading: Boolean,
    defaultValue: {
      type: [String, Number],
      default: ''
    },
    size: {
      type: String,
      default: ''
    },
    selects: {
      type: Array,
      default: () => {
        return []
      }
    },
    filterable: Boolean,
    value: [String, Number, Array]
  },

  data() {
    return {
      val: this.value,
      selectsView: []
    }
  },

  mounted() {
    this.initSelects(this.selects)
  },

  watch: {
    selects(val) {
      this.initSelects(val)
    },
    val(val) {
      this.$emit('input', val)
    },
    value(val) {
      this.val = val
    }
  },

  methods: {
    initSelects(selects) {
      selects = deepClone(selects)
      selects.forEach(item => {
        item.label = typeof item.label === 'string' ? item.label.replace('__companyEN__', 'SDK') : item.label
      })
      this.selectsView = selects
    },

    handleChange(value) {
      this.$emit('input', value)
      this.$emit('change', value)
    },

    handleVisibleChange(e) {
      this.$emit('visible-change', e)
    }
  }
})
</script>
