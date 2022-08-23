<style lang="scss">
.columnRatio {
  text-align: left;
  word-break: normal;
  background: rgba($--color-primary, 0.2);
}
</style>

<template>
  <div :class="b()" :style="{'width': value * 100 + '%'}">
    {{ ratio }}
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'columnRatio',

  props: {
    value: [String, Number]
  },

  computed: {
    ratio() {
      const value = this.value
      return value ? `${(value * 100).toFixed(2)}% ` : '0%'
    }
  }
})
</script>
