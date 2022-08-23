<style lang="scss">
.FormCheckbox {
  .label {
    white-space: nowrap;
    text-overflow: ellipsis;
    overflow: hidden;
    word-break: break-all;
  }
}
</style>

<template>
  <div class="FormCheckbox">
    <el-checkbox
      v-if="showCheckAll"
      :indeterminate="isIndeterminate"
      v-model="checkAll"
      class="FormCheckbox__checkall"
      @change="handleCheckAllChange"
    >{{ checkAllLabel }}</el-checkbox>
    <el-checkbox-group
      v-model="val"
      @change="handleCheckedCitiesChange"
    >
      <template v-if="span">
        <el-row>
          <el-col
            v-for="item in checks"
            :span="span"
            :key="item.value"
            class="label"
          >
            <el-checkbox
              :disabled="item.disabled"
              :label="item.value"
            >{{ item.label }}</el-checkbox>
          </el-col>
        </el-row>
      </template>
      <template v-else>
        <el-checkbox
          v-for="item in checks"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.value"
        >{{ item.label }}</el-checkbox>
      </template>
    </el-checkbox-group>
  </div>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'yd-form-checkbox',

  props: {
    span: Number,
    checkAllLabel: {
      type: String,
      default: '全选'
    },
    size: {
      type: String,
      default: ''
    },
    checks: {
      type: Array,
      default: () => {
        return []
      }
    },
    value: {
      type: Array,
      default: () => []
    },
    showCheckAll: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      val: this.value,
      checkAll: false,
      isIndeterminate: false
    }
  },

  watch: {
    val(val) {
      this.$emit('input', val)
    },

    value(val) {
      this.val = val
      this.handleCheckedCitiesChange(val)
    }
  },

  mounted() {
    this.handleCheckedCitiesChange(this.val)
  },

  methods: {
    handleCheckAllChange(val) {
      const checksAll = this.checks.map(_ => _.value)
      const _val = new Set(this.val)
      if (val) {
        checksAll.forEach(item => _val.add(item))
      } else {
        checksAll.forEach(item => _val.delete(item))
      }
      this.val = [..._val]
      this.isIndeterminate = false
    },

    handleCheckedCitiesChange(value) {
      const checkMap = this.checks.map(_ => _.value)
      const valueFilter = value.filter(_ => checkMap.includes(_))
      const checkedCount = valueFilter.length
      this.checkAll = checkedCount === this.checks.length
      this.isIndeterminate = checkedCount > 0 && checkedCount < this.checks.length
      this.$emit('change', value)
    }
  }
})
</script>
