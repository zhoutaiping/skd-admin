<template>
  <el-row :gutter="12">
    <el-col
      v-for="(item, index) in items"
      :span="12"
      :key="index"
    >
      <yd-card>
        <BlockItemNumber
          :height="120"
          :ref="`Index${item.key}`"
          :options="item"
        />
      </yd-card>
    </el-col>
  </el-row>
</template>

<script>
import BlockItemNumber from '@/components/Block/BlockItemNumber'

export default {
  components: {
    BlockItemNumber
  },

  data() {
    return {
      items: [
        {
          title: '总攻击次数',
          key: 'Total',
          unit: '次'
        },
        {
          title: '攻击肉鸡数',
          key: 'RemoteHost',
          unit: '个'
        }
      ]
    }
  },

  methods: {
    async init(params) {
      this.$refs.IndexTotal[0].startLoading()
      this.$refs.IndexRemoteHost[0].startLoading()
      const data = await this.Fetch.get('V4/statistic.tjkd.app.tcp.cc.line', params)
      this.$refs.IndexTotal[0].updateValue(data.cc_total)
      this.$refs.IndexRemoteHost[0].updateValue(data.cc_remote_addr_total)
    }
  }
}
</script>
