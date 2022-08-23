<style lang="scss">
.ColumnPopoverInput {
  &__edit {
    cursor: pointer;
    color: $--color-primary;
  }

  &:hover {
    .ColumnPopoverInput {
      &__text {
        cursor: pointer;
        color: $--color-primary;
        border-bottom: 1px dotted $--color-primary;
      }

      &__edit {
        display: inline;
      }
    }
  }
  &__popover {
    .el-popover__title {
      font-size: 15px;
    }
  }
}
</style>

<template>
  <div :class="b()">
    <el-popover
      v-model="visible"
      :popper-class="b('popover')"
      placement="bottom"
      width="200"
      trigger="click"
      @show="popoverShow"
    >
      <el-form>
        <el-form-item>
          <el-input
            ref="Input"
            v-model="val"
            :placeholder="placeholder"
          />
        </el-form-item>
      </el-form>
      <el-button
        size="mini"
        type="primary"
        @click="handleSubmit"
      >确定</el-button>
      <template slot="reference">
        <el-tooltip
          :content="tooltip"
          placement="top-start"
        >
          <span
            v-if="value"
            :class="b('text')"
          >{{ value }}
          </span>
          <span
            v-else
            :class="b('edit')"
            class="el-icon-edit"
          />
        </el-tooltip>
      </template>
    </el-popover>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnPopoverInput',

  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    tooltip: {
      type: String,
      default: '编辑'
    },
    value: {}
  },

  data() {
    return {
      visible: false,
      val: this.value
    }
  },

  watch: {
    value(val) {
      this.val = val
    }
  },

  created() {
    this.val = this.value
  },

  methods: {
    popoverShow() {
      this.$nextTick(() => {
        this.$refs.Input.focus()
      })
    },

    handleSubmit() {
      this.visible = false
      this.$emit('submit', this.val)
      this.$emit('input', this.val)
    }
  }
})
</script>
