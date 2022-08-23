<template>
  <div class="input-edit">
    <el-input :class="{'is-error':validContent}" v-model="itemValue" class="url-input" placeholder="请输入内容" @blur="verifyUrl"/>
    <el-button type="primary" class="add-btn-in" @click="addItem(itemValue)">添加</el-button>
    <div class="tag">
      <el-tag v-for="(item, index) in listData" :closable="true" :close-transition="false" :key="index" class="list-item" type="gray" @close="handleClose(item)">{{ item }}</el-tag>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import RULE from '@/utils/verify'

export default {
  name: 'InputEdit',
  props: {
    listData: {},
    noValid: {
      type: Boolean,
      default: true
    },
    validType: {
      type: String,
      default: ''
    },
    upperLimit: {
      type: String,
      default: '20'
    },
    validRule: Function
  },
  data() {
    return {
      itemValue: '',
      validContent: false
    }
  },
  created() {},
  methods: {
    verifyUrl(value) {
      let isError = true
      switch (this.validType) {
        case '':
          isError = false
          if (typeof this.validRule === 'function') {
            isError = this.validRule(this.itemValue)
          }
          return isError
          break
        case 'domain':
          if (!RULE.defenseReferDomain.test(this.itemValue)) {
            this.validContent = true
          } else {
            this.validContent = false
            isError = false
          }
          return isError
          break
        case 'ip':
          if (
            !RULE.ipRangeReg.test(this.itemValue) &&
            !RULE.cidrREG.test(this.itemValue)
          ) {
            this.validContent = true
          } else if (
            RULE.ipReg192.test(this.itemValue) ||
            RULE.ipReg10.test(this.itemValue) ||
            RULE.ipReg172.test(this.itemValue)
          ) {
            this.validContent = true
          } else {
            this.validContent = false
            isError = false
          }
          return isError
          break
        default:
          return isError
      }
    },
    handleClose(item) {
      this.listData.splice(this.listData.indexOf(item), 1)
      this.$emit('updateItem', this.listData)
    },
    addItem(item) {
      if (!this.itemValue) {
        this.$message({
          showClose: true,
          message: '请输入内容',
          type: 'error'
        })
        return
      }
      if (this.verifyUrl()) {
        this.$message({
          showClose: true,
          message: '请输入正确格式',
          type: 'error'
        })
        return
      }
      for (const arrayItem of this.listData) {
        if (Object.is(this.itemValue, arrayItem)) {
          this.$message({
            showClose: true,
            message: '输入内容已存在',
            type: 'error'
          })
          return
        }
      }
      if (this.listData.length >= this.upperLimit && this.upperLimit) {
        this.$message({
          showClose: true,
          message: '已达规则上线',
          type: 'error'
        })
        return
      }
      this.listData.push(item)
      this.$emit('updateItem', this.listData)
      this.itemValue = ''
    }
  }
}
</script>

<style lang="scss" scoped>

.tag {
  width: 320px;
  margin-bottom: 12px;
}

.el-tag {
  margin-top: 12px;
}

.add-btn-in {
  margin-left: 8px;
}
</style>
