<style lang="scss">
.yd-card-list {
  .yd-card {
    &:not(:last-child) {
      margin-bottom: 16px;
      // border-bottom: 1px solid $--border-color-base;
    }
  }
}
</style>
<template>
  <div class="yd-card-list">
    <slot/>
  </div>
</template>

<script>
const NAME = 'yd-card-list'
export default {
  name: NAME,
  props: {}
}
</script>
