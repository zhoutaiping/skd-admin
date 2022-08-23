<style lang="scss">
.ComboTable {
  &__Toolbar {
    margin-bottom: 16px;
    overflow: hidden;
  }
}
</style>
<template>
  <div>
    <template v-if="$slots.header_left || $slots.header_right">
      <div class="ComboTable__Toolbar">
        <div class="pull-left">
          <slot name="header_left" />
        </div>
        <div class="pull-right">
          <slot name="header_right" />
        </div>
      </div>
    </template>
    <div>
      <slot name="body" />
    </div>
    <div>
      <div style="margin-top: 16px">
        <el-pagination
          :page-sizes="dynamicProps.pageSizes"
          :page-size="dynamicProps.pageSize"
          :total="dynamicProps.total"
          :current-page="dynamicProps.currentPage"
          style="text-align: right"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
// import styles from './ComboTable.module.css'
import dynamicProps from 'vue-dynamic-props'

export default {
  mixins: [dynamicProps()],

  props: {
    total: {
      type: Number,
      required: true
    },
    pageSizes: {
      type: Array,
      default: () => [10, 20, 50, 100]
    },
    pageSize: {
      type: Number,
      default: 20
    },
    currentPage: {
      type: Number,
      default: 1
    }
  },

  methods: {
    changeCurrent(page) {
      this.current = page
    },
    handleSizeChange(size) {
      this.dynamicProps.pageSize = size
      const params = [this.dynamicProps.currentPage, this.dynamicProps.pageSize]
      this.$emit('on-size-change', ...params)
      this.$emit('on-page-change', { page: params[0], per_page: params[1] })
    },
    handleCurrentChange(current) {
      this.dynamicProps.currentPage = current
      const params = [this.dynamicProps.currentPage, this.dynamicProps.pageSize]
      this.$emit('on-current-change', ...params)
      this.$emit('on-page-change', { page: params[0], per_page: params[1] })
    }
  }
}
</script>
