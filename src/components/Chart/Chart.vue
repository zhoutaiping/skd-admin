<template>
  <div>
    <ve-chart
      :colors="colors"
      :data="nData"
      :grid="grid"
      :settings="settings"
      :extend="extend"
      :loading="loading"
      :y-axis="yAxis"
      :height="height"
      :tooltip="tooltip"
      :legend-visible="legendVisible"
      theme-name="yundun"
    />
  </div>
  <!-- :data-empty="!loading && nData.rows.length === 0" -->
</template>

<script>
import create from '@/utils/create-basic'
import Color from '@/utils/color'

export default create({
  name: 'Chart',

  props: {
    tooltip: Object,
    settings: Object,
    extend: Object,
    yAxis: Object,
    height: {
      type: String,
      default: '350px'
    },
    colors: {
      type: Array,
      default: () => [
        Color.colorPrimary,
        Color.colorOrange,
        Color.colorGreen,
        Color.colorYellow,
        Color.colorPrimary,
        Color.colorRed,
        Color.colorPick,
        '#626c91',
        '#3fb1e3',
        '#6be6c1',
        '#626c91',
        '#a0a7e6',
        '#c4ebad',
        '#96dee8'
      ]
    },
    data: {
      type: Object,
      default: () => {
        return {
          rows: [],
          columns: []
        }
      }
    },
    grid: {
      type: Object,
      default: () => {
        return {
          top: 30,
          left: 100,
          right: 20,
          bottom: 30
        }
      }
    },
    legendVisible: {
      type: Boolean,
      default: true
    },
    loading: {
      type: Boolean,
      default: true
    }
  },

  watch: {
    data(val) {
      if (!val || !val.columns || !val.rows) {
        this.clear()
      } else {
        this.nData = val
      }
    }
  },

  data() {
    return {
      Color,
      nData: {
        rows: [],
        columnss: []
      }
    }
  },

  created() {
    this.nData = this.data
  },

  methods: {
    clear() {
      this.nData = {
        rows: [],
        columnss: []
      }
    }
  }
})
</script>
