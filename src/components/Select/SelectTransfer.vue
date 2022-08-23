<style lang="scss">
.SelectTransfer {
  width: 600px;
  position: relative;
  display: flex;
  justify-content: space-between;

  &__item{
    width: 45%;
  }

  .InputSearch {
    width: 100%;
  }

  &__center {
    position: absolute;
    display: inline-block;
    width: 20px;
    line-height: 20px;
    left: 50%;
    top: 50%;
    text-align: center;
    margin-left: -10px;
    margin-top: 10px;
  }

  &__panel {
    border: 1px solid rgba(0, 0, 0, 0.1);
    border-radius: 2px;
    background: #fff;

    &Header {
      padding: 12px;
      border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    }

    &Body {
      height: 400px;
      overflow: auto;

      &--selected {
        height: 400px + 57px;
      }
    }
  }

  &__panelItem {
    position: relative;
    display: block;
    padding: 8px 12px;
    margin: 0px;
    border-bottom: 1px solid rgba(0, 0, 0, 0.1);
    font-size: 13px;

    &.is-checked {
      background: rgba($--color-primary, 0.1);

      &:hover {
        background: rgba($--color-primary, 0.1);
      }
    }

    &Remove {
      position: absolute;
      cursor: pointer;
      right: 4px;
      top: 50%;
      text-align: center;
      width: 30px;
      line-height: 30px;
      margin-top: -15px;

      &:hover {
        color: $--color-primary;
      }
    }

    &--null {
      text-align: center;
      font-size: 13px;
      line-height: 30px;

      &:hover {
        background: #fff;
      }
    }

    &:hover {
      background: rgba(0, 0, 0, 0.05);
    }
  }
}
</style>

<template>
  <div :class="b()">
    <div :class="b('item')">
      <strong>选择</strong>
      <div :class="b('panel')">
        <div :class="b('panelHeader')">
          <InputSearch
            v-model="keyword"
            @change="handleSearch"
          />
        </div>
        <div :class="b('panelBody')">
          <el-checkbox
            :indeterminate="isIndeterminate"
            v-model="checkAll"
            :class="b('panelItem')"
            @change="handleCheckAllChange"
          >全选</el-checkbox>
          <el-checkbox-group
            v-model="val"
            @change="handleChange"
          >
            <el-checkbox
              v-for="(item, index) in checksView"
              :class="b('panelItem')"
              :key="index"
              :value="item.value"
              :label="item.value"
            >{{ item.label }}</el-checkbox>
          </el-checkbox-group>
        </div>
      </div>
    </div>
    <!-- 已选择 -->
    <div :class="b('item')">
      <strong>已选择</strong>
      <div :class="b('panel')">
        <div :class="b('panelBody', ['selected'])">
          <template v-if="val.length === 0">
            <div :class="b('panelItem', ['null'])">
              未选择
            </div>
          </template>
          <template v-else>
            <div
              v-for="(item, index) in valList"
              :class="b('panelItem')"
              :key="index"
            >
              {{ item.label }}
              <i
                :class="b('panelItemRemove')"
                class="el-icon-close"
                @click="handleRemoveItem(index)"
              />
            </div>
          </template>
        </div>
      </div>
    </div>
    <div :class="b('center')">
      <i class="el-icon-right" />
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import { arrayDedupe } from '@/utils/array'

export default create({
  name: 'SelectTransfer',

  props: {
    data: {
      type: Array,
      default: function() {
        return []
      }
    },
    value: {
      type: Array,
      default: function() {
        return []
      }
    }
  },

  data() {
    return {
      val: this.value,
      valList: [],
      checkList: [],
      keyword: '',
      checkAll: false,
      isIndeterminate: false
    }
  },

  computed: {
    checksView() {
      const list = []
      const { data, keyword } = this

      data.forEach(item => {
        if (item && item.label && item.label.includes(keyword)) {
          list.push(item)
        }
      })
      return keyword ? list : data
    }
  },

  created() {
    this.handleChange()
  },

  watch: {
    value(val) {
      this.val = val
      this.handleChange()
    }
  },

  methods: {
    handleSearch(keyword) {
      this.keyword = keyword
      this.handleChange()
    },

    // 选择
    handleChange() {
      const valList = []
      this.val.forEach(value => {
        const item = this.data.find(_ => _.value === value)
        if (item && item.label) valList.push(item)
      })
      this.valList = valList

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

    handleSubmit() {
      this.$emit('input', this.val)
      this.$emit('submit', this.val)
    },

    handleRemoveItem(index) {
      this.val.splice(index, 1)
      this.handleChange()
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
    }
  }
})
</script>
