<template>
  <el-button
    :disabled="disabled"
    type="text"
    @click="copyAliasName(row.cname)"
  >复制 CNAME&nbsp;
    <i class="el-icon el-icon-copy" />
  </el-button>
</template>

<script>
import column from '@/mixins/column'
import Help from '@/utils/help'

export default {
  mixins: [column],

  props: {
    disabled: Boolean
  },

  methods: {
    copyAliasName(text) {
      Help.copyText(text)
      this.$message.success('复制成功')
    }
  }
}
</script>
