<template>
  <div :class="b()">
    <div v-for="(item, index) in list" :key="index">
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
import wafMixins from '@/console/red-guard/mixins/waf'
import { labelView, areaView } from '@/utils/filter'

const itemMap = {
  cpu_arch: 'cpuArch',
  device_os: 'deviceOS',
  device_risk: 'deviceRisk',
  device_type: 'device_type_types',
  req_method: 'req_method_methods',
  req_protocol: 'req_protocol_req_protocols',
  ip_type: 'ip_type_types',
  url_type: 'url_type_url_type_map',
  ip_danger_level: 'ip_danger_level_types'
}

function formatRegionToTag(data) {
  const { country = [], province = [] } = data
  const regionTag = []

  country.forEach(item => {
    if (item === 'CN') {
      if (province.length > 0) {
        province.forEach(pItem => {
          if (pItem) {
            regionTag.push([item, pItem])
          }
        })
      } else {
        regionTag.push([item])
      }
    } else {
      regionTag.push([item])
    }
  })

  const arr = []
  regionTag.forEach(item => {
    arr.push(areaView(item))
  })
  return arr
}

export default create({
  name: 'ColumnRules',

  components: { ColumnListMore },

  mixins: [column, wafMixins],

  props: {
    items: Array
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
      const items = this.formatLoadRules(this.items)

      items.forEach(_ => {
        const data = _.data
        const type = _.rule_type
        let list = []
        let view = ''
        let afterTitle = ''

        if (Array.isArray(data)) {
          const selectName = itemMap[type]

          if (selectName) {
            list = data.map(_ => labelView(_, this.wafSelects[selectName]))
          } else {
            list = data
          }
        }

        if (typeof data === 'object' && data.len) {
          view = data.len
        }

        if (type === 'region') {
          list = formatRegionToTag(data)
        } else if (type === 'req_time') {
          const { startTime, endTime, weeks = [] } = data
          let weeksView = '每'
          weeks.forEach((item, index) => {
            if (index > 0) weeksView += '、'
            weeksView += labelView(item, this.wafSelects.week)
          })
          view = `${weeksView} 的 ${startTime} - ${endTime}`
        } else if (type === 'req_header_entry') {
          afterTitle = data.key || data.header
          view = data.value
          if (typeof data.value === 'object') {
            const _data = data.value
            if (_data.interval && _data.reqs) {
              view = `${_data.interval} 秒内请求头频率大于 ${_data.reqs} 次`
            }
          }
        }

        if (data.interval && data.reqs) {
          view = `${data.interval} 秒内频率大于 ${data.reqs} 次`
        }

        const title = `${labelView(type, this.wafRules)}${afterTitle}[${labelView(_.logic, this.wafLogics)}]`

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
