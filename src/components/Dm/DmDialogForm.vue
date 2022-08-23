<style lang="scss">
.DmDialogForm {
  .form-create {
    padding: 0px;
  }

  &.yd-dialog{
    .el-dialog__footer{
      // background: rgba($--color-primary, .05);
      text-align: left;
      .el-form-item{
        margin-bottom: 0px;
      }
    }
  }

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
    .DmDialog__header {
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
    :width="width"
    :label-width="labelWidth"
    aside-type="top"
  >
    <a-skeleton
      v-if="loading"
      active
    />
    <slot />

    <div slot="footer">
      <el-form :label-width="labelWidth">
        <el-form-item>
          <el-button
            :loading="submitLoading"
            :type="aside ? 'text' : 'primary'"
            @click="handleSubmit"
          >{{ submitText }}</el-button>
          <el-button
            :type="aside ? 'text' : 'default'"
            @click="handleClose"
          >取消</el-button>
        </el-form-item>
      </el-form>
    </div>
  </yd-dialog>
</template>

<script>
import create from '@/utils/create-basic'
import dialogBase from '@/mixins/dialogBase'

export default create({
  name: 'DmDialogForm',

  mixins: [dialogBase],

  props: {
    width: String,
    submitText: {
      type: String,
      default: '保存'
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
    fetchSubmit: Function,
    mode: {
      type: String,
      default: 'Create'
    },
    labelWidth: {
      type: String,
      default: '100px'
    }
  },

  data() {
    return {
      form: {},
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
      this.form.resetFields && this.form.resetFields()
      this.resetSubmitLoading()
    },
    // hook: 提交前
    async handleSubmit() {
      this.submitLoading = true
      if (this.fetchSubmit) {
        try {
          await this.fetchSubmit()
        } catch (e) {
          this.resetSubmitLoading()
          return
        }
      }
      this.$emit('submit')
    },
    // hook: 验证后
    afterValidate(valid) {
      // 验证不通过
      if (!valid) this.resetSubmitLoading()
    }
  }
})
</script>
