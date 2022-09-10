import Vue from 'vue'
// mixins

import VueCropper from 'vue-cropper'
Vue.use(VueCropper)

import Fetch from '@/api/fetch'
import Message from '@/utils/message'
import { installFilter } from '@/utils/filter'

installFilter(Vue)

Vue.prototype.Fetch = Fetch
Vue.prototype.Message = Message

// style
import 'normalize.css/normalize.css'
import '@/styles/index.scss'

// ui
import './components'
import './antd-ui'

import Dm from '@/components/Dm'
Vue.use(Dm)
import DatePicker from 'ant-design-vue/lib/date-picker'
import 'ant-design-vue/lib/date-picker/style'

Vue.use(DatePicker)
