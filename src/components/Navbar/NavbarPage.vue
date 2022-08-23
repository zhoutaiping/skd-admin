<style lang="scss">
.NavbarPage {
  &__slide {
    z-index: 2;
    position: absolute;
    width: 50px;
    height: 3px;
    bottom: 0px;
    background: $--color-primary;
    transition: 0.1s ease;
  }

  &__scroll {
    position: relative;
    padding-bottom: 2px;
    &:after {
      content: "";
      position: absolute;
      left: 0;
      bottom: 0;
      width: 100%;
      height: 3px;
      background-color: #fff;
      z-index: 1;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('scroll')">
      <navbar-page-item
        v-for="(item, index) in data"
        :ref="item.to === toPath ? 'pageItemActive' : ''"
        :tab="tab"
        :to="{name: item.name, query: $route.query}"
        :active="item.name === value"
        :key="index"
        @click="handleClick"
      >
        {{ item.title || item.label || $t(item.name) }}
      </navbar-page-item>
      <slot />
      <div
        :class="b('slide')"
        :style="{left: slide.left + 'px', width: slide.width + 'px'}"
      />
    </div>
  </div>
</template>

<script>
import NavbarPageItem from './NavbarPageItem'
import TabBar from './TabBar'
import create from '@/utils/create-basic'

export default create({
  name: 'NavbarPage',

  components: { NavbarPageItem, TabBar },

  props: {
    data: Array,
    value: String,
    tab: {
      type: Boolean,
      default: false
    }
  },

  computed: {
    toPath() {
      if (this.tab) {
        return this.value
      } else {
        const { path } = this.$route
        const name = path.split('/')
        return name[name.length - 1]
      }
    }
  },

  data() {
    return {
      slide: {
        left: 0,
        width: 0
      }
    }
  },

  watch: {
    '$route.path': function(val) {
      this.initBar()
    }
  },

  mounted() {
    this.initBar()
  },

  methods: {
    initBar() {
      this.$nextTick(() => {
        const { pageItemActive } = this.$refs
        let el = ''
        if (pageItemActive && pageItemActive[0] && pageItemActive[0].$el) {
          el = pageItemActive[0].$el
        } else {
          el = document.querySelector('.NavbarPage .router-link-active')
        }
        if (!el) return
        const { offsetLeft, offsetWidth } = el

        this.slide.left = offsetLeft
        this.slide.width = offsetWidth
      })
    },

    handleClick(value) {
      this.$emit('input', value)
      this.initBar()
    }
  }
})
</script>
