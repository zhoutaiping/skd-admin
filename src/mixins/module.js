export default {
  data() {
    return {
      config: {},
      menus: []
    }
  },

  computed: {
    layoutReady() {
      return this.$store.state.app.layoutReady
    }
  },

  watch: {
    layoutReady() {
      this.initModuleConfig()
    }
  },

  created() {
    if (this.layoutReady) this.initModuleConfig()
  },

  methods: {
    initModuleConfig() {
      this.$store.dispatch('initModule', {
        config: this.config,
        menus: this.menus,
        router: this.$router
      })
    }
  },

  provide() {
    return {
      ModuleId: this.config.id
    }
  }
}
