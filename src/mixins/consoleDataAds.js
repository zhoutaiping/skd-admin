import { deepClone } from '@/utils'

export default {
  data() {
    return {
      loading: false,
      multipleSelection: [],
      bindParams: {},
      defaultParams: {},
      list: [],
      listTotal: 0
    }
  },

  mounted() {
    this.defaultParams = deepClone(this.bindParams)
  },

  computed: {
    multipleActionDisable() {
      return this.multipleSelection.length === 0
    }
  },

  methods: {
    fetchInit(params = {}) {
      Object.assign(this.bindParams, params)
      this.$refs.DmData.initPage()
    },

    handleResetFiler() {
      this.bindParams = deepClone(this.defaultParams)
    },

    handleSearch() {
      this.$nextTick(() => {
        this.$refs.DmData.initPage()
      })
    },

    handleSelectionChange(val) {
      this.multipleSelection = val
    },

    formatResponse(response) {
      return response
    },

    formatParams(params) {
      return params
    },

    async fetchList(params = {}) {
      const { DmData } = this.$refs
      Object.assign(this.bindParams, params)
      const { API_INDEX, API_METHOD = 'post' } = this
      params = {
        method: API_METHOD,
        api: API_INDEX,
        data: this.formatParams({
          ...DmData.getPagination(),
          ...this.bindParams
        })
      }

      this.loading = true
      let total
      try {
        const response = await this.Fetch.post('V4/ads.api', params)
        const data = this.formatResponse(response)
        const { list } = data
        total = Number(data.total)
        this.list = list
        this.listTotal = total
      } finally {
        this.loading = false
      }

      // DmData.clearSelection()
      DmData.init({ total })
    }
  }
}
