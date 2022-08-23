<template>
  <div class="input-edit">
    <el-input
      :class="{'is-error': validContent}"
      v-model="itemValue"
      :placeholder="placeholder"
      style="width: 250px; margin-right: 8px"
      @blur="verifyUrl"
    />
    <el-button
      type="primary"
      @click="addItem(itemValue)"
    >添加</el-button>
    <div
      class="tag"
      style="margin-top: 8px"
    >
      <el-tag
        v-for="(item, index) in listData"
        :closable="true"
        :close-transition="false"
        :key="index"
        style="margin-right: 8px"
        @close="handleClose(item)"
      >{{ item }}</el-tag>
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
    placeholder: {
      type: String,
      default: '请输入内容'
    },
    validRule: Function
  },
  data() {
    return {
      itemValue: '',
      validContent: false
    }
  },
  created() { },
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
        this.$message.error('请输入内容')
        return
      }
      if (this.verifyUrl()) {
        this.$message.error('请输入正确格式')
        return
      }
      for (const arrayItem of this.listData) {
        if (Object.is(this.itemValue, arrayItem)) {
        this.$message.error('输入内容已存在')
          return
        }
      }
      if (this.listData.length >= this.upperLimit && this.upperLimit) {
        this.$message.error('已达规则上线')
        return
      }
      this.listData.push(item)
      this.$emit('updateItem', this.listData)
      this.itemValue = ''
    }
  }
}
</script>