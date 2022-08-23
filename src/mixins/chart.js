export default {
  data() {
    return {
      API_URI: '',
      loading: false,
      data: {
        columns: [],
        rows: []
      },
      params: {}
    }
  },

  methods: {
    async fetchData(params = {}) {
      this.loading = true
      params = {
        ...this.params,
        ...params
      }
      const [methods, url] = this.API_URI.split(' ')
      const data = await this.Fetch[methods.toLowerCase()](url, params)
      this.loading = false
      return data
    }
  }
}
