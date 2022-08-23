<style lang="scss">
.formItemAction {
  display: flex;
  margin-top: 12px;
  padding-bottom: 12px;
  border-bottom: 1px solid #eee;

  &__body {
    color: #666;
    font-size: 14px;
    line-height: 1.5;
    flex: 1;
  }

  &__action {
    margin-left: 15px;
    width: 150px;
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('body')">
      <slot/>
    </div>
    <div :class="b('action')">
      <slot name="action"/>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'formItemAction'
})
</script>
