<style lang="scss">
.DmData {
  background: #fff;
  overflow: auto;
  box-shadow: 0 2px 3px 0 rgba(0, 0, 0, 0.2);

  &-pagination {
    &__desc {
      line-height: 45px;
      font-size: 13px;
      color: #333;
      font-weight: 600;
    }
  }

  .DmData {
    &-pagination {
      padding: 12px;
      overflow: hidden;
    }
  }
}
</style>

<template>
  <div class="DmData">
    <div class="DmData-table">
      <slot />
    </div>
    <div
      v-if="showPagination"
      class="DmData-pagination"
    >
      <div class="pull-left DmData-pagination__desc">
        <slot name="pagination-desc" />
      </div>
      <div class="pull-right">
        <el-pagination
          :current-page.sync="pagination.page"
          :page-sizes="pageSizes"
          :page-size="pagination.per_page"
          :total="pagination.total"
          layout="total, sizes, prev, pager, next, jumper"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DmData',

  props: {
    pageSizes: {
      type: Array,
      default() {
        return [10, 20, 50, 100]
      }
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    autoInit: {
      type: Boolean,
      default: true
    },
    innerCard: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      pagination: {
        page: 1,
        per_page: 10,
        total: 0
      }
    }
  },

  mounted() {
    if (this.autoInit) this.handleInit()
  },

  methods: {
    handleInit() {
      const pagination = this.pagePagination
      if (pagination && this.$route.meta.rememberPage) {
        const { page, per_page = 10, total } = pagination
        this.pagination.page = page
        this.pagination.per_page = per_page
        this.pagination.total = total
      }
      const { page, per_page } = this.pagination
      this.$emit('init', {
        page,
        per_page,
        size: per_page,
        pagesize: per_page
      })
    },

    getPagination() {
      return {
        ...this.pagination,
        pagesize: this.pagination.per_page,
        size: this.pagination.per_page
      }
    },

    getParams() {
      return this.pagination
    },

    init(options) {
      let { total = 0 } = options
      if (isNaN(total)) total = 0
      this.pagination.total = total
    },

    initPage() {
      this.handleCurrentChange(1)
    },

    handleSizeChange(per_page) {
      this.pagination.per_page = per_page
      this.pagination.page = 1
      this.savePageNumber()
      this.handleInit()
    },

    handleCurrentChange(page) {
      this.pagination.page = page
      this.savePageNumber()
      this.handleInit()
    },

    savePageNumber() {
      const { meta, name } = this.$route
      if (meta.rememberPage) {
        this.SET_PAGINATION({
          name,
          ...this.pagination
        })
      }
    }
  }
}
</script>
