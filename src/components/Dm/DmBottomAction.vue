<style lang="scss">
.DmBottomAction {
  position: sticky;
  display: flex;
  bottom: 0px;
  left: 0px;
  right: 0px;
  padding: 16px 20px;
  z-index: 100;
  background: #fff;
  border: 1px solid $--border-color-lighter;
  box-shadow: 0 1px 2px 0 rgba(9, 18, 26, 0.06),
    0 4px 8px 0 rgba(39, 56, 73, 0.08);
}
</style>

<template>
  <div :class="b()">
    <!--  -->
    <slot />
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmBottomAction',

  components: {},

  props: {},

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
