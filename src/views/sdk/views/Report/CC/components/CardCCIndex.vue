<template>
  <el-row :gutter="12">
    <el-col v-for="(item, index) in items" :span="12" :key="index">
      <yd-card>
        <BlockItemNumber :height="120" :ref="`Index${item.key}`" :options="item" />
      </yd-card>
    </el-col>
  </el-row>
</template>

<script>
import BlockItemNumber from '@/components/Block/BlockItemNumber';

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
    };
  },

  methods: {
    async init(params) {
      this.$refs.IndexTotal[0].startLoading();
      this.$refs.IndexRemoteHost[0].startLoading();
      let CC_TOTAL = 0;
      let CC_IPTOTAL = 0;
      try {
        const data = await this.Fetch.post(
          '/statistic/app/tcp_ccqps_line',
          params
        );
        const { cc_total = 0, CCIPTotal = 0 } = data || {};
        CC_TOTAL = cc_total;
        CC_IPTOTAL = CCIPTotal;
      } catch (error) {
        CC_TOTAL = 0;
        CC_IPTOTAL = 0;
      } finally {
        this.$refs.IndexTotal[0].updateValue(CC_TOTAL);
        this.$refs.IndexRemoteHost[0].updateValue(CC_IPTOTAL);
      }
    }
  }
};
</script>
