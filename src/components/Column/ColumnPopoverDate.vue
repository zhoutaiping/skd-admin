<style lang="scss">
.ColumnPopoverDate {
  &__edit {
    cursor: pointer;
  }

  a[disabled] {
    color: #c0c4cc;

    .ColumnPopoverDate {
      &__edit {
        color: #c0c4cc;
      }
      &__text {
        color: #c0c4cc;
        border-color: #c0c4cc;
      }
    }
  }

  &:hover {
    .ColumnPopoverDate {
      &__text {
        cursor: pointer;
      }

      &__edit {
        display: inline;
      }
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
      width="280"
      trigger="click"
    >
      <el-form>
        <el-form-item>
          <!-- <el-input
            ref="Input"
            v-model="val"
            :placeholder="placeholder"
          /> -->
          <el-date-picker
            v-model="val"
            value-format="yyyy-MM-dd"
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
          :disabled="disabled"
          placement="top-start"
        >
          <template>
            <a
              v-if="$slots.default"
              :disabled="disabled"
            >
              <slot />
            </a>
            <a
              v-else
              :disabled="disabled"
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
            </a>
          </template>
        </el-tooltip>
      </template>
    </el-popover>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ColumnPopoverDate',

  props: {
    placeholder: {
      type: String,
      default: '请输入'
    },
    disabled: Boolean,
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
