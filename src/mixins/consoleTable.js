import { deepClone } from '../utils'

export default {
  data() {
    return {
      list: []
    }
  },

  methods: {
    handleCheckRow(index) {
      this.rowKey.forEach(key => {
        const keyIndex = `${key}-${index}`
        if (this.$refs[keyIndex] && this.$refs[keyIndex].validate) {
          if (!this.$refs[keyIndex].validate()) {
            throw new Error()
          }
        }
      })
    },

    clearValidate() {
      this.list.forEach((item, index) => {
        this.handleRowClearValidate(index)
      })
    },

    handleRowClearValidate(index) {
      this.rowKey.forEach(key => {
        const keyIndex = `${key}-${index}`
        if (this.$refs[keyIndex] && this.$refs[keyIndex].clearValidate) {
          this.$refs[keyIndex].clearValidate()
        }
      })
    },

    async handleCheckList() {
      const list = this.list
      for (let i = 0; i < list.length; i++) {
        try {
          await this.handleCheckRow(i)
        } catch (e) {
          throw new Error()
        }
      }
    },

    async handleRowAdd() {
      if (this.list.length > 0) {
        // 检查上一行
        await this.handleCheckRow(this.list.length - 1)
      }
      this.list.push(deepClone(this.row))
    },

    handleRowEdit(row) {
      row.$edit = true
      row.$cache = deepClone(row)
    },

    handleRowCancle(row) {
      Object.assign(row, row.$cache)
      row.$edit = false
    },

    handleRowDelete(index) {
      this.list.splice(index, 1)
    },

    handleTableReset(index) {
      this.list[index] = deepClone(this.row)
    },

    handleRowUp(index) {
      if (index === 0) return
      const item = this.list.splice(index, 1)[0]
      this.list.splice(index - 1, 0, item)
    },

    handleRowDown(index) {
      const item = this.list.splice(index, 1)[0]
      this.list.splice(index + 1, 0, item)
    },

    handleRowTop(index) {
      const item = this.list.splice(index, 1)[0]
      if (index === 0) return
      this.list.unshift(item)
    },

    handleRowButton(index) {
      const item = this.list.splice(index, 1)[0]
      this.list.push(item)
    }
  }
}
