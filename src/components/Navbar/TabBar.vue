<style lang="scss">
</style>
<template>
  <div :class="b()"/>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'tab-bar',

  props: {
    tabs: Array
  },

  computed: {
    barStyle: {
      cache: false,
      get() {
        if (!this.$parent.$refs.tabs) return {}
        const style = {}
        let offset = 0
        let tabWidth = 0

        this.tabs.every((tab, index) => {
          const $el = this.$parent.$refs.tabs[index]
          if (!$el) { return false }

          if (!tab.active) {
            offset += $el.clientWidth
            return true
          } else {
            tabWidth = $el.clientWidth
            return false
          }
        })

        const transform = `translateX(${offset}px)`
        style.width = tabWidth + 'px'
        style.transform = transform
        style.msTransform = transform
        style.webkitTransform = transform

        return style
      }
    }
  }
})
</script>
