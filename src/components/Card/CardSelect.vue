<style lang="scss">
.cardSelect {
  padding: 12px;
  /* border: 1px solid $--color-primary; */
  background: rgb(246, 248, 250);
  transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
  .text {
    &--null {
      text-align: center;
      color: #999;
      line-height: 30px;
    }
  }

  &__body{
    max-height: 200px;
    overflow: auto;
  }

  &__header {
    overflow: hidden;
    margin-bottom: 8px;
    p {
      font-size: 14px;
      color: #333;
      line-height: 30px;
    }
  }

  &__action {
    overflow: hidden;
    border-bottom: 1px solid #eee;
    padding: 12px 0;
    margin-bottom: 8px;
    line-height: 30px;
  }

  &__footer {
    border-top: 1px solid #eee;
    margin-top: 8px;
    padding-top: 12px;
    text-align: center;
  }

  &__filter {
    padding-top: 6px;
    padding-left: 12px;
  }

  .select {
    &-list {
      &--view {
        background: #FFF;
        /* background: rgb(250, 250, 250); */
        padding: 12px;
        border: 1px solid #dcdfe5;
        transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
        border-radius: 3px;
        cursor: pointer;
        &:hover {
          border-color: $--color-primary;
        }
        .select-item {
          display: inline-block;
          font-size: 12px;
          line-height: 12px;
          margin-right: 12px;
          color: #666;
        }
      }
    }
    &-item {
      padding: 4px 0;
      font-size: 14px;
      color: #333;
    }
  }
}
</style>
<template>
  <yd-card :class="b()" :loading="loading">
    <div :class="b('header')">
      <template v-if="isEdit">
        <InputSearch class="pull-left" @change="handleSearch"/>
        <yd-form-checkbox v-if="filters && filters.length > 0" :class="b('filter')" :checks="filters" class="pull-left"/>
        <div class="pull-right">
          <el-button @click="handleReset">清空已选</el-button>
        </div>
      </template>
      <template v-else>
        <p class="pull-left">已选 {{ value.length }} 个</p>
        <div class="pull-right">
          <el-button type="primary" @click="handleEdit">重新选择</el-button>
        </div>
      </template>
    </div>

    <div v-if="isEdit" :class="b('action')">
      <el-checkbox v-if="checksView.length > 0" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
      <p class="pull-right">已选 {{ val.length }} 个</p>
    </div>

    <div :class="b('body')">
      <yd-scroll>
        <template v-if="checksView.length === 0">
          <p class="text--null">暂无数据</p>
        </template>
        <template v-else>
          <template v-if="isEdit">
            <el-checkbox-group v-model="val" @change="handleChange">
              <el-row class="select-list">
                <el-col v-for="(item, index) in checksView" :span="8" :key="index">
                  <div class="select-item">
                    <el-checkbox :label="item.value" :disabled="item.disabled" :value="item.value">{{ item.label }}</el-checkbox>
                  </div>
                </el-col>
              </el-row>

              <div class="margin-top" style="text-align: center">
                <el-button v-if="showMore" type="primary" plain @click="handleClickMore">加载更多</el-button>
              </div>
            </el-checkbox-group>
          </template>
          <template v-else>
            <div class="select-list select-list--view" @click="handleEdit">
              <div v-for="(item, index) in listView" :key="index" class="select-item">
                {{ item.label }}
              </div>
            </div>
          </template>
        </template>
      </yd-scroll>
    </div>
    <div v-if="isEdit" :class="b('footer')">
      <template>
        <el-button @click="handleCancel">取消</el-button>
        <el-button :disabled="val.length === 0" type="primary" @click="handleSubmit">确定</el-button>
      </template>
    </div>
  </yd-card>
</template>

<script>
import create from '@/utils/create-basic'
import { arrayDedupe } from '@/utils/array'
import InputSearch from '@/components/Input/InputSearch'

export default create({
  name: 'cardSelect',
  components: { InputSearch },

  props: {
    value: Array,
    loading: Boolean,
    filters: {
      type: Array,
      default: () => []
    },
    checks: {
      type: Array,
      default: () => []
    },
    showMore: Boolean
  },

  data() {
    return {
      isEdit: false,
      val: this.value,
      isIndeterminate: false,
      listView: [],
      checkAll: false,
      keyword: '',
      pagination: {
        total: 0,
        page: 1
      },
      checksFilter: []
    }
  },

  watch: {
    value(val) {
      this.val = val
      this.handleChange()
      this.updateListView()
    }
  },

  computed: {
    checksView() {
      const list = []
      const { checks, keyword } = this

      checks.forEach(item => {
        if (item.label.includes(keyword)) {
          list.push(item)
        }
      })
      return keyword ? list : checks
    }
  },

  methods: {
    handleClickMore() {
      this.pagination.page++
      const { page } = this.pagination
      const keyword = this.keyword
      this.$emit('more', { page, keyword })
    },

    handleSearch(keyword) {
      this.$emit('search', keyword)
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
    // 更新显示列表
    updateListView() {
      this.listView = []
      this.checks.forEach(item => {
        if (this.val.includes(item.value)) this.listView.push(item)
      })
    },

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
    },

    handleEdit() {
      this.val = this.value
      this.isEdit = true
    },

    handleSubmit() {
      this.isEdit = false
      this.updateListView()
      this.$emit('change', this.listView)
      this.$emit('input', this.val)
    },

    handleCancel() {
      this.isEdit = false
    },

    handleReset() {
      this.isIndeterminate = false
      this.val = []
      this.checkAll = false
    }
  }
})
</script>
