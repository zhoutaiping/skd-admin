<style lang="scss">
.DmAlert {
  border: 1px solid $--color-primary;
  background: $--color-primary-light-9;
  padding: 12px 20px;
  font-size: 12px;
  margin-bottom: 16px;
  color: $--color-text-primary;
  line-height: 1.5;

  &--warning {
    background-color: #fdf6ec;
    border-color: #e6a23c;
    color: #e6a23c;
  }

  &--success {
    background-color: $--color-success-lighter;
    border-color: $--color-success;
  }

  &--danger {
    background-color: $--color-danger-lighter;
    border-color: $--color-danger;
  }

  a {
    color: $--color-primary;

    &:hover {
      text-decoration: underline;
    }
  }

  p {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  ul {
    margin-left: 14px;
    list-style-type: disc;
  }

  ol {
    margin-left: 14px;
  }

  .num-item {
    text-indent: -10px;
    padding-left: 18px;
    list-style-type: decimal;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  .dot-item {
    position: relative;
    padding-left: 4px;

    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }
}
</style>

<template>
  <div :class="b([type])">
    <slot />
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmAlert',

  props: {
    type: {
      type: String,
      default: ''
    }
  }
})
</script>
