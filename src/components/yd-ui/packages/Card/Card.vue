<style lang="scss">
.yd-card {
  position: relative;
  padding: 16px;
  background: #fff;

  .DmData {
    box-shadow: none;
    border: 1px solid $--border-color-base;

    .DmTable{
      border: none;
    }
  }

  &__action {
    position: absolute;
    right: 16px;
    top: 16px;
    text-align: right;
  }

  h2.yd-card__title {
    font-weight: 500;
    color: $--color-text-primary;
    font-size: 15px;
    margin-bottom: 12px;
  }

  &.is-border {
    border: 1px solid $--border-color-base;
  }

  &__body {
    clear: both;
    height: 100%;
  }

  &__text--tips {
    color: $--color-text-regular;
    font-size: 14px;
    line-height: 30px;
    margin-bottom: 16px;
    max-width: 800px;

    a {
      cursor: pointer;
      color: $--color-primary;
    }

    &.padding-action {
      padding-right: 220px;
    }
  }
  &.is-horizontal {
    display: flex;

    .yd-card {
      &__header {
        flex: 0 0 180px;
        padding-right: 24px;
      }
      &__body {
        flex: 1;
        overflow: hidden;
      }
      &__action {
        position: absolute;
        right: 16px;
        top: 16px;
        text-align: right;
      }
    }
  }

  &.is-grey {
    padding: 12px;
    background: rgb(251, 251, 251);
  }

  .loader-wp {
    position: absolute;
    z-index: 100;
    left: 0px;
    top: 0px;
    right: 0px;
    bottom: 0px;
    background: rgba(255, 255, 255, 0.5);
    .bouncing-loader {
      position: absolute;
      top: 50%;
      left: 50%;
      margin-left: -50px;
      margin-top: -4px;
      width: 100px;
      height: 8px;
    }
  }
}
</style>

<template>
  <div
    :class="{
      'is-grey': grey,
      'is-horizontal': horizontal,
      'is-border': border,
      'is-loading': loading,
      'is-loading-body': loadingBody
    }"
    :style="{
      height: height + 'px'
    }"
    class="yd-card"
  >
    <yd-loading
      v-if="vLoading"
      :style="{top: `${headerHeight}px`}"
      class="loader-wp"
    />
    <div
      v-if="$slots.header || header || title"
      ref="header"
      class="yd-card__header"
    >
      <h2
        v-if="title"
        class="yd-card__title"
      >{{ title }}</h2>
      <slot name="header">{{ header }}</slot>
    </div>
    <div
      ref="body"
      class="yd-card__body"
    >
      <p
        v-if="$slots.tips"
        :class="{'padding-action': $slots.action}"
        class="yd-card__text--tips"
      >
        <slot name="tips" />
      </p>
      <slot />
    </div>
    <div
      v-if="$slots.action || action"
      class="yd-card__action"
    >
      <slot name="action">{{ action }}</slot>
    </div>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-card
| 卡片组件
*/

const NAME = 'yd-card'

export default {
  name: NAME,

  props: {
    height: [String, Number],
    title: String,
    header: Object,
    action: Object,
    border: Boolean,
    horizontal: {
      type: Boolean,
      default: false
    },
    grey: {
      type: Boolean,
      default: false
    },
    loadingBody: Boolean,
    loading: {
      type: Boolean,
      default: false
    },
    loadingDelay: {
      type: Number,
      default: 0
    }
  },

  data() {
    return {
      vLoading: false,
      headerHeight: 0
    }
  },

  watch: {
    loading(val) {
      this.vLoading = val
      if (val === false && this.loadingDelay > 0) {
        setTimeout(() => {
          this.vLoading = false
        }, this.loadingDelay)
      } else {
        this.vLoading = val
      }
    }
  },

  created() {
    this.vLoading = this.loading
  },

  mounted() {
    if (this.$refs.header && this.loadingBody) this.headerHeight = this.$refs.header.offsetHeight + 15
  }
}
</script>

