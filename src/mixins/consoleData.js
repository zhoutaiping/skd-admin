export default {
  data() {
    return {
      loading: false,
      multipleSelection: [],
      bindParams: {},
      params: {},
      list: [],
      listTotal: 0,
      resData: {}
    }
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
      params = {
        ...DmData.getPagination(),
        ...this.params,
        ...this.bindParams
      }
      const { API_METHOD = 'get' } = this
      params = this.formatParams(params)

      this.loading = true
      let total
      this.resData = {}
      try {
        const response = await this.Fetch[API_METHOD](this.API_INDEX, params)
        this.resData = response
        const data = this.formatResponse(response)
        const { list } = data
        total = Number(data.total)
        this.list = list
        this.listTotal = total
      } finally {
        this.loading = false
      }

      DmData.init({ total })
    }
  }
}
