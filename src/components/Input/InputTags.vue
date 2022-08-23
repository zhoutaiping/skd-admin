<style lang="less">
</style>

<template>
  <div>
    <el-form>
      <el-form-item>
        <el-input
          :placeholder="placeholder"
          v-model="form.value"
          style="width: 180px; margin-right: 8px"
        />
        <el-button
          type="primary"
          @click="handleAdd"
        >添加</el-button>
      </el-form-item>
    </el-form>

    <el-tag
      v-for="(item, index) in val"
      :key="index"
      closable
      style="margin-right: 8px"
      @close="handleRemove(index)"
    >
      {{ item }}
    </el-tag>
  </div>
</template>

<script>
export default {
  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      form: {
        value: ''
      },
      val: this.value
    }
  },

  watch: {
    value(val) {
      this.val = val
    }
  },

  methods: {
    handleAdd() {
      this.val.push(this.form.value)
      this.form.value = ''
      this.handleChange()
    },

    handleRemove(index) {
      this.val.splice(index, 1)
      this.handleChange()
    },

    handleChange() {
      this.$emit('input', this.val)
      this.$emit('change')
      //
    }
  }
}
</script>
