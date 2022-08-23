import { deepClone } from '@/utils'

export default {
  data() {
    return {
      form: {},
      formDefault: {}
    }
  },

  watch: {
    domainSettings: {
      deep: true,
      handler() {
        const form = this.domainSettings[this.SETTING_ID] || {}
        // form = this.formatResponse(deepClone(form))
        // const formDefault = deepClone(this.formDefault)
        // Object.keys(form).forEach(key => {
        //   this.$set(this.form, key, form[key] || formDefault[key])
        // })
        this.form = this.formatSettings({
          ...this.formDefault,
          ...this.formatResponse(deepClone(form))
        })
      }
    }
  },

  methods: {
    formatResponse(data) {
      return data
    },

    formatSettings(data) {
      return data
    },

    formatRequest(data) {
      return data
    },

    async fetchUpdate(form = {}, id, { updateOnError = true } = {}) {
      const data = {
        ...this.form,
        ...form
      }
      const send = this.formatRequest(data)
      try {
        await this.domainSaveSettings({ [id || this.SETTING_ID]: send })
      } catch (e) {
        if (updateOnError) this.domainFetchSettings(this.SETTING_ID)
        throw new Error()
      }
      this.domainFetchSettings(this.SETTING_ID)
      this.Message('ACTION_SUCCESS')
    }
  }
}
