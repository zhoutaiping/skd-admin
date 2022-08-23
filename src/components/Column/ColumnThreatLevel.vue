<template>
  <span :class="b()">
    <span
      v-if="value === '低'"
      class="color--success"
    >低</span>
    <span
      v-else-if="value === '中'"
      class="color--warning"
    >中</span>
    <span
      v-else-if="value === '高'"
      class="color--danger"
    >高</span>
  </span>
</template>

<script>
import create from '@/utils/create-basic'
import column from '@/mixins/column'

export default create({
  props: {
    value: String
  },

  name: 'ColumnThreatLevel',

  mixins: [column]
})
</script>
