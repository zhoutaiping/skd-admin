<template>
  <span
    v-if="appAssets.afterKF"
    :class="b()"
  >
    <template v-if="button">
      <el-button @click="Help.openServicePanel(appAssets.afterKF)">
        <slot />{{ title }}
      </el-button>
    </template>
    <template v-else>
      <a @click="Help.openServicePanel(appAssets.afterKF)">
      <slot />{{ title }}</a>
    </template>
  </span>
  <span v-else>
    <slot />{{ title }}
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'TipsButton',

  props: {
    button: Boolean,
    title: String
  }
})
</script>
