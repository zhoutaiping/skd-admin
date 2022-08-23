<template>
  <div :class="'mode-' + mode" class="yd-form">
    <el-form ref="form" :label-width="labelWidth" :model="options" :rules="options.$rules" :label-position="labelPosition">
      <slot/>
    </el-form>
  </div>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| yd-form
| 表单组件，推荐配合 Form service 使用
*/

import ElForm from './el-form'
const NAME = 'yd-form'

export default {
  name: NAME,

  components: { ElForm },
  props: {
    labelWidth: String,
    mode: String,
    labelPosition: String,
    options: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  methods: {
    // async check() {
    //   try {
    //     this.$refs.form.validate((valid, obj) => {
    //       if (!valid) {
    //         throw new Error(JSON.stringify(obj))
    //       }
    //     })
    //   } catch (e) {
    //     const obj = JSON.parse(e.message)
    //     return obj
    //   }
    //   return true
    // },
    validate(callback) {
      return this.$refs.form.validate(callback)
    }
  }
}
</script>
<style lang="scss">

.yd-form-item--flex {
  .el-select {
    width: 100%;
  }
  > .el-form-item__content {
    display: flex;
  }
  .item--main {
    flex: 1;
  }
  .item--less {
    width: 110px;
  }
}

.yd-form {
  &.mode-in-table {
    .el-form-item {
      margin-bottom: 0px;
    }
  }
  .el-form--label-top {
    .el-form-item__label {
      font-size: 14px;
      padding-bottom: 14px;
      color: #333;
    }
  }

  .is-inline-error {
    .el-input {
      position: relative;
      z-index: 2;

      &__inner {
        background: transparent;
      }
    }

    .el-form-item__error {
      line-height: 30px;
      padding-top: 0;
      position: absolute;
      top: 0;
      left: auto;
      bottom: 0;
      right: 45px;
      text-align: right;
      z-index: 1;
    }
  }
}
</style>
