<style lang="scss">
.navbar-page-item {
  display: inline-block;

  &:not(:first-child) {
    margin-left: 20px;
  }

  a {
    display: inline-block;
    color: #000;
    line-height: 40px;
    height: 40px;
    font-size: 14px;
    padding: 0 0px;
    cursor: pointer;

    &.router-link-active {
      font-weight: 600;
      border-color: $--color-primary;
    }
  }
}
</style>
<template>
  <div class="navbar-page-item">
    <template v-if="tab">
      <a
        :class="{'router-link-active': active}"
        @click="handleClickTab(to)"
      >
        {{ label }}
        <slot />
      </a>
    </template>
    <template v-else>
      <router-link
        v-if="to"
        :to="to"
      >
        {{ label }}
        <slot />
      </router-link>
      <template v-else>
        <a @click="handleClick">
          {{ label }}
          <slot />
        </a>
      </template>
    </template>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'navbarPageItem',

  props: {
    active: Boolean,
    label: String,
    to: [String, Object],
    tab: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick(value) {
      this.$emit('click', value)
    },

    handleClickTab(value) {
      this.$emit('click', value.name)
    }
  }
})
</script>
