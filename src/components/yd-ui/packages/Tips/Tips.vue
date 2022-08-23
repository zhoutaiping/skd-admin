<template>
  <div :class="{'is-border-bottom': borderBottom}" class="yd-tips">
    <slot/>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-tips
| 提示组件
*/

const NAME = 'yd-tips'

export default {
  name: NAME,

  components: {},
  props: {
    borderBottom: {
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

<style lang="scss">
.yd-tips {
  margin: 20px 0;
  line-height: 1.8;
  font-size: 13px;
  &.is-border-bottom {
    padding-bottom: 20px;
    border-bottom: 1px solid #eee;
  }
  strong {
    color: $--color-primary;
    font-weight: 500;
  }
}
</style>
