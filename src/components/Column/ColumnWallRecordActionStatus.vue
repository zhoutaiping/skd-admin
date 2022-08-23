<template>
  <div>
    {{ data.action | labelView(ACTION_TYPE) }}
  </div>
</template>

<script>
import { ACTION_TYPE } from '@/constants/cloud-wall'

const COLOR = {
  anticc_default: 'primary',
  anticc_normal: 'primary',
  anticc_strict: 'primary',
  anticc_captcha: 'primary',
  deny: 'danger',
  block: 'danger',
  pass: 'success',
  pass_cc: 'success',
  pass_waf: 'success'
}

export default {
  props: {
    data: Object
  },

  data() {
    return {
      ACTION_TYPE,
      COLOR
    }
  }
}
</script>
