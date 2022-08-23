<style lang="scss">
.DmTable {
  position: relative;

  &--border {
    border: 1px solid $--border-color-light;
  }

  &--expandIconVisible {
    .el-table__expand-icon {
      display: none;
    }
  }

  &--primary {
    .el-table {
      thead {
        font-weight: bold;
        color: #fff !important;
        th {
          background: #1664ff;
        }
      }
    }

    .el-checkbox__inner::after {
      border-width: 2px;
      border-color: #1664ff;
    }

    .el-checkbox__input.is-indeterminate .el-checkbox__inner::before {
      background-color: #1664ff;
      height: 3px;
      top: 5px;
    }
    .el-checkbox__input.is-checked .el-checkbox__inner,
    .el-checkbox__input.is-indeterminate .el-checkbox__inner {
      background-color: #fff;
    }
  }

  &--minHeight {
    > .el-table {
      min-height: 480px;
    }
  }

  .el-table {
    font-size: 12px;
    line-height: 1.5px;

    &--medium {
      td {
        padding: 16px 0 !important;
      }
    }

    td {
      padding: 12px 0 !important;
    }

    thead {
      font-weight: bold;
      color: #606266;
    }

    &__empty-block {
      .el-button--text {
        font-size: 12px;
      }
    }
  }

  .btn-add {
    display: block;
    text-align: center;
    height: 48px;
    line-height: 48px;
    border-top: 1px solid $--border-color-light;
    cursor: pointer;

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .yd-icon {
      font-size: 12px;
      margin-right: 4px;
    }

    &__title {
      color: #1664ff;
      font-size: 13px;
    }

    &__desc {
      color: #999;
      font-size: 12px;
    }

    &:hover {
      background: $--color-primary-light-9;
    }

    &:active {
      background: rgb(250, 250, 250);
    }
  }
}
</style>

<template>
  <div :class="[b([type]), b({minHeight, addButton, border, expandIconVisible}), {'is-loading': loading}]">
    <slot />
    <yd-loading
      v-if="loading"
      :style="{top: headerHeight}"
      placement="top"
      opacity
    />
    <div v-if="addButton">
      <a
        :class="{'is-disabled': addButtonDisabled}"
        class="btn-add"
        @click="handleAddRow"
      >
        <span v-if="$slots.btnAdd">
          <slot name="btnAdd" />
        </span>
        <span
          v-else
          class="btn-add__title"
        >
          <yd-icon name="el-icon-plus" />
          {{ addButtonText }}
        </span>
        <span class="btn-add__desc">
          <slot name="add-row-text" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'DmTable',

  props: {
    type: {
      type: String,
      default: 'primary'
    },
    headerHeight: {
      type: String,
      default: '40px'
    },
    expandIconVisible: {
      type: Boolean,
      default: true
    },
    // 添加按钮设置
    addButton: Boolean,
    addButtonText: {
      type: String,
      default: '新增'
    },
    border: Boolean,
    addButtonDisabled: Boolean,
    //
    animate: Boolean,
    loading: Boolean,
    minHeight: Boolean
  },

  methods: {
    handleAddRow() {
      if (this.addButtonDisabled) return
      this.$emit('click-add-button')
    }
  }
})
</script>
