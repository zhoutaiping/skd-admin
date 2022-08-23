<style lang="scss">
.ItemCopy {
  font-size: 12px;
  cursor: pointer;
}
</style>

<template>
  <el-tooltip
    effect="dark"
    content="点击复制"
    placement="top"
  >
    <i
      v-clipboard:copy="value"
      v-clipboard:success="handleCopy"
      :class="b()"
      class="color--primary el-icon el-icon-copy-document"
    />
  </el-tooltip>
</template>

<script>
import create from '@/utils/create-basic'
import Help from '@/utils/help'

export default create({
  name: 'ItemCopy',

  props: {
    value: [String, Number]
  },

  methods: {
    handleCopy() {
      this.$message.success('复制成功')
    }
  }
})
</script>
