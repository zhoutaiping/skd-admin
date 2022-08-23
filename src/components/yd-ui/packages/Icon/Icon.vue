<template>
  <span
    :class="name"
    class="yd-icon ya-iconfont"
  />
</template>

<script>
const NAME = 'yd-icon'

export default {
  name: NAME,

  props: {
    name: String
  }
}
</script>
