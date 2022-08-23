<style lang="scss">
.item-number-group {
  &__header {
    margin-bottom: 12px;
    color: #333;
    font-size: 16px;
  }

  &__footer {
    font-size: 12px;
    margin-top: 8px;
    padding-top: 8px;
    border-top: 1px solid #ddd;
    color: #999;
  }
  ul {
    display: flex;
    width: 100%;
  }
  .item-number-list {
    display: flex;
    height: 100%;
    .ItemNumber {
      flex: 1;
      .block-loading{
        padding: 0 15px;
      }
      &:first-child{
        .block-loading{
          padding-left: 0px;
        }
      }
      &:not(:first-child) {
        padding-left: 20px;
        border-left: 1px solid #ddd;
      }
    }
  }

  &.is-horizontal {
    display: flex;
    padding: 24px;
    .item-number-group {
      &__header {
        display: flex;
        flex-direction: column;
        justify-content: center;
        margin: 0px;
        margin-right: 24px;
        padding-right: 24px;
        border-right: 1px solid #ddd;
      }
    }
    .item-number-list {
      flex: 1;
      .item-number {
        border: none;
      }
    }
  }
}
</style>
<template>
  <div
    :class="{'is-horizontal': horizontal}"
    :style="{
      height: height + 'px'
    }"
    class="item-number-group">
    <div v-if="$slots.header || header" class="item-number-group__header">
      <slot name="header">{{ header }}</slot>
    </div>
    <div class="item-number-list">
      <slot/>
    </div>
    <div v-if="$slots.footer || footer" class="item-number-group__footer">
      <slot name="footer">{{ footer }}</slot>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
export default {

  components: {},
  props: {
    header: {},
    footer: {},
    height: [String, Number],
    horizontal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
