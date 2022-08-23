<template>
  <div>
    <div v-for="(item, index) in list" :key="index">
      <span>
        {{ item.type | labelView(DeviceReputation.MatchType) }} [{{ item.logic | labelView(DeviceReputation.Logic) }}]:&nbsp;
      </span>
      <template v-if="item.type === 'total_online_time'">
        {{ item.data.value }} {{ item.data.unit | labelView(DeviceReputation.TimeUnit) }}
      </template>
      <template v-else-if="item.type === 'app_start_times'">
        {{ item.data.value }} 次
      </template>
      <template v-else-if="item.type === 'online_time_rang'">
        {{ item.data.start_time }} - {{ item.data.end_time }}
      </template>
    </div>
  </div>
</template>

<script>
import DeviceReputation from '../../../../constants/DeviceReputation'

export default {
  props: {
    value: Object,
    rules: Array,
    logics: Array
  },

  data() {
    return {
      DeviceReputation,
      list: []
    }
  },

  watch: {
    value() {
      this.init()
    }
  },

  created() {
    this.init()
  },

  methods: {
    init() {
      const data = this.value
      const list = []
      Object.keys(data).forEach(type => {
        const item = data[type]
        list.push({
          type,
          logic: item.logic,
          data: {
            value: item.value,
            unit: item.unit,
            start_time: item.start_time,
            end_time: item.end_time
          }
        })
      })

      this.list = list
    }
  }
}
</script>
