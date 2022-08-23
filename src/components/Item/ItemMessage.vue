<style lang="scss">
.ItemMessage {
  height: 35px;
  color: $--color-text-primary;
  font-size: 12px;

  a {
    align-items: center;
    display: flex;

    &:hover{
      color: $--color-primary;
    }
  }

  .dot {
    width: 5px;
    height: 5px;
    border-radius: 100%;
    margin-right: 10px;
    background: $--color-danger;
  }

  &--isRead {
    .dot {
      background: $--color-text-placeholder;
    }

    .ItemMessage {
      &__title {
        color: $--color-text-regular;
      }
    }
  }
  &__title {
    flex: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  &__date {
    color: $--color-text-secondary;
    margin-left: 10px;
  }
}
</style>

<template>
  <div :class="b([item.isRead ? 'isRead' : ''])">
    <router-link :to="{ name: 'message-center.router.MessageList__id', params: {id: item.id}}">
      <i class="dot" />
      <span :class="b('title')">{{ item.title }}</span>
      <span :class="b('date')">{{ item.date }}</span>
    </router-link>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemMessage',

  props: {
    item: Object
  }
})
</script>
