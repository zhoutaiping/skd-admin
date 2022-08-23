import ColumnAction from './_ColumnAction'

const Column = {}

Column.install = function(Vue) {
  Vue.component(ColumnAction.name, ColumnAction)
}

export default Column
