<style lang="scss">
.ColumnProgress {
  .el-progress__text {
    font-size: 12px !important;
  }
}
</style>

<template>
  <div :class="b()">
    <el-progress
      :percentage="percentage"
      :status="percentage === 100 ? 'success' : ''"
    />
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnProgress',

  props: {
    percentage: {
      type: Number,
      default: 0
    }
  }
})
</script>
