<style lang="scss">
.ColumnItem{
  display: flex;
  height: 28px;
  line-height: 28px;

  &__title{
    width: 130px;
    color: #999;
  }

  &__value{
    color: #000;
  }
}
</style>

<template>
  <div :class="b()">
    <div
      :class="b('title')"
      :style="{ width }"
    >
      {{ title }}：
    </div>
    <div :class="b('value')">
      {{ value || emptyValue }}
      <slot />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnItem',

  components: {},

  props: {
    value: String,
    emptyValue: {
      type: String,
      default: '-'
    },
    title: String,
    width: String
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>

