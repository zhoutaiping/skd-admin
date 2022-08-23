<style lang="scss">
.DmDialog {
  .el-dialog__body {
    position: relative;

    .yd-skeleton {
      display: flex;
      position: absolute;
      top: 0px;
      left: 0px;
      right: 0px;
      bottom: 0px;
      z-index: 1;
      background: #fff;

      &-content{
        padding: 0 16px;
      }
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
    :aside="aside"
    :width="width"
    :append-to-body="appendToBody"
    :close-on-click-modal="closeOnClickModal"
    aside-type="top"
    @close="onClose"
  >
    <yd-skeleton
      v-if="loading"
      active
    />
    <slot />
    <div
      v-if="footer"
      slot="footer"
    >
      <slot name="footer"/>
      <template v-if="actionVisible">
        <el-button
          v-if="showCancel"
          :type="aside ? 'text' : 'default'"
          @click="handleClose"
        >{{ canceText }}</el-button>
        <el-button
          v-if="showSubmit"
          :loading="submitLoading"
          :type="aside ? 'text' : 'primary'"
          @click="handleSubmit"
        >{{ submitText }}</el-button>
      </template>
    </div>
  </yd-dialog>
</template>

<script>
import create from '@/utils/create-basic'
import dialogBase from '@/mixins/dialogBase'

export default create({
  name: 'DmDialog',

  mixins: [dialogBase],

  props: {
    showCancel: {
      type: Boolean,
      default: true
    },
    showSubmit: {
      type: Boolean,
      default: true
    },
    width: {
      type: String,
      default: '500px'
    },

    closeOnClickModal: {
      type: Boolean,
      default: true
    },
    submitText: {
      type: String,
      default: '保存'
    },
    canceText: {
      type: String,
      default: '取消'
    },
    appendToBody: Boolean,
    actionVisible: {
      type: Boolean,
      default: true
    },
    title: {
      type: String,
      default: ''
    },
    footer: {
      type: Boolean,
      default: true
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
    option: {
      type: Object
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
        return this.mode === 'Edit' ? `编辑${this.titleLabel}` : `创建${this.titleLabel}`
      }
    }
  },

  methods: {
    onClose() {
      this.$emit('close')
    },
    // 重置提交 Loading
    resetSubmitLoading() {
      this.submitLoading = false
    },
    // hook: 打开前
    beforeOpen() {
      this.form.resetFields && this.form.resetFields()
      this.resetSubmitLoading()
    },

    async handleSubmit(data) {
      this.submitLoading = true
      if (this.fetchSubmit) {
        try {
          await this.fetchSubmit(data)
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
