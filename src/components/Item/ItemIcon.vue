<style lang="scss">
.ItemIcon {
  display: inline-block;
  border: 1px solid $--border-color-base;
  text-align: center;
  position: relative;
  border-radius: 3px;

  &:hover {
    transition: 0.15s;
    border-color: $--color-primary;

    .ItemIcon {
      &__actionButton {
        display: block;
      }
    }
  }

  &__body {
    overflow: hidden;
    padding: 10px 15px;
  }

  &__img {
    display: inline-block;
    width: 60px;
    height: 60px;
  }

  &__title {
    font-size: 12px;
    line-height: 14px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    margin-top: 10px;
  }

  &--active {
    border-color: $--color-primary;

    .ItemIcon {
      &__body {
        position: relative;

        &:after {
          position: absolute;
          content: "";
          top: -38px;
          right: -38px;
          width: 60px;
          height: 60px;
          background: $--color-primary;
          transform: rotateZ(45deg);
        }
      }
    }
  }

  &__checkbox {
    position: absolute;
    color: #fff;
    right: 2px;
    top: 2px;
    z-index: 1;
  }

  &--disabled {
    opacity: 0.7;
    pointer-events: none;
  }

  &__actionButton {
    display: none;
    cursor: pointer;
    position: absolute;
    right: -10px;
    top: -10px;
    font-size: 18px;
    color: $--color-danger;
    z-index: 11;
  }

  &__disabledTitle {
    position: absolute;
    opacity: 0.7;
    right: 5px;
    top: 5px;
    font-size: 12px;
    line-height: 12px;
  }
}
</style>

<template>
  <div :class="b({active, disabled})">
    <span
      v-if="disabledTitle && disabled"
      :class="b('disabledTitle')"
    >{{ disabledTitle }}</span>
    <i
      v-if="showRemove"
      :class="b('actionButton')"
      class="el-icon-remove"
      @click="$emit('remove')"
    />
    <i
      v-if="active"
      :class="b('checkbox')"
      class="el-icon-check"
    />
    <div
      :class="b('body')"
      @click="$emit('click')"
    >
      <img
        :src="src"
        :class="b('img')"
      >
      <p :class="b('title')">{{ title }}</p>
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemIcon',

  props: {
    disabled: Boolean,
    disabledTitle: String,
    icon: String,
    src: String,
    title: String,
    active: Boolean,
    showRemove: Boolean
  }
})
</script>
