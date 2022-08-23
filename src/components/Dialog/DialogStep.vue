<style lang="scss">
.DialogStep {
  .el-steps {
    padding: 0 50px;
  }
}
</style>

<template>
  <Dialog
    ref="Dialog"
    :width="width"
    :title="titleShow"
    :visible.sync="open"
    class="DialogStep"
    close-on-click-modal
  >
    <el-steps :active="active">
      <el-step
        v-for="(item, index) in steps"
        :key="index"
        :title="item.title"
      />
    </el-steps>
    <slot />
    <div slot="footer">
      <el-button
        v-if="showCancel"
        @click="handleClose"
      >取消</el-button>
      <el-button
        v-if="showPrev"
        @click="handlePrev"
      >上一步</el-button>
      <el-button
        v-if="showNext"
        type="primary"
        @click="handleNext"
      >下一步</el-button>
      <el-button
        v-if="showSubmit"
        :loading="submitLoading"
        type="primary"
        @click="handleSubmit"
      >提交</el-button>
    </div>
  </Dialog>
</template>

<script>
import consoleDialog from '../../mixins/consoleDialog'
import Dialog from './Dialog'

export default {
  name: 'DialogStep',

  components: { Dialog },

  mixins: [consoleDialog],

  props: {
    title: String,
    titleLabel: {
      type: String,
      default: ''
    },
    submitLoading: Boolean,
    mode: {
      type: String,
      default: 'Create'
    },
    width: [String, Number],
    active: {
      type: Number,
      default: 1
    },
    steps: {
      type: Array,
      default: function() {
        return []
      }
    },
    closeOnClickModal: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      open: false
    }
  },

  computed: {
    titleShow() {
      if (this.title) {
        return this.title
      } else {
        return this.mode === 'Edit' ? `修改${this.titleLabel}` : `创建${this.titleLabel}`
      }
    },
    showNext() {
      return this.active < this.steps.length
    },
    showCancel() {
      return this.active === 1
    },
    showPrev() {
      return this.active !== 1
    },
    showSubmit() {
      return this.active === this.steps.length
    }
  },

  methods: {
    handlePrev() {
      this.$emit('update:active', this.active - 1)
    },

    handleNext() {
      this.$emit('next')
      // this.$emit('update:active', this.active + 1)
    },

    handleSubmit() {
      this.$emit('submit')
    }
  }
}
</script>
