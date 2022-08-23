import { deepClone } from '../utils'

export default {
  // 创建弹框
  create(form, id) {
    const dialog = {
      id,
      tips: false,
      loading: false,
      visible: false,
      formRaw: form,
      form: deepClone(form)
    }

    return dialog
  },

  jump(from, to, time = 100) {
    from.visible = false

    setTimeout(() => {
      to.visible = true
    }, time)
  },

  open(obj, time = 5) {
    this.rest(obj)
    setTimeout(() => {
      obj.visible = true
    }, time)
  },

  close(obj, isRest = true, time = 5) {
    obj.visible = false
    obj.loading = false
    setTimeout(() => {
      obj.loading = false
      if (isRest) {
        this.rest(obj)
      }
    }, time)
  },

  rest(obj, time = 5) {
    obj.tips = false
    obj.form = deepClone(obj.formRaw)
    setTimeout(() => {
      obj.loading = false
    }, time)
  }
}
