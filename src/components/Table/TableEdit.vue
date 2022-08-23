<template>
  <div>
    <DmTable>
      <el-table
        :data="data"
        :show-header="showHeader"
        :size="size"
      >
        <slot />
        <el-table-column
          :width="actionWidth"
          prop="name"
          label="操作"
        >
          <template slot-scope="scope">
            <template v-if="scope.row.$edit">
              <el-button
                :size="size"
                type="text"
                @click="handleSaveRow(scope)"
              >保存</el-button>
              <el-button
                :size="size"
                type="text"
                @click="handleCancelRow(scope)"
              >取消</el-button>
            </template>
            <template v-else>
              <el-button
                :size="size"
                type="text"
                @click="handleEditRow(scope)"
              >编辑</el-button>
              <el-button
                :size="size"
                type="text"
                @click="handleRowDelete(scope)"
              >删除</el-button>
            </template>
          </template>
        </el-table-column>
      </el-table>
    </DmTable>
    <div style="margin-top: 12px">
      <slot name="add-form" />
      <el-button
        type="primary"
        @click="handleRowAdd"
      >
        新增
      </el-button>
    </div>
  </div>
</template>

<script>
import create from '../../utils/create-basic'
import formTable from '../../mixins/formTable'

export default create({
  name: 'TableForm',

  mixins: [formTable],

  props: {
    showAddRow: {
      type: Boolean,
      default: true
    },
    editInline: Boolean,
    editRow: Boolean,
    // 启用排序按钮
    sort: Boolean,
    // 快捷添加行
    rowTemplate: Array,
    customAddRow: Boolean,
    size: {
      type: String,
      default: 'small'
    },
    showHeader: {
      type: Boolean,
      default: true
    },
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    row: {
      type: Object,
      default: function() {
        return {}
      }
    }
  },

  computed: {
    actionWidth() {
      let width = 100
      if (this.sort) width += 100
      if (this.editRow) width += 50
      return `${width}px`
    }
  },

  methods: {
    handleEditRow(scope) {
      if (this.editInline) {
        this.$set(scope.row, '$edit', true)
      }
      this.$emit('on-edit-row', scope)
    }
  }
})
</script>
