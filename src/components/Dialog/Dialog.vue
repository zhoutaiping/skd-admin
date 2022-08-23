<style lang="scss">
.Dialog {
  .el-dialog {
    border-radius: 0px !important;

    &__header {
      text-align: left !important;
      border-bottom: 1px solid #eee;
      padding: 16px;

      .el-dialog__close {
        font-size: 14px;
      }
    }

    &__title {
      font-size: 14px;
      padding-left: 12px;
      height: 20px;
      border-left: 3px solid #2d90e6;
    }

    &__body {
      padding: 16px;
    }

    &__footer {
      overflow: hidden;
      padding: 20px;
    }
  }

  .el-form-item {
    &__label {
      font-size: 13px;
    }
  }
}
</style>

<template>
  <el-dialog
    :width="width"
    :close-on-click-modal="closeOnClickModal"
    :title="title"
    :visible.sync="open"
    :center="center"
    class="Dialog"
    @close="handleClose"
  >
    <slot/>
    <div slot="footer">
      <slot name="footer"/>
    </div>
  </el-dialog>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-dialog
| 弹框组件，支持 aside
*/

export default {
  name: 'Dialog',

  props: {
    center: Boolean,
    title: String,
    visible: Boolean,
    width: [String, Number],
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: this.visible
    }
  },

  watch: {
    visible(val) {
      this.open = val
    }
  },

  methods: {
    handleOpen() {
      this.$emit('update:visible', true)
    },

    handleClose() {
      this.$emit('close')
      this.$emit('update:visible', false)
    }
  }
}
</script>
