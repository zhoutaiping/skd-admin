// 创建
const CreateIndexMultiple = class {
  constructor(options) {
    const { title, data, component } = options
    this.loading = true
    this.title = title
    this.component = component
    this.data = this.initData(data)
  }

  initData(data) {
    data.forEach(item => {
      item.unit = item.unit || ''
      item.value = item.label ? (item.value || 0) : ''
    })
    return data
  }

  startLoading() {
    this.loading = true
  }

  updateData(nData) {
    this.data.forEach(item => {
      if (!nData[item.key]) return
      if (item.filter) {
        const [value, unit] = item.filter(nData[item.key].value).split(' ')
        Object.assign(item, { value, unit })
      } else {
        Object.assign(item, nData[item.key])
      }
    })
    this.loading = false
  }
}

const CreateChart = class {
  constructor(optionsData) {
    const { title, columns, columnsKey, columnsFilter, settings, tooltip, options, xAxis, yAxis } = optionsData
    const settingsDefault = {
      type: 'line'
    }
    this.loading = false
    this.title = title
    this.columns = columns
    this.columnsKey = columnsKey
    this.columnsFilter = columnsFilter
    this.tooltip = tooltip
    this.options = options
    this.xAxis = xAxis
    this.yAxis = yAxis
    this.settings = Object.assign(settingsDefault, settings)
    this.data = this.initData()
  }

  initData() {
    return {
      rows: [],
      columns: this.columns
    }
  }

  startLoading() {
    this.loading = true
  }

  updateSetting(setting, name) {
    this[name] = Object.assign(this[name], setting)
  }

  updateSettings(settings) {
    Object.assign(this.settings, settings)
  }

  updateTooltip(tooltip) {
    this.tooltip = tooltip
  }

  updateData(nData) {
    this.data = nData
    this.loading = false
  }
}

export default {
  methods: {
    CreateIndexMultiple,

    CreateChart,

    formatCardIndexMultiple(data) {
      const nData = {}
      Object.keys(data).forEach(key => {
        const item = data[key]
        if (item.total) {
          const { total: value, unit } = item.total
          nData[key] = {
            value,
            unit
          }
        } else if (item.max) {
          const { max: value, unit } = item.max
          nData[key] = {
            value,
            unit
          }
        }
      })
      return nData
    },

    startBlocksLoading(blocksName) {
      if (Array.isArray(blocksName)) {
        blocksName.map(item => this.blocks[item].startLoading())
      } else {
        this.blocks[blocksName].startLoading()
      }
    },

    async fetchGroup(options, params, fn = this.fetchChart) {
      options.forEach(item => {
        item.params = {
          ...item.params,
          ...params
        }
        fn(item)
      })
    },

    async fetchChart(options) {
      const $indexGroup = this.$refs.CardIndexGroup
      const { api, key, params, chart, index } = options
      const $chart = chart && this.$refs[`CardChart${key}`]

      index && $indexGroup.startLoading(key)
      $chart && $chart.startLoading()

      const data = await this.Fetch.post(api, params)

      $chart && $chart.handleUpdate(data, chart.columns)
      if (index) {
        const { data: value, unit } = data.total
        $indexGroup.updateItem(key, {
          value, unit
        })
      }
    }
  }
}
