<template>
  <div
    :class="['yd-alert--' + status, 'yd-alert--' + type]"
    class="yd-alert"
  >
    <h3
      v-if="title"
      class="yd-alert__title"
    >{{ title }}</h3>
    <div class="yd-alert__content">
      <slot />
    </div>
  </div>
</template>

<script>
const NAME = 'yd-alert'

export default {
  name: NAME,

  props: {
    title: String,
    status: String,
    type: String
  }
}
</script>
<style lang="scss">
.yd-alert {
  background-color: $--color-primary-light-9;
  border: 1px solid $--color-primary;
  padding: 12px 30px 12px 20px;
  margin-bottom: 12px;
  font-size: 12px;
  line-height: 1.5;
  color: $--color-text-primary;

  p {
    &:not(:last-child) {
      margin-bottom: 8px;
    }
  }

  ol {
    li {
      &.num-item {
        text-indent: -10px;
        padding-left: 18px;
      }

      &:not(:last-child) {
        margin-bottom: 8px;
      }
    }
  }

  &--success {
    background-color: $--color-success-lighter;
    border-color: $--color-success;
  }

  &--danger {
    background-color: $--color-danger-lighter;
    border-color: $--color-danger;
  }

  &__btn {
    margin-top: 12px;
  }

  a {
    color: $--color-primary;
  }

  strong {
    color: $--color-primary;
  }

  .text--underline {
    font-weight: 600;
    text-decoration: underline;
  }

  &__title {
    font-size: 12px;
    color: #000;
    font-weight: 100;
    margin-bottom: 4px;
  }

  &--warning {
    background-color: #fdf6ec;
    border-color: #e6a23c;
    color: #e6a23c;
  }
}
</style>
