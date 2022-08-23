<style lang="scss">
.PopoverInfo{
  &__popover{
    padding: 16px;
    font-size: 13px;
  }
}
</style>

<template>
  <el-popover
    :content="content"
    :popper-class="b('popover')"
    trigger="hover"
    placement="top"
  >
    <yd-icon-status
      slot="reference"
      icon="el-icon-info"
      status="processing"
    />
  </el-popover>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'PopoverInfo',

  components: {},

  props: {
    content: String
  }
})
</script>
