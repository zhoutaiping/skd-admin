export default {
  data() {
    return {
      loading: false,
      bindParams: {},
      params: {},
      list: [],
      resData: {},
      config: null
    }
  },

  methods: {
    async fetchConfig() {
      // const res = await this.Fetch.get('V4/member.set.info.console')
      // if (res.oplog && res.oplog.user_see_admin_oplog === 'on') {
      this.bindParams.display_admin = 1
      // }
    },

    fetchInit(params = {}) {
      Object.assign(this.bindParams, params)
      this.$refs.DmData.initPage()
    },

    handleSearch() {
      this.$nextTick(() => {
        this.$refs.DmData.initPage()
      })
    },

    formatResponse(response) {
      return response
    },

    formatParams(params) {
      return params
    },

    async fetchList(params = {}) {
      if (!this.config) await this.fetchConfig()
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
      } finally {
        this.loading = false
      }

      DmData.init({ total })
    }
  }
}
