import Vue from 'vue'
import 'ant-design-vue/dist/antd.css'
import Icon from 'ant-design-vue/lib/icon'
import Popconfirm from 'ant-design-vue/lib/popconfirm'
import Input from 'ant-design-vue/lib/input'
import InputNumber from 'ant-design-vue/lib/input-number'
import DatePicker from 'ant-design-vue/lib/date-picker'
import Button from 'ant-design-vue/lib/button'
import Badge from 'ant-design-vue/lib/badge'
import Tag from 'ant-design-vue/lib/tag'
import Steps from 'ant-design-vue/lib/steps'
import Popover from 'ant-design-vue/lib/popover'
import Cascader from 'ant-design-vue/lib/cascader'
import Col from 'ant-design-vue/lib/col'
import Row from 'ant-design-vue/lib/row'
import Switch from 'ant-design-vue/lib/switch'
import Upload from 'ant-design-vue/lib/upload'
import Card from 'ant-design-vue/lib/card'
// import Descriptions from 'ant-design-vue/lib/descriptions'
import Select from 'ant-design-vue/lib/select'
import Modal from 'ant-design-vue/lib/modal'
// import Dropdown from 'ant-design-vue/lib/dropdown'
// import Skeleton from 'ant-design-vue/lib/skeleton'
// import Spin from 'ant-design-vue/lib/spin'
// import Form from 'ant-design-vue/lib/form'
// import Checkbox from 'ant-design-vue/lib/checkbox'
// import Tooltip from 'ant-design-vue/lib/tooltip'
// import Menu from 'ant-design-vue/lib/menu'
// import Anchor from 'ant-design-vue/lib/anchor'
import Tabs from 'ant-design-vue/lib/tabs'
// import Result from 'ant-design-vue/lib/result'
// import Carousel from 'ant-design-vue/lib/carousel'

Vue.use(Modal)
Vue.use(Card)
// Vue.use(Descriptions)
Vue.use(Upload)
Vue.use(Switch)
Vue.use(Steps)
Vue.use(Badge)
Vue.use(Icon)
Vue.use(Popconfirm)
Vue.use(Input)
Vue.use(InputNumber)
Vue.use(Button)
Vue.use(Tag)
Vue.use(Popover)
Vue.use(Cascader)
Vue.use(Col)
Vue.use(Row)
Vue.use(DatePicker)

// Vue.use(Dropdown)
// Vue.use(Skeleton)
// Vue.use(Spin)
// Vue.use(Form)
Vue.use(Select)
// Vue.use(Checkbox)
// Vue.use(Tooltip)
// Vue.use(Menu)
// Vue.use(Anchor)
Vue.use(Tabs)
// Vue.use(Result)
// Vue.use(Carousel)

import message from 'ant-design-vue/lib/message'
Vue.prototype.$message = message
Vue.prototype.message = message
