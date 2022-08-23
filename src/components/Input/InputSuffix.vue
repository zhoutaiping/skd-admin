<style lang="scss">
.yd-popup-suffix{
  &__title{
    margin-bottom: 12px;
    font-size: 12px;
    font-weight: 600;
  }
  &__item{
    margin-bottom: 4px;
  }

  .el-checkbox{
    display: block;
    margin-left: 0px;
    margin-bottom: 4px;
  }
}
</style>

<template>
  <div :class="b()">
    <el-popover
      placement="bottom"
      width="580"
      trigger="click"
    >
      <el-row class="yd-popup-suffix">
        <el-col
          v-for="(item, index) in SUFFIX_LIST"
          :key="index"
          style="width: 20%"
        >
          <div class="yd-popup-suffix__title">{{ item.title }}</div>
          <yd-form-checkbox
            :checks="formatLabel(item.list)"
            v-model="val"
            show-check-all
            @change="handleChange"
          />
        </el-col>
      </el-row>
      <el-input
        slot="reference"
        v-model="valView"
        placeholder="jpg|png|gif"
        @change="handleInputChange"
      />
    </el-popover>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import { SUFFIX_LIST } from '@/constants/suffix'
import { formatLabel } from '@/utils/form'

export default create({
  name: 'InputSuffix',

  props: {
    value: {
      type: [String, Array],
      default() {
        return []
      }
    }
  },

  data() {
    return {
      SUFFIX_LIST,
      val: this.value,
      valView: '',
      formatLabel
    }
  },

  watch: {
    value(val) {
      this.init()
    },

    val(val, oVal) {
      if (val.toString() !== oVal.toString()) this.handleChange(val)
    }
  },

  created() {
    this.init()
    this.handleChange(this.value)
  },

  methods: {
    init() {
      const value = this.value
      if (!Array.isArray(value)) {
        this.value = []
        this.val = []
      }
    },

    handleInputChange() {
      const value = this.value
      const valList = this.valView.split('|').filter(Boolean)
      this.handleChange(Array.from(new Set([...value, ...valList])))
    },

    handleChange(value = []) {
      this.val = value
      const checks = this.val.filter(_ => _)
      this.valView = value.join('|')
      if (value) this.$emit('input', checks)
    }
  }
})
</script>
