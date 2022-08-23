<style lang="scss">
.yd-popup-suffix{
  .scroll{
    max-height: 580px;
    overflow-x: auto;
    display: flex;
  }

  .ps-container{
    width: 100%;
    padding: 0px;
    padding-bottom: 20px;
  }

  &__title{
    color: #333;
    margin-bottom: 12px;
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
  <div class="yd-popup-suffix">
    <div class="scroll">
      <yd-scroll>
        <el-row>
          <el-col v-for="(item, index) in SUFFIX_LIST" :key="index" style="width: 20%">
            <div class="yd-popup-suffix__title">{{ item.title }}</div>
            <yd-form-checkbox :checks="formatLabel(item.list)" v-model="checks" show-check-all />
          </el-col>
        </el-row>
      </yd-scroll>
    </div>
  </div>
</template>

<script>
import { SUFFIX_LIST } from '@/constants/suffix'
import { deepClone } from '@/utils'
import { formatLabel } from '@/utils/form'

export default {
  props: {
    value: String,
    separator: {
      type: String,
      default: '|'
    }
  },

  data() {
    return {
      SUFFIX_LIST,
      formatLabel,
      selects: this.value,
      checks: []
    }
  },

  watch: {
    value(val) {
      const lastVal = val[val.length - 1]
      this.selects = val
      if (lastVal === '|') return
      this.init()
    },

    checks(val) {
      this.handleChange()
    }
  },

  mounted() {
    this.suffixList = deepClone(SUFFIX_LIST)
    this.init()
  },

  methods: {
    init() {
      const arr = this.value.split(this.separator)
      this.checks = arr
    },

    handleChange() {
      let { checks } = this
      checks = checks.filter(_ => _)
      checks = checks.join(this.separator)
      this.$emit('input', checks)
      this.$emit('change', checks)
    }
  }
}
</script>
