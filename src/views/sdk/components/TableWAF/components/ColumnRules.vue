<template>
  <div :class="b()">
    <div
      v-for="(item, index) in list"
      :key="index"
    >
      {{ item.title }}：
      <template v-if="item.view">
        {{ item.view }}
      </template>
      <template v-else>
        <ColumnListMore :value="item.list" />
      </template>
    </div>
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import column from '@/mixins/column'
import ColumnListMore from '@/components/Column/ColumnListMore'
import wafMixins from '@/views/sdk/mixins/waf'
import { labelView } from '@/utils/filter'
import { formatRegionView } from '@/utils/format'
import { province as Province } from '@/constants/city-data'

const itemMap = {
  cpu_arch: 'cpuArch',
  device_os: 'deviceOS',
  device_risk: 'deviceRisk'
}

export default create({
  name: 'ColumnRules',

  components: { ColumnListMore },

  mixins: [column, wafMixins],

  props: {
    items: Array
  },

  computed: {
    selectRegion() {
      return this.$store.state.select.region
    },
    selectRegionMap() {
      return this.$store.state.select.regionMap
    }
  },

  data() {
    return {
      list: []
    }
  },

  watch: {
    items(val) {
      this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const nList = []

      if (!Array.isArray(this.items)) return
      this.items.forEach(_ => {
        const data = _.data
        const type = _.rule_type

        let list = []
        let view = ''

        const title = `${labelView(type, this.wafRules)}[${labelView(_.logic, this.wafLogics)}]`
        if (Array.isArray(data)) {
          const selectName = itemMap[type]
          if (selectName) {
            list = data.map(_ => labelView(_, this.wafSelects[selectName]))
          } else {
            list = data
          }
        }

        if (type === 'device_rate_limit') {
          view = `${data.interval} 秒内请求头频率大于 ${data.reqs} 次`
        } else if (type === 'region') {
          if (data.country.includes('CN') && !data.province.length) {
            data.province.push(...Province.map(_ => _.value))
          }

          const valueMap = formatRegionView([...data.country, ...data.province], this.selectRegionMap)
          for (const [key, item] of valueMap) {
            const title = labelView(key, this.selectRegion.list)
            if (item === 'all') {
              list.push(title)
            } else {
              list.push(...item.map(_ => labelView(_, this.selectRegion.list)))
            }
          }
        }

        nList.push({
          title,
          list,
          view
        })
      })
      this.list = nList
    }
  }
})
</script>
