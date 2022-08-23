<style lang="scss">
.ButtonCollapse {
  i {
    margin-left: 8px;
  }
}
</style>

<template>
  <a
    :class="b([value ? 'active' : ''])"
    @click="$emit('click')"
  ><slot/> <i
    :class="value ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"
  /></a>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ButtonCollapse',

  props: {
    value: Boolean
  }
})
</script>
