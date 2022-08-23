<template>
  <div>
    <template>{{ data.action | labelView(wafSelects.actionType) }}</template>
    <template v-if="data.action === 'anticc'">
      （{{ data.action_data.level | labelView(wafSelects.actionLebelType) }}）
    </template>
    <template v-else-if="data.action === 'block'">
      <template>&nbsp;{{ data.action_data.interval }}</template>
      <template>{{ data.action_data.time_unit | labelView(wafSelects.timeType) }}</template>
    </template>
    <template v-else-if="data.action === 'white'">
      <template>&nbsp;{{ data.action_data.interval }}</template>
      <template> 秒</template>
    </template>
    <template v-else-if="data.action === 'verification'">
      {{ data.action_data.type | labelView(wafSelects.verificationType) }}
    </template>
    <template v-else-if="data.action === 'web_pot'">
      <div>
        蜜网服务器：{{ data.action_data.protocol }}://{{ data.action_data.ip }}:{{ data.action_data.port }}<br>
      </div>
    </template>
    <template v-else-if="data.action === 'redirect'">
      {{ data.action_data.redirect_url }}
    </template>
    <template v-if="nextList.length">
      <div>
        继续执行：<span
          v-for="(item, index) in nextList"
          :key="index"
        >
          <el-divider
            v-if="index > 0"
            direction="vertical"
          />{{ item }}</span>
      </div>
    </template>
  </div>
</template>

<script>
import wafMixins from '@/views/sdk/mixins/waf'

export default {
  mixins: [wafMixins],

  props: {
    data: {
      type: Object,
      default() {
        return {}
      }
    }
  },

  data() {
    return {
      nextList: []
    }
  },

  watch: {
    data: {
      deep: true,
      handler() {
        this.init()
      }
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const { action_data = {}} = this.data
      const nextList = []
      if (action_data.cc) nextList.push('CC防护')
      if (action_data.next_rules) nextList.push('下一规则集')
      if (action_data.waf) nextList.push('漏洞攻击保护')
      this.nextList = nextList
    }
  }
}
</script>
