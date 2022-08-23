<template>
  <yd-card-list>
    <CardItemForm
      :loading="false"
      is-support
      is-init
      title="反外挂"
    >
      <template slot="tips">
        <p>常见外挂依托于官方应用程序，动态修改游戏业务逻辑，在运行过程中注入恶意模块，修改代码的逻辑、修改内存中的数值，通过设备风险识别功能，可以动态抵御调试、注入、Hook、设备篡改、App篡改、模拟器运行、多开运行、群控运行等外挂</p>
      </template>
      <yd-alert>
        接入后系统默认开启
      </yd-alert>
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
      title="Bot自动化防御"
    >
      <template slot="tips">
        <p>依托设备风险识别和可信通信功能，解决业务的各种安全问题，杜绝未经认证的一切流量，可防护以下场景：恶意注册、撞库、暴力破解、针对APP的大流量CC攻击、短信/验证码接口被刷、薅羊毛/抢红包、恶意秒杀限时限购商品、恶意查票/刷票、价值资讯爬取、机器批量投票、灌水/恶意评论、渠道刷量作弊</p>
      </template>
      <SelectSwitch
        slot="action"
        :value="true"
        disabled
      />
    </CardItemForm>
    <CardDeviceReputation />
    <CardWAF />
  </yd-card-list>
</template>

<script>
import SelectSwitch from '@/components/Select/SelectSwitch'
import CardDeviceReputation from './components/CardDeviceReputation'
import CardWAF from './ApplicationSecurity/components/CardWAF'

export default {
  components: { SelectSwitch, CardDeviceReputation, CardWAF }
}
</script>
