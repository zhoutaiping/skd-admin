<template>
  <span :class="b()">
    <el-popover
      placement="top-bottom"
      width="200"
      trigger="hover"
    >
      <p style="font-size: 12px">当前版本：{{ data.plan_name || '--' }}</p>
      <p v-if="data.meal_flag !== 'YD-WEBAQJS-TY'" style="font-size: 12px">到期时间：{{ data.expire_time }}</p>
      <div>
        <el-button
          size="mini"
          @click="Help.openServicePanel(appAssets.afterKF)"
        >续费</el-button>
        <template v-if="data.meal_flag !== 'YD-WEBAQJS-DZ'">
          <el-divider direction="vertical" />
          <el-button
            size="mini"
            type="primary"
            @click="Help.openServicePanel(appAssets.afterKF)"
          >升级</el-button>
        </template>
      </div>
      <el-button
        slot="reference"
        type="text"
      >{{ data.plan_name }}</el-button>
    </el-popover>
  </span>
</template>

<script>
import create from '@/utils/create-basic'

export default create({
  name: 'ItemPlan',

  props: {
    data: Object
  }
})
</script>
