<style lang="scss">
.listSettingItem {
  display: flex;
  padding: 12px 0;
  &__header {
    width: 180px;
    font-size: 14px;
    color: #666;
  }

  &__body {
    flex: 1;
    font-size: 13px;
  }

  /* &__footer{
    width: 100px;
  } */

  .el-button {
    padding: 0px;
  }
}
</style>
<template>
  <div :class="b()">
    <div :class="b('header')">
      {{ title }}
    </div>
    <div :class="b('body')">
      <slot/>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'listSettingItem',
  props: {
    title: ''
  }
})
</script>
