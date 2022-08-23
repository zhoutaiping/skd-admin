<style lang="scss">
.InputSearch {
  width: 200px;
}
</style>

<template>
  <el-input
    :class="b()"
    :placeholder="placeholder"
    v-model="keyword"
    :disabled="disabled"
    clearable
    prefix-icon="el-icon-search"
    @change="handleChange"
    @clear="handleSubmit"
    @keyup.enter.native="handleSubmit"
  >
    <template slot="prepend">
      <slot name="prepend" />
    </template>
  </el-input>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'InputSearch',

  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: '请输入进行查询'
    },
    disabled: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      keyword: ''
    }
  },

  watch: {
    value(val) {
      this.keyword = val
    },
    keyword(val) {
      this.handleChange()
      this.$emit('input', val)
    }
  },

  mounted() {
    this.keyword = this.value
  },

  methods: {
    handleChange() {
      this.$emit('change', this.keyword)
    },
    handleSubmit() {
      this.$emit('submit', this.keyword)
    }
  }
})
</script>
