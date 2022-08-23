<style lang="scss">
.TransferItem {
  border-radius: 2px;
  background: #fff;

  &--border {
    border: 1px solid rgba(0, 0, 0, 0.1);

    .TransferItem {
      &__header {
        padding: 12px;
      }

      &__body {
        border: none;
      }
    }
  }

  &__header {
    padding: 12px;
    padding-bottom: 12px;
  }

  &__body {
    position: relative;
  }

  &__topInfo {
    position: absolute;
    background: #fff;
    border-bottom: 1px solid #eee;
    padding: 0 12px;
    left: 0px;
    top: 0px;
    right: 0px;
    line-height: 32px;
    font-size: 12px;
    z-index: 10;
  }

  &__list {
    padding-top: 32px;

    .ps-container {
      height: 350px;
    }
  }

  &__footer {
    text-align: center;
    line-height: 38px;
    font-size: 12px;
    padding: 0 16px;
  }
}
</style>

<template>
  <div :class="b([border ? 'border': ''])">
    <div
      v-if="showSearch"
      :class="b('header')"
    >
      <InputSearch
        :disabled="disabled"
        v-model="keyword"
        placeholder="请输入进行查询"
        style="width: 100%"
        @clear="handleSearch"
        @submit="handleSearch"
      />
    </div>
    <div
      v-loading="loading"
      :class="b('body')"
      element-loading-spinner="el-icon-loading"
    >
      <div
        v-if="multiple"
        :class="b('topInfo')"
      >
        <el-checkbox
          :value="checkAll"
          :indeterminate="isIndeterminate"
          :disabled="disabled"
          @change="handleCheckAllChange"
        >
          全选
        </el-checkbox>
        <template>
          <span class="pull-right">
            <template v-if="totalType==='all'">
              {{ value.length }} / {{ listTotal }}
            </template>
            <template v-else-if="totalType==='root'">
              {{ rootSelectedTotal }} / {{ rootTotal }}
            </template>
          </span>
        </template>
      </div>
      <div :class="b('list')">
        <yd-scroll
          ref="Scroll"
          :settings="{minScrollbarLength: 40}"
        >
          <Tree
            ref="Tree"
            :data="listView"
            :disabled="disabled"
            :indent="24"
            :size="size"
            show-checkbox
            node-key="value"
            @check="handleUpdateValue"
          />
          <div :class="b('footer')">
            <el-button
              v-if="showMore"
              :loading="loading"
              class="button-more"
              type="text"
              @click="loadFetchData"
            >
              已显示{{ list.length }}条（共{{ total }}条）加载更多
            </el-button>
            <template v-else>
              <template v-if="list.length">
                共 {{ list.length }} 条
              </template>
            </template>
          </div>
        </yd-scroll>
      </div>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import Tree from '@/components/Tree'
import { getAllChildNodes } from '@/utils/array'

export default create({
  name: 'TransferItem',

  components: { Tree },

  props: {
    showSearch: {
      type: Boolean,
      default: true
    },
    disabled: {
      type: Boolean,
      default: false
    },
    border: Boolean,
    fetchData: Function,
    conn: {
      type: String,
      default: '<<-->>'
    },
    totalType: {
      type: String,
      default: 'all'
    },
    multiple: {
      type: Boolean,
      default: true
    },
    value: {
      type: Array,
      default: () => {
        return []
      }
    },
    size: {
      type: Number,
      default: 1000
    }
  },

  data() {
    return {
      loading: true,
      list: [],
      current: 1,
      showMore: true,
      keyword: '',
      total: 0,
      listTotal: 0,
      listIds: [],
      rootTotal: 0,
      rootSelectedTotal: 0,
      checkAll: false
    }
  },

  computed: {
    listView() {
      if (typeof this.fetchData === 'function') {
        return this.list
      } else {
        return this.list.filter(_ => _.label.includes(this.keyword))
      }
    },

    isIndeterminate() {
      const checkedCount = this.value.length
      return checkedCount > 0 && checkedCount < this.listTotal
    }
  },

  watch: {
    list(val) {
      // 统计总数
      const allSelect = getAllChildNodes(this.list)
      this.rootTotal = this.list.length
      this.listIds = allSelect
      this.listTotal = allSelect.length
      this.handleUpdate()
    },

    value() {
      this.handleUpdate()
    }
  },

  methods: {
    handleUpdate() {
      this.checkAll = this.list.length && this.value.length === this.listTotal
      if (!this.fetchData) {
        this.listTotal = this.list.length
        this.total = this.list.length
      }
      this.$nextTick(() => {
        this.$emit('update', {
          total: this.listTotal, // 可选择的条数（包含子项)
          allTotal: this.total, // 数据总条数
          rootTotal: this.rootTotal
        })
      })
    },

    handleUpdateValue(node, nodes) {
      const { checkedNodes, halfCheckedKeys } = nodes
      const ids = checkedNodes.map(_ => _.value)
      // 父级选中个数
      this.rootSelectedTotal = halfCheckedKeys.length + ids.filter(_ => !_.includes(this.conn)).length
      this.$emit('input', ids)
    },

    async init() {
      this.current = 1
      this.showMore = true
      this.list = []
      this.keyword = ''

      await this.loadFetchData(true)
      this.$refs.Tree.setCheckedKeys(this.value)
    },

    async clear() {
      this.current = 1
      this.showMore = true
      this.keyword = ''
      this.list = []
    },

    async handleSearch() {
      this.showMore = true
      this.current = 1

      await this.loadFetchData(true)
      this.$nextTick(() => {
        // this.$refs.Scroll.$el.scrollTo(0, 0)
        this.$refs.Tree.setCheckedKeys([])
      })
    },
    // 全选
    handleCheckAllChange(val) {
      if (val) {
        this.$refs.Tree.setCheckedKeys(this.listIds)
        this.$emit('input', this.listIds)
      } else {
        this.$refs.Tree.setCheckedKeys([])
        this.$emit('input', [])
      }
    },

    handleRemoveItem(index) {
      const item = this.list.splice(index, 1)
      this.$emit('on-remove', item[0])
    },

    async loadFetchData(refresh = false) {
      this.loading = true
      if (typeof this.fetchData === 'function') {
        const { total, list } = await this.fetchData({
          per_page: this.size,
          page: this.current,
          keyword: this.keyword
        })

        this.total = total
        if (refresh === true) {
          this.list = list
          this.$nextTick(() => {
            // this.$refs.Scroll.$el.scrollTo(0, 0)
          })
        } else {
          this.list.push(...list)
        }

        if (list.length === this.size) {
          this.current++
        } else {
          this.showMore = false
        }
      } else {
        this.showMore = false
      }

      this.loading = false
    },
    /* --- 外部调用 --- */
    unshiftItem(item) {
      this.list.unshift(item)
      this.handleUpdate()
    },

    unshiftList(list) {
      this.list.unshift(...list)
      this.handleUpdate()
    },

    pushItem(item) {
      this.list.push(item)
      this.handleUpdate()
    },

    loadSelectedList() {
      const selectedIds = this.value
      if (selectedIds.length) this.checkAll = false
      // const list = this.list.filter(_ => selectedIds.includes(_.value))
      const list = this.list
      const loadList = []
      selectedIds.forEach(value => {
        const item = list.find(_ => _.value === value)
        const index = list.indexOf(item)
        list.splice(index, 1)
        loadList.push(item)
      })

      this.$emit('input', [])
      return loadList
    }
  }
})
</script>
