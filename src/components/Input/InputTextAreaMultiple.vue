<template>
  <el-input
    v-model="val"
    :rows="10"
    :placeholder="placeholder"
    type="textarea"
    upper-limit="100"
    @blur="handleChange"
  />
</template>

<script>
export default {
  props: {
    value: {
      type: Array,
      default: () => []
    },
    placeholder: {
      type: String,
      default: () => '请输入'
    },
    rows: {
      type: Number,
      default: 10
    }
  },

  data() {
    return {
      val: '',
      list: []
    }
  },

  watch: {
    value() {
      this.handleUpdate()
    }
  },

  created() {
    this.handleUpdate()
  },

  methods: {
    handleUpdate() {
      const value = this.value
      const list = Array.isArray(value) ? value : []
      this.list = list
      this.val = list.join('\n')
    },

    handleChange() {
      const list = this.val.split(/[\n\r]/g).filter(_ => _)
      this.list = list
      this.$emit('input', this.list)
      this.$emit('change', this.list)
    }
  }
}
</script>
