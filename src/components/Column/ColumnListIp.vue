<style lang="scss">
.columnListIp {
  padding: 8px 0;
}
</style>

<template>
  <div :class="b()">
    <ColumnList :num="5" :list="nList"/>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import ColumnList from './ColumnList'
import { deepClone } from '@/utils'

export default create({
  name: 'ColumnListIp',

  props: {
    list: {
      type: Array,
      default: () => []
    }
  },

  data() {
    return {
      nList: []
    }
  },

  components: { ColumnList },

  watch: {
    list(val) {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const list = deepClone(this.list)
      if (!list) return

      list.forEach(item => {
        item.value = item.value + (item.port ? `:${item.port}` : '')
        item.icon = item.view === 'primary' ? 'item__icon ya-iconfont ya-yun-view-main' : 'item__icon ya-iconfont ya-yun-view-backup'
      })
      this.nList = list
    }
  }
})
</script>
