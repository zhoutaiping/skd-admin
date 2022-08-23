<style lang="scss">
.ColumnRouter {
  a {
    color: $--color-primary;
  }
}
</style>

<template>
  <div :class="b()">
    <el-button
      v-if="disabled"
      disabled
      type="text"
    >
      <slot />
    </el-button>
    <router-link
      v-else
      :to="{path, append}"
    >
      <slot />
    </router-link>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnRouter',

  props: {
    domain: String,
    path: String,
    append: Boolean,
    disabled: Boolean
  }
})
</script>
