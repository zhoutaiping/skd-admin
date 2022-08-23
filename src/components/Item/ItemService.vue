<style lang="scss">
.ItemService {
  display: flex;
  cursor: pointer;
  border: $--border-base;
  height: 80px;
  margin-bottom: -1px;
  margin-right: -1px;

  &__icon {
    display: flex;
    align-items: center;
    padding-left: 20px;
    margin-right: 15px;
    text-align: center;

    i {
      font-size: 30px;
      color: $--color-text-secondary;
    }
  }

  &__body {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    overflow: hidden;
  }

  &__title {
    color: $--color-text-primary;
    font-size: 13px;
    font-weight: 600;
    margin-bottom: 4px;
  }

  &__tips {
    color: $--color-text-placeholder;
    font-size: 12px;
  }

  &:hover {
    .ItemService {
      &__icon {
        i {
          color: $--color-primary;
        }
      }
    }
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('icon')">
      <i
        :class="icon"
        class="ya-iconfont"
      />
    </div>
    <div :class="b('body')">
      <div
        :class="b('title')"
        class="nowrap"
      >{{ title }}</div>
      <div
        :class="b('tips')"
        class="nowrap"
      >{{ tips }}</div>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemService',

  components: {},

  props: {
    title: String,
    icon: String,
    tips: String
  },

  data() {
    return {}
  },

  computed: {},

  methods: {}
})
</script>
