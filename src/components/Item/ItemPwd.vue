<style lang="scss">
.ItemPwd {
  display: inline-block;

  &__core {
    display: flex;
  }

  i {
    font-size: 13px;
    cursor: pointer;
    margin-left: 8px;
  }
}
</style>

<template>
  <span :class="b()">
    <span :class="b('core')">
      <template v-if="isView">
        {{ value }}
      </template>
      <template v-else>
        ******
      </template>
      <i
        :class="isView ? 'ya-eye' : 'ya-eye1'"
        class="ya-eye ya-iconfont"
        @click="isView = !isView"
      />
      <!--  -->
    </span>
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemPwd',

  props: {
    value: String
  },

  data() {
    return {
      isView: false
    }
  }
})
</script>
