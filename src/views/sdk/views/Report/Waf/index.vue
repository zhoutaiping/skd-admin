<template>
  <div>
    <div
      v-loading="packageList.length === 0"
      element-loading-text="无数据"
      element-loading-spinner="el-icon-remove-outline"
      element-loading-background="rgba(255, 255, 255, 0.8)"
    >
      <Toolbar
        v-if="packageList.length > 0"
        show-rule-id
        @change="init"
      />
      <TableEvent ref="TableEvent" />
      <CardFingerprint
        ref="CardFingerprint"
        class="margin-top"
      />
    </div>
  </div>
</template>

<script>
import packageMixins from '../../../mixins/packages'
import Toolbar from '../components/Toolbar'
import TableEvent from './components/TableEvent'
import CardFingerprint from './components/CardFingerprint'

export default {
  components: { Toolbar, TableEvent, CardFingerprint },

  mixins: [packageMixins],

  data() {
    return {
      loading: true
    }
  },

  methods: {
    init(params) {
      this.$nextTick(() => {
        this.$refs.TableEvent.init(params)
        this.$refs.CardFingerprint.init(params)
      })
    }
  }
}
</script>
