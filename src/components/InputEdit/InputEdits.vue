<template>
  <div class="input-edit">
    <el-input
      :class="{'is-error':validContent}"
      v-model="itemValue"
      :placeholder="placeholder"
      :autosize="{ minRows: 2, maxRows: 4}"
      :type="input_type"
      style="width: 320px; margin-right: 8px"
      @blur="verifyUrl"
      @keyup.enter.native="addItem(itemValue)"
    />
    <el-button
      type="primary"
      @click="addItem(itemValue)"
    >添加</el-button>
    <div class="tag">
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
  name: 'InputEdits',
  props: {
    listData: {},
    input_type:{
      type: String,
      default: 'text'
    },
    noValid: {
      type: Boolean,
      default: true
    },
    placeholder:{
      type: String,
      default: '请输入内容'
    },
    validType: {
      type: String,
      default: ''
    },
    upperLimit: {
      type: String,
      default: '100'
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
      const itemValue = this.itemValue.split('\n')
      switch (this.validType) {
        case '':
          isError = false
          if (typeof this.validRule === 'function') {
            if(itemValue.length){
              itemValue.forEach(item =>{
                isError = this.validRule(item)
              })
            }
          }
          return isError
          break
        case 'domain':
          if(itemValue.length){
            itemValue.forEach(item =>{
              if (!RULE.defenseReferDomain.test(item)) {
                this.validContent = true
              } else {
                this.validContent = false
                isError = false
              }
              return isError
            })
          }
          break
        case 'ip':
          if (itemValue.length){
            itemValue.forEach(item =>{
              if (
                !RULE.ipRangeReg.test(item) &&
                !RULE.cidrREG.test(item)
              ) {
                this.validContent = true
              } else if (
                RULE.ipReg192.test(item) ||
                RULE.ipReg10.test(item) ||
                RULE.ipReg172.test(item)
              ) {
                this.validContent = true
              } else {
                this.validContent = false
                isError = false
              }
            })
          }
          return isError
          break
        default:
          return isError
      }
    },
    handleClose(item) {
      this.listData.splice(this.listData.indexOf(item), 1)
      if(this.listData.length > 100){
        this.$message.error('敏感词的设置上限为100个!')
        return
      }
      this.$emit('updateItem', this.listData)
    },
    addItem(item) {
      const itemValueList = this.itemValue.split('|')
      const itemValue = []
      let find = false
      itemValueList.forEach(item =>{
        if(item !== "" && item !== undefined && item !== null) itemValue.push(item)
      })

      if (!this.itemValue.length) {
        this.$message.error('请输入内容')
        return
      }
      if (this.verifyUrl()) {
        this.$message.error('请输入正确格式')
        return
      }
      
      for (const arrayItem of this.listData) {
         itemValue.forEach(item =>{
            if (Object.is(item, arrayItem)) {
              find = true
            }
         })
      }
      if(find){
        this.$message.error('输入内容已存在')
        return
      }
      if (this.listData.length >= this.upperLimit && Number(this.upperLimit)) {
        this.$message.error('已达规则上线')
        return
      }
      const totalCount = itemValue.length + this.listData.length
      if(totalCount > 100){
        this.$message.error('敏感词的设置上限为100个!')
        return
      }

      itemValue.forEach(item =>{
        this.listData.push(item)
      })
      this.$emit('updateItem', this.listData)
      this.itemValue = ''
    }
  }
}
</script>