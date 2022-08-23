<style lang="scss">
.column-btn-sort {
  .el-button--mini {
    width: 20px;
    height: 20px;
    line-height: 20px;
    font-size: 8px;
    padding: 0px;
  }

  .el-button + .el-button {
    margin-left: 8px;
  }

  .el-button--icon {
    .el-button + .el-button {
      margin-left: 6px;
    }
  }

  .el-button--text {
    .el-button + .el-button {
      margin-left: 4px;
    }

    i {
      font-size: 12px;
    }

    &.is-disabled {
      opacity: 0.5;
    }
  }
}
</style>
<template>
  <div class="column-btn-sort">
    <div v-if="type === 'icon'">
      <el-button
        :disabled="disabled || disabledDown"
        type="primary"
        size="mini"
        icon="el-icon-arrow-down"
        circle
        @click="handleClick('down')"
      />
      <el-button
        :disabled="disabled || disabledUp"
        type="primary"
        size="mini"
        icon="el-icon-arrow-up"
        circle
        @click="handleClick('up')"
      />
    </div>
    <div v-if="type === 'text'">
      <el-tooltip
        content="置顶"
        placement="top"
      >
        <el-button
          v-if="showEdge"
          :disabled="disabled || disabledUp"
          type="text"
          @click="handleClick('set-up')"
        ><i class="ya-iconfont ya-arrow-to-top" /></el-button>
      </el-tooltip>
      <el-tooltip
        content="上移"
        placement="top"
      >
        <el-button
          :disabled="disabled || disabledUp"
          type="text"
          @click="handleClick('up')"
        ><i class="ya-iconfont ya-long-arrow-up" /></el-button>
      </el-tooltip>
      <el-tooltip
        content="下移"
        placement="top"
      >
        <el-button
          :disabled="disabled || disabledDown"
          type="text"
          @click="handleClick('down')"
        ><i class="ya-iconfont ya-long-arrow-down" /></el-button>
      </el-tooltip>
      <el-tooltip
        content="置底"
        placement="top"
      >
        <el-button
          v-if="showEdge"
          :disabled="disabled || disabledDown"
          type="text"
          @click="handleClick('set-down')"
        ><i class="ya-iconfont ya-arrow-to-bottom" /></el-button>
      </el-tooltip>
    </div>
  </div>
</template>

<script>
const NAME = 'ColumnBtnSort'

export default {
  name: NAME,

  props: {
    type: {
      type: String,
      default: 'icon'
    },
    showEdge: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    disabledUp: {
      type: Boolean,
      default: false
    },
    disabledDown: {
      type: Boolean,
      default: false
    }
  },

  methods: {
    handleClick(action) {
      this.$emit(`on-${action}`)
    }
  }
}
</script>
