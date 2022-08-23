<template>
  <div :class="b()">
    <ChartTable
      v-if="type === 'table'"
      :loading="loading"
      :unit-type="unitType"
      :data="data"
    />
    <ChartLine
      v-if="type === 'line'"
      :loading="loading"
      :unit-type="unitType"
      :data="data"
      @ready="handleReady"
    />
    <ChartBar
      v-if="type === 'bar'"
      :loading="loading"
      :unit-type="unitType"
      :data="data"
    />
    <ChartPie
      v-if="type === 'pie'"
      :loading="loading"
      :unit-type="unitType"
      :data="data"
    />
    <ChartPieTable
      v-if="type === 'pieTable'"
      :loading="loading"
      :unit-type="unitType"
      :data="data"
      @ready="handleReady"
    />
  </div>
</template>

<script>
import create from '@/utils/create-basic'
import ChartLine from './ChartLine'
import ChartTable from './ChartTable'
import ChartBar from './ChartBar'
import ChartPie from './ChartPie'
import ChartPieTable from './ChartPieTable'

export default create({
  name: 'ChartToggle',

  components: { ChartLine, ChartTable, ChartBar, ChartPie, ChartPieTable },

  props: {
    type: {
      type: String,
      default: 'table'
    },
    data: Object,
    loading: Boolean,
    unitType: String
  },

  methods: {
    handleReady(e) {
      this.$emit('ready')
    }
  }
})
</script>
