<style lang="scss">
.PopoverInput {
  &__text {
    cursor: pointer;
    &:hover,
    &.is-edit {
      color: $--color-primary;
      border-bottom: 1px dotted $--color-primary;
      .PopoverInput {
        &__icon {
          display: inline;
        }
      }
    }
  }

  &__icon {
    display: none;
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
    <DmDialog
      ref="Dialog"
      :title="placeholder"
      width="400px"
      @submit="handleSubmit"
    >
      <el-form>
        <el-form-item>
          <el-input
            ref="Input"
            v-model="content"
            :placeholder="placeholder"
            :maxlength="255"
            clearable
          />
        </el-form-item>
      </el-form>
    </DmDialog>
    <span
      :class="[b('text'), {'is-edit': visible}]"
      @click="handleOpen()"
    >{{ value }}
      <span
        :class="b('icon')"
        class="el-icon-edit"
      />
    </span>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import column from '@/mixins/column'

export default create({
  name: 'PopoverInput',

  mixins: [column],

  props: {
    value: [String, Number],
    placeholder: {
      type: String,
      default: '输入内容'
    },
    placement: {
      type: String,
      default: 'bottom'
    }
  },

  data() {
    return {
      visible: false,
      content: this.value
    }
  },

  watch: {
    value(val) {
      this.content = val
    }
  },

  methods: {
    handleOpen() {
      this.content = this.value
      this.$refs.Dialog.handleOpen()
    },

    handleSubmit() {
      this.visible = false
      // 未修改或已清空
      if (!this.content || this.value === this.content) {
        this.$refs.Dialog.handleClose()
        return
      }
      this.$emit('submit', this.content)
      this.$refs.Dialog.handleClose()
    }
  }
})
</script>
