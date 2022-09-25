import axios from 'axios'
import { Message } from 'element-ui'
import { uuid } from '@/utils/uuid'
import store from '@/store'
import * as Lockr from 'lockr'
import router from '@/router'
import { removeToken } from '@/utils/auth'
import defaultSettings from '@/settings'
const service = axios.create({
  baseURL: process.env.NODE_ENV !== 'development' ?  'https://account.axisnow.xyz' : '/account' ,
  timeout: 300000,
  headers: {
    'Content-Type': 'application/json'
  }
})

service.interceptors.request.use(
  config => {
    return config
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const { status: status, data: body } = response
    let { data, code, msg } = body

    const _status = body.status && body.status || null
    if (_status) {
      code = _status.code
      msg = _status.msg || _status.message || msg
    }
    // agw
    if (code !== 0 && msg) {
      Message.warning(msg)
      return Promise.reject(body)
    }

    console.log('code=======',code)
    if (code === 20007) {
      // 退出登录
      // TODO ACCESS
      Message.warning("用户未登录")
      Lockr.rm('user_id')
      store.dispatch('user/logout')
      if (defaultSettings.signOutUrl) window.location.replace(defaultSettings.signOutUrl + '?redirect_url=' + window.location.origin,'_self');
      return Promise.reject(body)
    }
    
    // if (status) {
      // const { message } = status
      // const code = Number(code)
      if (status === 200) {
        if (code !== 0) {
          if (code === 142005) { // 无权限
            router.push({
              name: 'home.router.access'
            })
          } else if ([2010007, 100200, 300029, 400004, 400005, 142007].includes(code)) {
            //
          } else {
            const dataMessage = JSON.stringify(data) === '[]' ? '' : data
            Message.warning(msg || dataMessage || '操作失败')
          }
          return Promise.reject(body)
        }
      } else {
        Message.warning('操作失败')
        return Promise.reject(msg)
      }
    // }

    if (typeof data === 'object' && data !== null) data._status = status
    if (data) {
      return data
    } else {
      return body
    }
  },
  error => {
    return Promise.reject(error.msg)
  }
)

export default service
