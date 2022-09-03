import axios from 'axios'
import { Message } from 'element-ui'
import { uuid } from '@/utils/uuid'
import Lockr from 'lockr'
import router from '@/router'

const service = axios.create({
  baseURL: '/api',
  timeout: 30000,
  headers: {
    'Request-Id': uuid()
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

service.interceptors.request.use(
  config => {
    if (config.url.includes('sso')) {
      config.params = {
        ...config.params,
        sso_version: 2
      }
    }
    return config
  }
)

// respone拦截器
service.interceptors.response.use(
  response => {
    const { status: status, data: body } = response
    const { data, msg, code } = body
    // agw
    if (code !== 0 && msg) {
      Message.warning(msg)
      return Promise.reject(body)
    }
    // if (status) {
      // const { message } = status
      // const code = Number(code)
      if (status === 200) {
        if (code !== 0) {
          if (code === 16149) {
            // 退出登录
            // TODO ACCESS
            window.location.href = '/login'
            Lockr.rm('user_id')
          } else if (code === 142005) { // 无权限
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
    let { error: eMessage } = error.response.data
    try {
      eMessage = JSON.parse(eMessage)
      return Promise.reject(eMessage)
    } catch (e) {
      if (eMessage === "The broker session id isn't attached to a user session") {
        return Promise.reject(error.response.data)
      }

      if (eMessage === 'No token') {
        return Promise.reject(error.response.data)
      }

      // Message.error(eMessage || error.message)
      return Promise.reject(error)
    }
  }
)

export default service
