<template>
  <yd-card-list>
    <CardItemForm
      :loading="false"
      is-support
      is-init
      title="抗DDoS"
    >
      <template slot="tips">
        <p>多年的黑灰产、攻击手法研究和线上实战对抗经验积累，云盾开创了三阶复合对抗模型;创新的端边云一体架构将 传统单一的硬件+硬性资源对抗 转移到了 多维度软件+弹性资源对抗</p>
      </template>
      <yd-alert>
        接入后系统默认开启
      </yd-alert>
      <img style="max-width: 800px; width: 100%" src="/img/sdk-ddos.png" alt="">
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
      title="链路安全"
    >
      <template slot="tips">
        <p>高强度动态加密算法实现一机一密，一链一密。加密隧道保证数据传输安全，黑客无法抓包获取域名、URL、API等业务相关内容数据，无法做任何伪造和重放攻击请求</p>
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
