<style lang='postcss'>
.chart-wrapper {
  width: 100%;
  position: relative;
}

.chart {
  &-null {
    position: absolute;
    background: rgb(250, 250, 250, 0.4);
    left: 0;
    top: 0;
    right: 0;
    bottom: 0;

    display: flex;
    align-items: center;
    justify-content: center;

    &__text {
      font-size: 12px;
      color: #999;
    }
  }
}
</style>
<template>
  <div :style="{height: height + 'px'}" class="chart-wrapper">
    <div ref="chart" :style="{height: height + 'px'}" :id="id"/>
    <div v-if="isNull" class="chart-null">
      <div class="chart-null__text">暂无数据</div>
    </div>
  </div>
</template>

<script>
import theme from '@/constants/echarts-theme'
import echarts from 'echarts'
import { throttle } from 'throttle-debounce'

const NAME = 'yd-charts'

export default {
  name: NAME,

  props: {
    options: Object,
    nullData: Boolean,
    delay: {
      type: Number,
      default: 200
    },
    height: {
      type: Number,
      default: 350
    },
    refresh: Boolean
  },

  data() {
    return {
      id: null,
      loading: false,
      isDraw: false,
      isNull: false,
      chart: null
    }
  },

  watch: {
    refresh(val) {
      if (val === true) {
        this.clear()
      }
    },
    options() {
      this.loading = true
      this.initData()
    }
  },

  mounted() {
    this.init()
  },

  methods: {
    createId() {
      const idx = Math.random()
      const id = `chart-${idx}`
      if (document.getElementById(id)) {
        this.createId()
      } else {
        return id
      }
    },

    init() {
      const id = this.createId()
      this.id = id
      this.$nextTick(() => {
        this.chart = echarts.init(document.getElementById(id), theme)
        window.addEventListener('resize', throttle(1500, this.resize), false)
      })
    },

    resize() {
      this.chart && this.chart.resize()
    },
    clear() {
      this.chart && this.chart.clear()
    },

    initData() {
      const { options } = this

      if (!options) {
        this.loading = false
        this.isNull = true
        return
      }

      // if (this.isDraw) {
      //   chart.clear()
      // }

      // 加载优化
      const delay = this.isDraw ? 0 : this.delay

      setTimeout(() => {
        this.chart.setOption(options, true)
        this.loading = false
        this.isDraw = true
      }, delay)
    }
  }
}
</script>
