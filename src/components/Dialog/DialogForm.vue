<style lang="scss">
.DialogForm {
  .el-dialog__body {
    position: relative;

    .ant-skeleton {
      display: flex;
      position: absolute;
      padding: 16px;
      padding-top: 0px;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 1;
      background: #fff;
    }
  }

  .yd-alert {
    margin-bottom: 16px;
  }
  &--aside {
    .DialogForm__header {
      margin-top: 12px;
    }
  }
}
</style>

<template>
  <yd-dialog
    :class="b([aside])"
    :title="titleShow"
    :visible.sync="visible"
    :aside="aside"
    :width="width"
    aside-type="top"
  >
    <a-skeleton
      v-if="loading"
      active
    />
    <div
      v-if="this.$slots.header"
      :class="b('header')"
    >
      <slot name="header" />
    </div>
    <el-form
      ref="form"
      :model="value"
      :rules="rules"
      :label-width="labelWidth"
    >
      <slot />
    </el-form>
    <div slot="footer">
      <el-button
        :type="aside ? 'text' : 'default'"
        @click="handleClose"
      >取消</el-button>
      <el-button
        :loading="submitLoading"
        :type="aside ? 'text' : 'primary'"
        @click="handleSubmit"
      >保存</el-button>
    </div>
  </yd-dialog>
</template>

<script>
import create from '../../utils/create-basic'
import dialogBase from '../../mixins/dialogBase'
import form from '../../mixins/form'

export default create({
  name: 'DialogForm',

  mixins: [dialogBase, form],

  props: {
    width: String,
    labelWidth: {
      type: String,
      default: '120px'
    },
    title: {
      type: String,
      default: ''
    },
    aside: Boolean,
    titleLabel: {
      type: String,
      default: ''
    },
    loading: Boolean,
    mode: {
      type: String,
      default: 'Create'
    }
  },

  data() {
    return {
      submitLoading: false
    }
  },

  computed: {
    titleShow() {
      if (this.title) {
        return this.title
      } else {
        return this.mode === 'Edit' ? `修改${this.titleLabel}` : `创建${this.titleLabel}`
      }
    }
  },

  methods: {
    // 重置提交 Loading
    resetSubmitLoading() {
      this.submitLoading = false
    },
    // hook: 打开前
    beforeOpen() {
      this.resetSubmitLoading()
    },
    // hook: 提交前
    beforeSubmit() {
      this.submitLoading = true
    },
    // hook: 验证后
    afterValidate(valid) {
      // 验证不通过
      if (!valid) this.resetSubmitLoading()
    }
  }
})
</script>
