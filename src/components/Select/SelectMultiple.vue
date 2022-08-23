<style lang="scss">
.SelectMultiple {
  > .el-button {
    border-radius: 2px;
    transition: 0.15s;
    &:hover {
      border-color: $--color-primary;
    }
  }
  .input-prefix {
    padding: 0px 0;
  }
}

.SelectMultiple__popover {
  padding: 10px;

  .no-data {
    text-align: center;
    padding: 12px;
    font-size: 13px;
  }

  .popover__footer {
    text-align: center;
    border-top: 1px solid #eee;
    padding: 10px;
    button {
      width: 80px;
    }
  }

  .checkbox {
    &-search {
      overflow: hidden;
      padding: 0 10px;
      padding-bottom: 8px;
    }
    &-list {
      &-wrap {
        position: relative;
        z-index: 1;
        padding: 6px 0;
        background: #fff;
      }
      &__scroll {
        flex-direction: column;
        max-height: 300px;
        overflow-x: auto;
        display: flex;
      }
    }

    &-item {
      .el-checkbox {
        display: block;
        padding: 6px 12px;
      }
      &:hover {
        background: rgb(250, 250, 250);
      }
    }
  }
}

.SelectMultiple {
  .el-input__prefix {
    // top: 4px;
  }
  .input__core {
    .el-input__inner {
      padding-left: 15px !important;
    }
  }
}
</style>

<template>
  <span class="SelectMultiple">
    <el-popover
      ref="popover"
      v-model="visible"
      :width="popoverWidth"
      popper-class="SelectMultiple__popover"
      placement="bottom-start"
      trigger="click"
    >
      <div class="checkbox-list-wrap">
        <div class="checkbox-search">
          <InputSearch
            v-model="keyword"
            @change="handleSearch"
          />
          <el-button
            style="margin-left:8px"
            @click="handleReset"
          >清空已选</el-button>
        </div>
        <div class="checkbox-list">
          <div
            v-if="checks.length > 0"
            class="checkbox-item"
          >
            <el-checkbox
              :indeterminate="isIndeterminate"
              v-model="checkAll"
              style="margin-top: 4px"
              class="checkbox-item"
              @change="handleCheckAllChange"
            >全选</el-checkbox>
          </div>
          <template v-else>
            <p class="no-data">暂无数据</p>
          </template>
          <div class="checkbox-list__scroll">
            <yd-scroll>
              <el-checkbox-group
                v-model="val"
                @change="handleChange"
              >
                <div
                  v-for="(item, index) in checksView"
                  :key="index"
                  style="margin-top: 4px"
                  class="checkbox-item"
                >
                  <el-checkbox
                    :label="item.value"
                    :value="item.value"
                  >{{ item.label }}</el-checkbox>
                </div>
              </el-checkbox-group>
            </yd-scroll>
          </div>
        </div>
      </div>
    </el-popover>
    <el-input
      v-popover:popover
      ref="dom"
      :style="{width}"
      :placeholder="value.length > 0 ? '' : text"
      class="input__core"
      type="default"
      readonly="readonly"
    >
      <div
        slot="prefix"
        class="input-prefix"
      >
        <el-tag v-if="value.length > 0">{{ text }}</el-tag>
      </div>
    </el-input>
    <el-checkbox
      v-model="value"
      style="display: none"
    />
  </span>
</template>

<script>
import InputSearch from '@/components/Input/InputSearch'
const NAME = 'SelectMultiple'
import { arrayDedupe } from '@/utils/array'

export default {
  name: NAME,

  components: { InputSearch },

  props: {
    value: Array,
    checks: {
      type: Array,
      default: function() {
        return []
      }
    },
    unit: {
      type: String,
      default: '个'
    },
    width: {
      type: String,
      default: 'auto'
    },
    itemName: {
      type: String,
      default: '网站'
    },
    textAll: {
      type: String,
      default: '选择网站'
    },
    textSubmit: {
      type: String,
      default: '确认查询'
    },
    defaultCheck: {
      type: Boolean,
      default: true
    }
  },

  data() {
    return {
      checkAll: false,
      val: this.value,
      text: '',
      visible: false,
      isIndeterminate: true,
      keyword: '',
      popoverWidth: '220px'
    }
  },

  computed: {
    checksView() {
      const list = []
      const { checks, keyword } = this
      checks.forEach(item => {
        if (typeof item.label === 'string' && item.label.includes(keyword)) {
          list.push(item)
        }
      })

      return keyword ? list : checks
    },
    totalList() {
      const { checks } = this
      if (checks && checks.length > 0) {
        return checks.length
      } else {
        return '--'
      }
    },
    totalValue() {
      const { val } = this
      if (val && val.length > 0) {
        return val.length
      } else {
        return 0
      }
    }
  },

  watch: {
    value(val) {
      this.val = val
      this.handleChange()
      this.updateListView()
      this.$nextTick(() => {
        this.updateText()
      })
    },
    checks(val) {
      if (val && this.val && this.val.length === 0) {
        // this.checkAll = this.defaultCheck
        // this.handleCheckAllChange(true)
      } else {
        this.updateText()
      }
    }
  },

  mounted() {
    this.handleChange()
    this.updateText()
  },

  methods: {
    init() {
      this.keyword = ''
      this.checkAll = this.defaultCheck
      this.handleCheckAllChange()
      this.handleChange()
      this.updateText()
    },
    // 更新显示列表
    updateListView() {
      this.listView = []
      this.checks.forEach(item => {
        if (this.val.includes(item.value)) this.listView.push(item)
      })
    },

    handleSearch(keyword) {
      this.keyword = keyword
      this.handleChange()
    },

    handleCheckAll() {
      this.checkAll = true
      this.handleCheckAllChange()
    },

    handleCheckAllChange() {
      const { checkAll, val, checksView } = this
      const valAll = checksView.filter(_ => !_.disabled).map(_ => _.value)
      if (checkAll) {
        this.val = arrayDedupe(val.concat(valAll))
      } else {
        this.val = []
      }

      this.handleChange()
    },
    // 选择
    handleChange() {
      const { checksView, val } = this
      const valAll = checksView.filter(_ => !_.disabled).map(_ => _.value)

      this.checkAll = true
      this.isIndeterminate = false

      val.forEach(item => {
        if (valAll.includes(item)) this.isIndeterminate = true
      })

      valAll.forEach(item => {
        if (!val.includes(item)) {
          this.checkAll = false
        }
      })
      if (this.checkAll) this.isIndeterminate = false
      this.handleSubmit()
    },

    handleReset() {
      this.isIndeterminate = false
      this.val = []
      this.checkAll = false
      this.handleSubmit()
    },

    updateText() {
      const { val } = this

      if (val && val.length > 0) {
        const first = val[0]
        const firstItem = this.checks.find(_ => _.value === first)
        const firstLabel = firstItem ? firstItem.label : first
        if (val.length === 1) {
          this.text = firstLabel
        } else {
          this.text = `已选 ${firstLabel} 等${this.totalValue}${this.unit}${this.itemName}`
        }
      } else {
        this.text = `选择${this.itemName}`
      }
    },

    handleSubmit() {
      this.$emit('input', this.val)
      this.$emit('submit', this.val)

      this.updateText()
    }
  }
}
</script>
