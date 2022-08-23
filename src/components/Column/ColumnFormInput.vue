<style lang="scss">
.ColumnFormInput {
  &__edit {
    cursor: pointer;
    color: $--color-primary;
  }

  &:hover {
    .ColumnFormInput {
      &__text {
        color: $--color-primary;
        border-bottom: 1px dotted $--color-primary;
      }
    }
  }
}

.ColumnFormInput {
  &__edit {
    cursor: pointer;
  }

  &:hover {
    .ColumnFormInput {
      &__text {
        cursor: pointer;
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
        :loading="submitLoading"
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
          >{{ valueView }}
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
  name: 'ColumnFormInput',

  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    valueView: String,
    tooltip: {
      type: String,
      default: '编辑'
    },
    fetchSubmit: Function,
    value: {}
  },

  data() {
    return {
      submitLoading: false,
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

    async handleSubmit() {
      this.submitLoading = true
      try {
        await this.fetchSubmit(this.val)
      } catch (e) {
        return
      } finally {
        this.submitLoading = false
      }
      this.visible = false
      this.$emit('input', this.val)
    }
  }
})
</script>
