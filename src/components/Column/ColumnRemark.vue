<style lang="scss">
.ColumnRemark {
  &__edit {
    cursor: pointer;
    color: $--color-primary;
  }

  &:hover {
    .ColumnRemark {
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
        <el-form-item label="编辑备注">
          <el-input
            ref="Input"
            v-model="remark"
            placeholder="备注"
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
          content="编辑备注"
          placement="top-start"
        >
          <span v-if="row.remark" :class="b('text')">{{ row.remark }}
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
import column from '@/mixins/column'
import { deepClone } from '@/utils'

export default create({
  name: 'ColumnRemark',

  mixins: [column],

  data() {
    return {
      visible: false,
      remark: this.row.remark
    }
  },

  watch: {
    row(val) {
      this.remark = val.remark
    }
  },

  methods: {
    popoverShow() {
      this.$nextTick(() => {
        this.$refs.Input.focus()
      })
    },

    handleSubmit() {
      this.visible = false
      const row = deepClone(this.row)
      row.remark = this.remark
      this.$emit('submit', row)
    }
  }
})
</script>
