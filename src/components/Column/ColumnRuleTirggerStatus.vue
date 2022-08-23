<style lang="scss">
.column-rule-tirgger-status {
  .icon {
    color: $--color-success;
    margin-right: 5px;
  }
  .text--desc {
    line-height: 1;
    margin: 0px;
  }
}
</style>

<template>
  <div class="column-rule-tirgger-status">
    <yd-icon name="icon el-icon-circle-check"/>已拦截
    <p class="text--desc">匹配中 CC防护策略</p>
  </div>
</template>

<script>
export default {

  components: {},
  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
}
</script>
