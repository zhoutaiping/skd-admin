<template>
  <span :class="b()">
    <slot />
    <el-tooltip
      :popper-class="b('popper')"
      placement="top"
    >
      <div slot="content">
        {{ tips }}
      </div>
      <i
        class="el-icon-info"
        style="margin-left: 8px"
      />
    </el-tooltip>
  </span>
</template>

<script>
import create from '@/utils/create-basic'
import column from '@/mixins/column'

export default create({
  name: 'ColumnHeaderTips',

  mixins: [column],

  props: {
    tips: String
  }
})
</script>
