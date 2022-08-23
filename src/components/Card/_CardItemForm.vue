<style lang="scss">
.CardItemForm {
  margin-bottom: 16px;

  .yd-card__body {
    min-height: 90px;
  }

  &__skeleton {
    z-index: 100;
    position: absolute;
    top: 0px;
    bottom: 0px;
    left: 16px;
    right: 16px;
    background: #fff;
  }
}
</style>

<template>
  <yd-card
    :title="title"
    class="CardItemForm"
    horizontal
  >
    <template
      v-if="isInit && isSupport"
      slot="tips"
    >
      <slot name="tips" />
    </template>
    <template
      v-if="isInit && isSupport && !loading"
      slot="action"
    >
      <slot name="action" />
    </template>
    <slot v-if="isInit && isSupport" />
    <p
      v-if="!isSupport"
      slot="tips"
    >
      当前服务不支持，您可以<TipsButton>联系商务</TipsButton>开通此项功能</p>
    <div
      v-if="loading"
      class="CardItemForm__skeleton"
    >
      <yd-skeleton active />
    </div>
  </yd-card>
</template>

<script>
export default {
  name: 'CardItemForm',

  props: {
    title: String,
    isInit: Boolean,
    isSupport: Boolean,
    loading: {
      type: Boolean,
      default: true
    }
  }
}
</script>
