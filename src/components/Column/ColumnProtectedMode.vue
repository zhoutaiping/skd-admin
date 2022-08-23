<template>
  <el-tooltip
    v-if="open"
    content="已接入"
    placement="top"
  >
    <yd-icon-status
      class="el-icon-circle-check"
      status="success"
    />
  </el-tooltip>
  <el-tooltip
    v-else
    content="未接入"
    placement="top"
  >
    <yd-icon-status
      class="el-icon-circle-close"
      status="default"
    />
  </el-tooltip>
</template>

<script>
/*
+-----------------------------------------------------------------------------------------------------------------------
| Yundun
+-----------------------------------------------------------------------------------------------------------------------
| 网站接入状态
|
*/

export default {
  props: {
    data: Object
  },

  computed: {
    open() {
      const { protected_mode, use_yundun_cname, use_yundun_dns } = this.data
      if (protected_mode === '1') {
        if (use_yundun_cname === '1') {
          return true
        } else {
          return false
        }
      } else if (protected_mode === '2') {
        if (use_yundun_dns === '1') {
          return true
        } else {
          return false
        }
      }
    }
  }
}
</script>
