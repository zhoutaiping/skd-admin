<style lang="scss">
.SelectSwitch {
  .el-input__prefix {
    display: flex;
    font-size: 18px;
    text-align: center;
    align-items: center;
    left: 10px;
  }
}
</style>

<template>
  <el-select
    :class="b()"
    v-model="val"
    :disabled="disabled"
    placeholder="请选择"
    @change="handleChange"
  >
    <el-option-group>
      <el-option
        v-for="(item, index) in selectSwitch"
        :key="index"
        :label="item.label"
        :value="item.value"
      >
        <span style="float: left">{{ item.label }}</span>
        <span
          v-if="item.value === onValue"
          style="float: right; font-size: 15px"
        >
          <i class="el-icon-open color--primary" />
        </span>
        <span
          v-if="item.value === offValue"
          style="float: right; font-size: 15px"
        >
          <i class="el-icon-turn-off color--primary" />
        </span>
      </el-option>
    </el-option-group>
    <el-option-group v-if="selects.length">
      <el-option
        v-for="(item, index) in selects"
        :key="index"
        :label="item.label"
        :value="item.value"
      />
    </el-option-group>
  </el-select>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'SelectSwitch',

  props: {
    value: [Boolean, String, Number],
    selects: {
      type: Array,
      default() {
        return []
      }
    },
    onVisible: {
      tyoe: Boolean,
      default: true
    },
    offVisible: {
      tyoe: Boolean,
      default: true
    },
    onValue: {
      type: [Boolean, String, Number],
      default: true
    },
    offValue: {
      type: [Boolean, String, Number],
      default: false
    },
    disabled: Boolean
  },

  data() {
    return {
      val: this.value,
      selectSwitch: []
    }
  },

  watch: {
    value() {
      this.val = this.value
    },

    onValue() {
      this.selectSwitch()
    },

    offValue() {
      this.selectSwitch()
    }
  },

  created() {
    this.initSelectSwitch()
  },

  methods: {
    handleChange(val) {
      this.$emit('input', val)
      this.$emit('change', val)
    },

    initSelectSwitch() {
      const selectSwitch = []
      if (this.onVisible) {
        selectSwitch.push(
          {
            label: 'ON',
            value: this.onValue
          },
        )
      }
      if (this.offVisible) {
        selectSwitch.push(
          {
            label: 'OFF',
            value: this.offValue
          }
        )
      }
      this.selectSwitch = selectSwitch
    }
  }
})
</script>
