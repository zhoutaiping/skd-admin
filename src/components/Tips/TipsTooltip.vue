<style lang="less">
.TipsTooltip {
  &__popper {
    ul {
      margin-top: 10px;
    }

    li {
      margin-bottom: 5px;
    }
    .highlight {
      color: #fff;
      background: rgb(253, 129, 56);
      padding: 1px 3px;
    }
  }
}
</style>

<template>
  <el-tooltip
    :popper-class="b('popper')"
    placement="right"
  >
    <div slot="content">
      <div
        v-if="title"
        class="tooltip__title"
      >
        {{ title }}
      </div>
      <slot />
    </div>
    <yd-icon-status
      :status="status"
      icon="el-icon-info"
      style="margin-left: 4px; vertical-align: top;"
    />
  </el-tooltip>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'TipsTooltip',

  props: {
    title: String,
    status: {
      type: String,
      default: 'processing'
    }
  }
})
</script>
