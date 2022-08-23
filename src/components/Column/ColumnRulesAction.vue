<style lang="scss">
.yd-column--action {
  .highlight {
    font-weight: 600;
    background: #999;
  }
}
</style>

<template>
  <div class="yd-column--action">
    <span>{{ data.action | labelView(CLOUD_WALL.HANDLE_TYPE) }}</span>
    <span v-if="data.action === CLOUD_WALL.HANDLE_TYPE_VAR.GENERAL_CC">
      （{{ data.action_data.level | labelView(CLOUD_WALL.HANDLE_GENERAL_CC) }}）
    </span>
    <span v-if="data.action === CLOUD_WALL.HANDLE_TYPE_VAR.BLOCK">
      <span>&nbsp;{{ data.action_data.interval }}</span>
      <span v-if="data.action_data.time_unit">{{ data.action_data.time_unit | labelView(CLOUD_WALL.TIME_TYPE) }}</span>
    </span>
    <span v-if="data.action === CLOUD_WALL.HANDLE_TYPE_VAR.RELEASE">
      <template v-if="Number(data.action_data.cc) === 1 || Number(data.action_data.waf) === 1">后继续执行<br >
        <span v-if="Number(data.action_data.cc) === 1">CC 防护</span> <span v-if="Number(data.action_data.waf) === 1">WAF 防护</span>
      </template>
    </span>
  </div>
</template>

<script>
import * as CLOUD_WALL from '@/constants/cloud-wall'

export default {
  props: {
    data: Object
  },
  data() {
    return {
      CLOUD_WALL
    }
  }
}
</script>
