<style lang="scss">
.yd-popup-check {
  &__title {
    font-size: 12px;
  }
  &__item {
    margin-top: 8px;
  }
}
</style>

<template>
  <div>
    <el-checkbox
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      @change="handleAllClick"
    >全选</el-checkbox>
    <el-checkbox-group
      v-model="selects"
      class="yd-popup-check__list"
    >
      <div
        v-for="item in list"
        :key="item.value"
        class="yd-popup-check__item"
      >
        <el-checkbox
          :label="item.value"
          @change="handleChange"
        >{{ item.label }}</el-checkbox>
      </div>
    </el-checkbox-group>
  </div>
</template>

<script>

export default {
  props: {
    value: String,
    list: Array
  },

  data() {
    return {
      selects: [],
      isIndeterminate: true,
      listValue: [],
      checkAll: false,
      listView: '',
      isInit: false
    }
  },

  computed: {},

  watch: {
    value(val) {
      this.init()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    init() {
      const { value, selects } = this

      let list
      const _list = []

      if (!this.isInit && value) {
        list = value.split('|')
        this.checkAll = false
        this.isInit = true
      } else {
        list = selects
      }

      if (list.length === 0) {
        this.isIndeterminate = false
      }

      list.forEach(item => {
        item = parseInt(item, 10)
        if (!isNaN(item)) {
          _list.push(item)
        }
      })

      this.selects = _list

      let listView = _list.map(item => {
        return this.list.find(_ => _.value === item).label
      })

      listView = listView.join('|')

      this.$emit('input', listView)
    },

    handleAllClick() {
      const { checkAll } = this
      this.selects = checkAll ? this.list.map(_ => _.value) : []
      this.isIndeterminate = false

      this.handleChange()
    },

    handleChange() {
      const checkedCount = this.list.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.list.length
      this.init()
    }
  }
}
</script>
