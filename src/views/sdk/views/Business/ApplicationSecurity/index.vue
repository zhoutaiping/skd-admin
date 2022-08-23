<template>
  <yd-card-list>
    <!-- <CardWAF /> -->
    <CardItemForm
      :loading="false"
      is-support
      is-init
      title="入侵防御"
    >
      <template slot="tips">
        <p>基于零信任安全架构，隐藏业务真实主机，黑客无法在互联网上发起扫描和定向入侵，无需担心0DAY/NDAY。同时辅以智能入侵检测引擎，标记检测到的风险设备</p>
      </template>
      <SelectSwitch
        slot="action"
        :value="true"
        disabled
      />
    </CardItemForm>
    <CardItemForm
      :loading="false"
      is-support
      is-init
      title="App防篡改"
    >
      <template slot="tips">
        <p>对APP应用的每个文件分配唯一识别指纹，替换任何一个文件会导致无法运行，防止广告病毒植入，二次打包、功能屏蔽、仿冒钓鱼等恶意破解</p>
      </template>
      <SelectSwitch
        slot="action"
        :value="true"
        disabled
      />
    </CardItemForm>
  </yd-card-list>
</template>

<script>
import SelectSwitch from '@/components/Select/SelectSwitch'

export default {
  components: { SelectSwitch }
}
</script>
