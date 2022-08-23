<template>
  <div
    :class="['yd-status-icon--' + status, {'is-active': active, 'is-default': !active}]"
    class="yd-status-icon"
  >
    <yd-icon :class="icon" />
    <span
      v-if="text"
      class="yd-status-icon__text"
    >{{ text }}</span>
  </div>
</template>

<script>
const NAME = 'yd-icon-status'

export default {
  name: NAME,
  props: {
    icon: String,
    status: String,
    text: String,
    active: {
      type: Boolean,
      default: true
    }
  }
}
</script>

<style lang="scss">
.yd-status-icon {
  display: inline-block;
  font-size: 13px;

  &__text {
    margin-left: 8px;
    color: rgba(0, 0, 0, 0.65);
  }

  i:before {
    color: inherit;
  }

  &--success {
    color: $--color-success;
  }

  &--warning {
    color: $--status-warning;
  }

  &--processing {
    color: $--color-primary;
  }

  &--error {
    color: $--status-error;
  }

  &--default {
    color: $--status-default;

    &:before {
      color: $--status-default !important;
    }
  }

  &.is-default {
    > .yd-icon {
      color: $--status-default !important;
    }
  }
}
</style>
