<template>
  <span :class="b()">
    <span :class="`color-${item['color'] || 'default'}`">{{ item['label'] || '未知' }}</span>
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnStatus',

  props: {
    value: [String, Number, Boolean],
    settings: {}
  },

  computed: {
    item() {
      return this.settings.find(_ => _.value === this.value) || {}
    }
  }
})
</script>
