<template>
  <span :class="b()">
    <el-dropdown
      trigger="click"
      @command="handleClick"
    >
      <el-button
        :disabled="disabled"
        :class="b('text')"
        type="text"
      >{{ value | labelView(selects) }}<i class="el-icon-arrow-down el-icon--right" /></el-button>
      <el-dropdown-menu slot="dropdown">
        <el-dropdown-item
          v-for="(item, index) in selects"
          :command="item.value"
          :key="index"
          :disabled="item.disabled"
        >{{ item.label }}</el-dropdown-item>
      </el-dropdown-menu>
    </el-dropdown>
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnSelect',

  props: {
    value: [String, Number, Boolean],
    selects: {
      type: Array,
      default: function() {
        return []
      }
    },
    disabled: Boolean
  },

  methods: {
    handleClick(cmd) {
      this.$emit('change', cmd)
    }
  }
})
</script>
