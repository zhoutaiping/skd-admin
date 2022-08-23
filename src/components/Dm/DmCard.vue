<style lang="scss">
.DmCard {
  background: #fff;
  padding-top: 16px;

  &--border{
    border: 1px solid $--border-color-lighter;
  }

  &__header {
    position: relative;
    padding: 16px;
    padding-top: 0px;
  }

  &__title {
    font-size: 14px;
    font-weight: 600;
    color: $--color-text-primary;
  }

  .el-loading-mask{
    top: 12px;
  }

  &__action {
    position: absolute;
    right: 16px;
    top: 0px;
    bottom: 0px;
    display: flex;
    align-items: center;
  }

  .DmData {
    box-shadow: none;
  }

  &__body {
    padding: 16px;
    padding-top: 0px;
    position: relative;
  }
}
</style>

<template>
  <div :class="b({border})">
    <div
      v-if="$slots.header || $slots.title || title"
      ref="header"
      :class="b('header')"
    >
      <h3
        v-if="title || $slots.title"
        :class="b('title')"
      >{{ title }}
        <slot name="title" />
      </h3>
      <slot name="header" />
      <div :class="b('action')">
        <slot name="action" />
      </div>
    </div>
    <div
      v-loading="loading"
      :class="b('body')"
      element-loading-spinner="el-icon-loading"
    >
      <slot />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmCard',

  props: {
    title: {
      type: String,
      default: ''
    },
    border: {
      type: Boolean,
      default: true
    },
    loading: true
  }
})
</script>
