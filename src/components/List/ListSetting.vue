<style lang="scss">
.listSetting{
  padding-top: 12px ;
  .listSettingItem{
    &:not(:first-child) {
      border-top: 1px solid #eee;
    }
  }
}
</style>
<template>
  <div :class="b()">
    <slot/>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'listSetting'
})
</script>
