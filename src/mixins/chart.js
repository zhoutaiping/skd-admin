export default {
  data() {
    return {
      API_URI: "",
      loading: false,
      data: {
        columns: [],
        rows: [],
      },
      params: {},
    };
  },

  methods: {
    async fetchData(params = {}) {
      this.loading = true;
      params = {
        ...this.params,
        ...params,
      };
      const [methods, url] = this.API_URI.split(" ");
      let _data = null;
      try {
        const data = await this.Fetch[methods.toLowerCase()](url, params);
        _data = data;
      } catch (error) {
        _data = null;
      } finally {
        this.loading = false;
        return _data;
      }
    },
  },
};
