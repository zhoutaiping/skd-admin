<template>
  <div
    :class="[{
               'is-loading': loading,
               'is-border-less': borderLess,
               'is-min-height': openMinHeight,
               'is-add-btn': addBtn
             },
             'yd-table--' + type]
    "
    class="yd-table"
  >
    <yd-loading
      v-if="loading"
      :style="{top: headerHeight}"
      placement="top"
      opacity
    />
    <slot />
    <div v-if="addBtn">
      <a
        :class="{'is-disabled': addDisabled}"
        class="btn-add"
        @click="handleAddRow"
      >
        <span class="btn-add__title">
          <yd-icon name="el-icon-plus" />
          {{ addBtnText }}
        </span>
        <span class="btn-add__desc">
          <slot name="add-row-text" />
        </span>
      </a>
    </div>
  </div>
</template>

<script>
const NAME = 'yd-table'
import { addClass, removeClass } from '@/utils/dom'
// import { createId } from '@/utils/util'

export default {
  name: NAME,

  props: {
    type: {
      type: String,
      default: 'default'
    },
    addBtnText: {
      type: String,
      default: '新增'
    },
    addBtn: Boolean,
    addDisabled: Boolean,
    loading: Boolean,
    borderLess: {
      type: Boolean,
      default: false
    },
    openMinHeight: {
      type: Boolean,
      default: true
    },
    headerHeight: {
      type: String,
      default: '41px'
    },
    // id: {
    //   type: String,
    //   default: createId()
    // },
    animate: Boolean
  },

  watch: {
    loading(val) {
      if (!this.animate) return
      const el = document.querySelector('.el-table__body-wrapper')
      addClass(el, 'animated faster')
      if (!val) {
        addClass(el, 'fadeInUpSim')
      } else {
        removeClass(el, 'fadeInUpSim')
      }
    }
  },

  methods: {
    handleAddRow() {
      if (!this.addDisabled) this.$emit('add-row')
    }
  }
}
</script>

<style lang="scss">
$row-hover-color: rgba($--color-primary, 0.02);
$table-border-color: rgb(223, 229, 236);

.yd-table-end {
  margin-top: 12px;
  &__text {
    margin-left: 12px;
    vertical-align: bottom;
  }
}

.yd-table,
.DmTable {
  position: relative;

  &.is-add-btn {
    .el-table__empty-block {
      display: none;
    }
  }
  .btn-add {
    display: block;
    text-align: center;
    border-bottom: 1px solid $table-border-color;
    height: 48px;
    line-height: 48px;

    &.is-disabled {
      cursor: not-allowed;
      opacity: 0.5;
    }

    .yd-icon {
      font-size: 12px;
      margin-right: 4px;
    }

    &__title {
      color: $--color-primary;
      font-size: 13px;
    }

    &__desc {
      color: #999;
      font-size: 12px;
    }

    &:hover {
      background: $row-hover-color;
    }

    &:active {
      background: rgb(250, 250, 250);
    }
  }
  hr {
    border-top: 1px solid #eee;
    margin: 5px 0px;
    &.dotted {
      border-top: 1px dotted #eee;
    }
  }

  .el-button--text {
    &:active {
      transition: 0.15s;
      opacity: 0.5;
    }
  }

  &.is-loading {
    .el-table__empty-text {
      display: none;
    }
  }

  .yd-form-item {
    margin-bottom: 0px;
  }
  .el-form-item {
    &.hide-error {
      .el-form-item__error {
        display: none;
      }
    }
    &__error {
      line-height: 30px;
      padding-top: 4px;
      position: absolute;
      top: auto;
      left: auto;
      bottom: 0px;
      right: 8px;
    }
  }

  .split-line {
    margin: 0 5px;
    color: rgba(0, 0, 0, 0.4);
  }

  .el-table {
    color: rgba(0, 0, 0, 0.65);

    &__body tr.current-row > td {
      background-color: rgba($--color-primary, 0.2) !important;
    }

    td {
      padding: 12px 0;
      min-height: 60px;
    }

    th {
      background: $--color-primary;
      color: #fff;
      border-top: 1px solid rgb(223, 229, 236);

      div {
        font-weight: 600;
      }
    }

    .el-table__row {
      &:hover > td {
        background-color: rgba($--color-primary, 0.02);
      }
    }
  }

  &.is-min-height {
    .el-table {
      min-height: 400px;
    }
  }

  &-td {
    &--less {
      margin-left: -12px;
    }
    &__action {
      button {
        color: $--color-primary;
        margin-right: 8px;
        &:last-child {
          margin-right: 0px;
        }
        &:hover {
          text-decoration: underline;
        }
      }
    }
  }

  .el-table__footer-wrapper thead div,
  .el-table__header-wrapper thead div {
    background-color: rgba(0, 0, 0, 0);
  }

  &--white {
    .el-table {
      th {
        background-color: #f6f8fa;
        div {
          color: #454951;
        }
      }
    }
  }

  .el-table--enable-row-transition .el-table__body td {
    transition: 0s;
  }
}
</style>
