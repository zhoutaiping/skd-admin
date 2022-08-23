import { deepClone } from '../utils'

export default {
  props: {
    deleteRow: Function,
    saveRow: Function
  },

  methods: {
    handleSaveRow(scope) {
      this.saveRow(scope)
    },

    handleRowAdd() {
      if (this.customAddRow) {
        this.$emit('add-row')
      } else {
        const row = deepClone(this.row)
        if (this.editInline) {
          row.$edit = true
        }
        this.data.push(row)
      }
    },

    handleRowDelete(scope) {
      const { $index } = scope
      this.$emit('delete-row', scope)
      if (this.onDeleteRow) {
        this.onDeleteRow(scope)
      } else {
        this.data.splice($index, 1)
      }
    },

    handleRowUp(index) {
      if (index === 0) return
      const item = this.data.splice(index, 1)[0]
      this.data.splice(index - 1, 0, item)
    },

    handleRowDown(index) {
      const item = this.data.splice(index, 1)[0]
      this.data.splice(index + 1, 0, item)
    }
  }
}
