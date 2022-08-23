<style lang="scss">
.el-tooltip__popper.tooltip--input {
  // word-break: break-all;
  font-size: 12px;
  max-width: 300px;
  padding: 12px;
  border-radius: 0px;
  margin-bottom: 4px !important;
  border: 1px solid #ddd !important;

  .popper__arrow {
    display: none;
  }
}

.popover--checkbox {
  margin-top: 0px !important;
  border-radius: 2px;
  .popper__arrow {
    display: none;
  }
}
</style>
<template>
  <div ref="dom">
    <el-popover ref="popover" :width="popoverWidth" transition="-" popper-class="popover--checkbox" placement="bottom" trigger="click">
      <el-checkbox v-show="indeterminate" :indeterminate="isIndeterminate" v-model="checkAll" @change="handleAllClick">全选</el-checkbox>
      <el-checkbox-group v-model="val" @change="handleChange">
        <div v-for="item in checks" :key="item.value">
          <el-checkbox :label="item.value" :value="item.value">{{ item.label }}</el-checkbox>
        </div>
      </el-checkbox-group>
    </el-popover>
    <el-tooltip :disabled="!valView" :open-delay="500" :content="valView" effect="light" transition="-" placement="top" popper-class="tooltip--input">
      <el-input v-popover:popover v-model="valView" :placeholder="placeholder"/>
    </el-tooltip>
  </div>
</template>

<script>
import { labelView } from '@/utils/filter'

const NAME = 'yd-input-checkbox'

export default {
  name: NAME,

  props: {
    value: [String, Number, Array],
    placeholder: String,
    checks: Array,
    split: {
      type: String,
      default: '|'
    },
    indeterminate: {
      type: Boolean,
      default: false
    }
  },

  data() {
    return {
      popoverWidth: null,
      val: this.value,
      valView: '',
      isIndeterminate: false,
      checkAll: false
    }
  },

  watch: {
    value(val) {
      this.handleChange(val)
    }
  },

  mounted() {
    this.handleChange(this.value)
    this.init()
  },

  methods: {
    init() {
      const $el = this.$refs.dom
      this.popoverWidth = $el.clientWidth - 20
    },
    handleChange(value) {
      const { checks } = this
      const arr = []
      value.forEach(item => {
        arr.push(labelView(item, checks))
      })

      this.valView = arr.join(this.split)
      this.$emit('input', value)
    },

    handleAllClick() {
      const { checkAll } = this
      const val = checkAll ? this.checks.map(_ => _.value) : []
      this.val = val
      this.isIndeterminate = false
      this.handleChange(val)
    }
  }
}
</script>
