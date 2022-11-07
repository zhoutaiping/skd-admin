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
        @change="init"
      />
      <CardCCIndex ref="CardCCIndex" />
      <CardAttackTotal
        ref="CardAttackTotal"
        class="margin-top"
      />
      <CardAttackMap
        ref="CardAttackMap"
        class="margin-top"
      />
    </div>
  </div>
</template>

<script>
import CardAttackTotal from './components/CardAttackTotal'
import CardAttackMap from './components/CardAttackMap'
import CardCCIndex from './components/CardCCIndex'
import Toolbar from '../components/Toolbar'
import packageMixins from '../../../mixins/packages'

export default {
  components: { CardAttackTotal, CardAttackMap, CardCCIndex, Toolbar },

  mixins: [packageMixins],

  data() {
    return {
      loading: true
    }
  },

  methods: {
    init(params) {
      this.$nextTick(() => {
        this.$refs.CardCCIndex.init(params)
        this.$refs.CardAttackTotal.init(params)
        this.$refs.CardAttackMap.init(params)
      })
    }
  }
}
</script>
