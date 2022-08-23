<style lang="scss">
.column-rules {
  display: inline-block;
  span {
    font-size: 12px;
  }
  &-item {
    color: #333;
    line-height: 16px;
    padding: 4px 0;
  }
}
</style>

<template>
  <div class="column-rules">
    <div v-for="(item, index) in nList" :key="index" class="column-rules-item">
      <span>{{ item.rule_type | labelView(MATCHING_ALL_TYPE) }}</span>
      <span v-if="item.dataViewBefore">{{ item.dataViewBefore }}</span>
      <span v-if="LOGIC_LABEL[item.logic]" class="column-rules__logic">{{ LOGIC_LABEL[item.logic].name }}：</span>
      <span v-if="item.rule_type === 'region'">
        <span v-for="(item, index) in item.list" :key="index">
          {{ item | areaView }}
        </span>
      </span>
      <span v-else-if="item.rule_type === 'device_type'">
        <span v-for="(value, index) in item.data" :key="index">
          <span v-if="index > 0">|</span>
          {{ value | labelView(SELECT_DATA.DEVICE_TYPE) }}
        </span>
      </span>
      <span v-else-if="item.rule_type === 'ip_type'">
        <span v-for="(value, index) in item.data" :key="index">
          <span v-if="index > 0">|</span>
          {{ value | labelView(SELECT_DATA.IP_TYPE) }}
        </span>
      </span>
      <span v-else-if="item.rule_type === 'tcp_ip_type'">
        <span v-for="(value, index) in item.data" :key="index">
          <span v-if="index > 0">|</span>
          {{ value | labelView(SELECT_DATA.IP_TYPE) }}
        </span>
      </span>
      <span v-else-if="item.rule_type === 'url_type'">
        <span v-for="(value, index) in item.data" :key="index">
          <span v-if="index > 0">|</span>
          {{ value | labelView(SELECT_DATA.URL_TYPE) }}
        </span>
      </span>
      <span v-else-if="item.rule_type === 'tcp_connection_type'">
        <span v-for="(value, index) in item.data" :key="index">
          <span v-if="index > 0">|</span>
          {{ value | labelView(TCP_CONNECTION_TYPE) }}
        </span>
      </span>
      <template v-else-if="item.rule_type === 'ip'">
        <ColumnListMore
          v-if="['in', 'not_in'].includes(item.logic)"
          :value="item.data"
          :lavel-view-list="selectIpList"
        />
        <span v-else>
          {{ item.dataView }}
        </span>
      </template>
      <span v-else>
        {{ item.dataView }}
      </span>
    </div>
  </div>
</template>

<script>
import { labelView } from '@/utils/filter'
import { WEEK_NAME, TCP_CONNECTION_TYPE } from '@/constants/cloud-wall'
import ColumnListMore from '@/components/Column/ColumnListMore'
import { mapState } from 'vuex'

export default {
  components: { ColumnListMore },

  props: {
    list: Array,
    disabled: Boolean
  },

  data() {
    return {
      TCP_CONNECTION_TYPE
    }
  },

  computed: {
    ...mapState({
      selectIpList: state => state.wall.selectIpList,
      MATCHING_TYPE: state => state.wall.MATCHING_TYPE,
      MATCHING_TCP_TYPE: state => state.wall.MATCHING_TCP_TYPE,
      LOGIC_LABEL: state => state.wall.LOGIC_LABEL,
      SELECT_DATA: state => state.wall.SELECT_DATA,
      MATCHING_ALL_TYPE: state => state.wall.MATCHING_ALL_TYPE
    }),
    nList() {
      const { list } = this
      if (!list) return
      list.forEach(item => {
        const { rule_type, data, logic } = item
        if (typeof data === 'string') {
          item.dataView = data
        } else {
          if (rule_type === 'region') {
            const list = [...data.country]
            if (data.province.length === 31) {
              list.push('china-land')
            } else {
              list.push(...data.province)
            }
            item.list = list
          } else if (rule_type === 'ip_rate_limit' || rule_type === 'ip_url_rate_limit') {
            item.dataViewBefore = `${data.interval} 秒内`
            item.dataView = `${data.reqs} 次`
          } else if (rule_type === 'req_time') {
            const { startTime, endTime, weeks = [] } = data

            let weeksView = '每'
            weeks.forEach((item, index) => {
              if (index > 0) weeksView += '、'
              weeksView += labelView(item, WEEK_NAME)
            })

            item.dataView = `${weeksView} 的 ${startTime} - ${endTime}`
          } else if (rule_type === 'args') {
            if (data && data[0]) {
              const _data = data[0]
              if (_data.key) {
                const { value, key, len } = _data
                item.dataViewBefore = key
                item.dataView = value || len
              } else {
                item.dataViewBefore = data.join(' | ')
              }
            }
          } else if (rule_type === 'upstream_status') {
            const { status, interval, reqs } = data
            item.dataViewBefore = `${status}, ${interval}s 内`
            item.dataView = `${reqs} 次`
          } else if (rule_type === 'req_header_entry') {
            if (data && data.length > 0) {
              item.dataViewBefore = data.join(' | ')
            } else if (data) {
              for (const k in data) {
                item.dataViewBefore = ['not_exist'].includes(logic) ? `${data[k]}` : `${k}`
                item.dataView = ['not_exist'].includes(logic) ? '' : `${data[k]}`

                if (['key_rate_greater_than', 'value_rate_greater_than'].includes(logic)) {
                  item.dataViewBefore = `${data.header}: ${data.interval} 秒内`
                  item.dataView = `${data.reqs} 次`
                }
              }
            }
          } else if (rule_type === 'tcp_packet_size' || rule_type === 'tcp_response_packet_size') {
            item.dataView = data ? data.size + ' 字节' : '-'
          } else if (rule_type === 'tcp_total_connect') {
            item.dataView = data ? `${data.total} 次` : '-'
          } else if (rule_type === 'tcp_new_connect') {
            const { interval, reqs } = data
            item.dataView = `${interval} 秒 ${reqs} 次`
          } else {
            if (data && data.length > 0) {
              item.dataView = data.join(' | ')
            } else if (data && data.len >= 0) {
              item.dataView = data.len
            } else {
              if (logic !== 'not_exist') item.dataView = '空'
            }
          }
        }
      })
      return list
    }
  }
}
</script>
