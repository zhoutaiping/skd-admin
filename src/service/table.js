export default {
  deleteRow(scope) {
    const { $index } = scope
    this.list.splice($index, 1)
  },

  async validate(list, arr, refs) {
    arr = typeof arr === 'string' ? [arr] : arr
    try {
      for (let index = 0; index < list.length; index++) {
        for (let i = 0; i < arr.length; i++) {
          const name = arr[i]
          refs[`form-${name}-${index}`].validate(valid => {
            if (!valid) throw new Error()
          })
        }
      }
    } catch (e) {
      return false
    }
    return true
  }
}
