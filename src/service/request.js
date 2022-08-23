import axios from 'axios'
import { BASE_URL } from '@/config/interceptor'
import { Message } from 'element-ui'
import { uuid } from '@/utils/uuid'

const service = axios.create({
  baseURL: BASE_URL,
  timeout: 15000,
  headers: {
    'Request-Id': uuid()
    // 'Content-Type': 'application/x-www-form-urlencoded; charset=UTF-8'
  }
})

// respone拦截器
service.interceptors.response.use(
  response => {
    const { status: statusCode, data: body } = response
    const { status, data, error } = body

    // 有返回状态，通常是控制台API
    if (status) {
      const { message } = status
      const code = Number(status)

      if (statusCode === 200) {
        if (code && message) {
          if (code !== 1) {
            if (code === 16149) {
              // TODO ACCESS
              window.location.href = '/login'
            } else {
              Message({
                message,
                type: 'warning'
              })
            }
            return Promise.reject(message)
          }
        }
      } else {
        Message({
          message,
          type: 'error'
        })
        return Promise.reject(message)
      }
    } else if (error) {
      // 有错误返回
      Message({
        message: error,
        type: 'warning'
      })
      return Promise.reject(error)
    }

    if (data && data.data) {
      return data.data
    } else {
      return data
    }
  },
  error => {
    Message({
      message: error.message,
      type: 'error',
      duration: 5 * 1000
    })
    return Promise.reject(error)
  }
)

export default service
