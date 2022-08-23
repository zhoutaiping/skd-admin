import Skeleton from './Skeleton'

const Components = {}

Components.install = Vue => {
  Vue.component(Skeleton.name, Skeleton)
}
export default Components
