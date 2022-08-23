import { deepClone } from '../utils'

export default {
  data() {
    return {
      mode: 'Create',
      form: {},
      formDefault: {},
      formOld: {},
      options: {},
      optionsDefault: {}
    }
  },

  methods: {
    validateForm() {
      this.$refs.Form.validate(valid => {
        if (!valid) throw new Error()
      })
    },

    handleOpen(form = {}, options = {}) {
      form = deepClone(form)
      this.beforeOpen(form, options)
      this.formOld = form
      this.submitLoading = false
      this.form = Object.assign(deepClone(this.formDefault), form)
      this.options = Object.assign(deepClone(this.optionsDefault), options)
      this.$refs.Dialog.handleOpen(form)

      this.$nextTick(() => {
        this.initOptions(form, options)
      })
      this.afterOpen(form)
    },

    handleClose() {
      this.$refs.Dialog.handleClose()
      this.$emit('close')
    },

    resetSubmitLoading() {
      this.$refs.Dialog.resetSubmitLoading()
    },

    beforeOpen() {},
    afterOpen() {},
    initOptions() {}
  }
}
