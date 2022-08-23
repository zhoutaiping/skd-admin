<style lang="scss">
.ItemNumberLite {
  padding: 8px;

  &--border {
    border: 1px solid $--border-color-base;
    padding: 12px;
  }

  &--borderRight{
    border-right: 1px solid $--border-color-base;
  }

  .el-progress-bar {
    padding-right: 70px;
    margin-right: -70px;
  }

  &--column {
    text-align: center;

    .ItemNumberLite {
      &__header {
        flex-direction: column;
      }
      &__value {
        font-size: 22px;
      }
    }
  }

  &__header {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  &__title {
    flex: 1;
    font-size: 14px;
  }

  &__value {
    font-size: 14px;
    font-weight: 600;
    color: $--color-primary;
  }

  &__badge{
    width: 8px;
    height: 8px;
    border-radius: 100%;
    margin-right: 10px;
  }
}
</style>

<template>
  <div :class="b({ border, column, borderRight })">
    <div :class="b('header')">
      <div v-if="badge" :class="[b('badge'), `bg--${badgeColor}`]" />
      <a-avatar v-if="avater" :src="avaterSrc" />
      <div :class="b('title')">
        {{ title }}
      </div>
      <div :class="b('value')">
        <slot />
      </div>
    </div>
    <div v-if="progress" :class="b('progress')">
      <el-progress :percentage="progressPercent" />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemNumberLite',

  components: {},

  props: {
    title: String,
    badge: Boolean,
    badgeColor: String,
    avater: Boolean,
    avaterSrc: String,
    progress: Boolean,
    progressPercent: Number,
    column: Boolean,
    border: Boolean,
    borderRight: Boolean
  }
})
</script>
