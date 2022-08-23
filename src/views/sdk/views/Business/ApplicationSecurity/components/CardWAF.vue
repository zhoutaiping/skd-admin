<template>
  <CardItemForm
    :loading="loading"
    is-support
    is-init
    title="精准访问控制"
  >
    <template slot="tips">
      <p>根据业务情况定制专有防护策略</p>
    </template>
    <yd-alert>
      策略优先级按照排列顺序由上向下，暂停策略后，本策略不生效
    </yd-alert>
    <TableWAF v-if="!wafLoadingSettings" />
  </CardItemForm>
</template>

<script>
import wafMixins from '@/views/sdk/mixins/waf'
import TableWAF from '@/views/sdk/components/TableWAF'

export default {
  components: { TableWAF },

  mixins: [wafMixins],

  data() {
    return {
      // domainId: '',
      content: '',
      type: '',
      typeOption: [{
        value: 'default',
        label: '默认__companyEN__错误页面'
      },
      {
        value: 'custom',
        label: '自定义HTML'
      }
      ]
    }
  },

  created() {
    this.wafFetchSettings()
    this.init()
  },

  methods: {
    init() {
      this.loading = false
    }
  }
}
</script>
